import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import createCombinedEpics from '../../../src/epics/index';
import { LISTING_LOADING_ENDED, LISTING_LOADING_START } from "../../../src/actions/types";
import {
  createNewsDetailLoadedAction, createNewsSimpleLoadedAction, createNoticeLoadedDeatiledAction,
  createNoticesLoadedSimpleAction, createPageChangeAction,
  createPageLoadingAction
} from "../../../src/actions/index";
import Rx from "rxjs/Rx";
import TrakyaScrape from "../../../src/TrakyaScrape";


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

// TODO: too hardcoded for a testing epics? Maybe split epics and use different epics for each test instead of combinedEpics...
describe('epics singular test', () => {
  let store;

  beforeEach(() => {
    const combinedEpics = createCombinedEpics(trakyaScraper);
    const epicMiddleware = createEpicMiddleware(combinedEpics);
    const mockStore = configureMockStore([ epicMiddleware ]);
    store = mockStore();
  });

  // WARN: this approach i used by defining combinedEpics, epicMiddleware, mockStore outside of the beforeEach doesnt work.
  // the first loading to execute works correctly, then it goes all wrong.
  //afterEach(() => {
  //  epicMiddleware.replace(combinedEpics);
  //});

  it('starts loading', () => {
    const changeAction = createPageChangeAction(1);

    store.dispatch(changeAction);

    expect(store.getActions().slice(0, 2)).toEqual([
      changeAction,
      { type: LISTING_LOADING_START },
    ]);
  });

  it('starts loading and loads page news/notices and details according to test scraper.', () => {
    const news = createSimpleItemArray(1, 'h');
    const notices = createSimpleItemArray(1, 'd');

    const changeAction = createPageChangeAction(1);
    const actions = [
      // Page change action and loading starts...
      changeAction, createPageLoadingAction(true),
      // News loaded by simple... The news are loaded by their details...
      createNewsSimpleLoadedAction(news), createPageLoadingAction(false), createNewsDetailLoadedAction(news[0]),
      // Notice loaded by simple... The notices are loaded by their details...
      createNoticesLoadedSimpleAction(notices), createPageLoadingAction(false), createNoticeLoadedDeatiledAction(notices[0])
    ];

    store.dispatch(changeAction);

    expect(store.getActions()).toEqual(actions);
  });

  it('ends loading', () => {
    const startLoadingAction = createPageLoadingAction(true);
    const newsLoadAction = createNewsSimpleLoadedAction([]);

    store.dispatch(startLoadingAction);
    store.dispatch(newsLoadAction);

    expect(store.getActions()).toEqual([
      startLoadingAction,
      newsLoadAction,
      { type: LISTING_LOADING_ENDED }
    ]);
  });

  it('dispatches news detail loading', () => {
    const news = createSimpleItemArray(3, 'h');
    const startLoadingAction = createPageLoadingAction(true);
    const newsLoadAction = createNewsSimpleLoadedAction(news);
    const detailLoadAction = news.map(createNewsDetailLoadedAction);

    store.dispatch(startLoadingAction);
    store.dispatch(newsLoadAction);

    expect(store.getActions()).toEqual([
      startLoadingAction,
      newsLoadAction,
      { type: LISTING_LOADING_ENDED },
      ...detailLoadAction
    ]);
  });

  it('dispatches notices detail loading', () => {
    const notices = createSimpleItemArray(3, 'd');
    const startLoadingAction = createPageLoadingAction(true);
    const noticesLoadAction = createNoticesLoadedSimpleAction(notices);
    const detailLoadAction = notices.map(createNoticeLoadedDeatiledAction);

    store.dispatch(startLoadingAction);
    store.dispatch(noticesLoadAction);

    expect(store.getActions()).toEqual([
      startLoadingAction,
      noticesLoadAction,
      { type: LISTING_LOADING_ENDED },
      ...detailLoadAction
    ]);
  });
});