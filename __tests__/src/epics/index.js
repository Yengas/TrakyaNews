import configureMockStore from 'redux-mock-store';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import createCombinedEpics from '../../../src/epics/index';
import { LOADING_NEWS_SIMPLE, LOADING_NOTICES_SIMPLE  } from "../../../src/actions/types";
import {
  createNewsDetailLoadedAction, createNewsSimpleLoadedAction, createNoticeLoadedDeatiledAction,
  createNoticesLoadedSimpleAction, createPageChangeAction,
  createPageLoadingAction
} from "../../../src/actions/index";
import Rx from "rxjs/Rx";
import {
  createNewsLoadingStartEpic, createNoticesLoadingStartEpic, createPageLoadingStartEpic,
  startNewsDetailLoadingEpic, startNoticesDetailLoadingEpic
} from "../../../src/epics";
import {
  createNewsDetailedFailedAction,
  createNewsSimpleFailedAction, createNewsSimpleLoadingAction, createNoticeDetailedFailedAction,
  createNoticesLoadingSimpleAction, createNoticesSimpleFailedAction
} from "../../../src/actions";


function createSimpleItemArray(count, prefix){
  return Array(count).fill(undefined).map((_, i) => ({ href: `${prefix}-${i + 1}` }));
}

const trakyaScraper = new (class TestTrakyaScrape{
  news(page){
    return Rx.Observable.from(createSimpleItemArray(page, 'h'));
  }

  notices(page){
    return Rx.Observable.from(createSimpleItemArray(page, 'd'));
  }

  single(href){
    return Rx.Observable.of({ href });
  }
})();

function requestSingleItem(item){
  return Rx.Observable.of(item);
}

function createStoreWithEpic(epic){
  const epicMiddleware = createEpicMiddleware(epic);
  const mockStore = configureMockStore([ epicMiddleware ]);
  return mockStore();
}

// TODO: too hardcoded for a testing epics? Maybe split epics and use different epics for each test instead of combinedEpics...
describe('epics singular test', () => {
  // WARN: this approach i used by defining combinedEpics, epicMiddleware, mockStore outside of the beforeEach doesnt work.
  // the first loading to execute works correctly, then it goes all wrong.
  //afterEach(() => {
  //  epicMiddleware.replace(combinedEpics);
  //});

  it('starts loading', () => {
    const store = createStoreWithEpic(createPageLoadingStartEpic);
    const changeAction = createPageChangeAction(1);

    store.dispatch(changeAction);

    expect(store.getActions()).toEqual([
      changeAction,
      { type: LOADING_NEWS_SIMPLE, page: 1 },
      { type: LOADING_NOTICES_SIMPLE, page: 1 },
    ]);
  });

  it('starts loading and loads page news/notices and details according to test scraper.', () => {
    const store = createStoreWithEpic(createCombinedEpics(trakyaScraper));

    const news = createSimpleItemArray(1, 'h');
    const notices = createSimpleItemArray(1, 'd');

    const changeAction = createPageChangeAction(1);
    const actions = [
      // Page change action and loading starts...
      changeAction,
      // News loaded by simple... The news are loaded by their details...
      createNewsSimpleLoadingAction(1), createNewsSimpleLoadedAction(news), createNewsDetailLoadedAction(news[0]),
      // Notice loaded by simple... The notices are loaded by their details...
      createNoticesLoadingSimpleAction(1), createNoticesLoadedSimpleAction(notices), createNoticeLoadedDeatiledAction(notices[0])
    ];

    store.dispatch(changeAction);

    expect(store.getActions()).toEqual(actions);
  });

  it('handles news simple loading fails gracefully', () => {
    const store = createStoreWithEpic(
      createNewsLoadingStartEpic((_) => Rx.Observable.throw(new Error('Test Error')))
    );
    const loadingAction = createNewsSimpleLoadingAction(1);

    store.dispatch(loadingAction);

    expect(store.getActions()).toEqual([
      loadingAction,
      createNewsSimpleFailedAction('Test Error')
    ]);
  });

  it('handles notices simple loading fails gracefully', () => {
    const store = createStoreWithEpic(
      createNoticesLoadingStartEpic((_) => Rx.Observable.throw(new Error('Test Error')))
    );
    const loadingAction = createNoticesLoadingSimpleAction(1);

    store.dispatch(loadingAction);

    expect(store.getActions()).toEqual([
      loadingAction,
      createNoticesSimpleFailedAction('Test Error')
    ]);
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  it('handles news detail loading errors gracefully', () => {
    const news = createSimpleItemArray(2, 'h');
    const store = createStoreWithEpic(
      startNewsDetailLoadingEpic((item) =>
        item === news[0] ?
          Rx.Observable.throw(new Error("Test Error"))
        :
          trakyaScraper.single(item.href))
    );
    const loadNewsAction = createNewsSimpleLoadedAction(news);

    store.dispatch(loadNewsAction);

    expect(store.getActions()).toEqual([
      loadNewsAction,
      createNewsDetailedFailedAction(news[0], "Test Error"),
      createNewsDetailLoadedAction(news[1])
    ]);
  });

  it('handles notices detail loading errors gracefully', () => {
    const notices = createSimpleItemArray(2, 'd');
    const store = createStoreWithEpic(
      startNoticesDetailLoadingEpic((item) =>
        item === notices[0] ?
          Rx.Observable.throw(new Error("Test Error"))
        :
          trakyaScraper.single(item.href))
    );
    const loadNoticesAction = createNoticesLoadedSimpleAction(notices);

    store.dispatch(loadNoticesAction);

    expect(store.getActions()).toEqual([
      loadNoticesAction,
      createNoticeDetailedFailedAction(notices[0], "Test Error"),
      createNoticeLoadedDeatiledAction(notices[1])
    ]);
  });

  it('dispatches news detail loading', () => {
    const store = createStoreWithEpic(combineEpics(
      createNewsLoadingStartEpic((page) => trakyaScraper.news(page)),
      startNewsDetailLoadingEpic((item) => trakyaScraper.single(item.href), 1)
    ));
    const news = createSimpleItemArray(3, 'h');

    const loadingAction = createNewsSimpleLoadingAction(3);
    const newsLoadAction = createNewsSimpleLoadedAction(news);
    const detailLoadAction = news.map(createNewsDetailLoadedAction);

    store.dispatch(loadingAction);

    expect(store.getActions()).toEqual([
      loadingAction,
      newsLoadAction,
      ...detailLoadAction
    ]);
  });

  it('dispatches notices detail loading', () => {
    const store = createStoreWithEpic(combineEpics(
      createNoticesLoadingStartEpic((page) => trakyaScraper.notices(page)),
      startNoticesDetailLoadingEpic((item) => trakyaScraper.single(item.href), 1)
    ));
    const notices = createSimpleItemArray(3, 'd');
    const loadingAction = createNoticesLoadingSimpleAction(3);
    const noticesLoadAction = createNoticesLoadedSimpleAction(notices);
    const detailLoadAction = notices.map(createNoticeLoadedDeatiledAction);

    store.dispatch(loadingAction);

    expect(store.getActions()).toEqual([
      loadingAction,
      noticesLoadAction,
      ...detailLoadAction
    ]);
  });
});