import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import combinedEpics from '../../src/epics/index';
import { LISTING_LOADING_ENDED, LISTING_LOADING_START } from "../../src/actions/types";
import {
  createNewsDetailLoadedAction, createNewsSimpleLoadedAction, createNoticeLoadedDeatiledAction,
  createNoticesLoadedSimpleAction, createPageChangeAction,
  createPageLoadingAction
} from "../../src/actions";

const epicMiddleware = createEpicMiddleware(combinedEpics);
const mockStore = configureMockStore([ epicMiddleware ]);

describe('epics singular test', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(combinedEpics);
  });

  it('starts loading', () => {
    const changeAction = createPageChangeAction(1);

    store.dispatch(changeAction);

    expect(store.getActions()).toEqual([
      changeAction,
      { type: LISTING_LOADING_START },
    ]);
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
    const news = [1, 2, 3];
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
    const notices = [1, 2, 3];
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