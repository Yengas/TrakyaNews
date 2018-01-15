import { ofType, combineEpics } from 'redux-observable';
import Rx from 'rxjs/Rx';
import { map, flatMap, takeUntil, filter } from 'rxjs/operators';
import {
  LISTING_PAGE_CHANGED, LOAD_NEWS_SIMPLE, LOAD_NOTICES_SIMPLE, LOADING_NEWS_SIMPLE,
  LOADING_NOTICES_SIMPLE
} from "../actions/types";
import {
  createNewsDetailLoadedAction, createNewsSimpleLoadedAction, createNewsSimpleLoadingAction,
  createNoticeLoadedDeatiledAction, createNoticesLoadingSimpleAction,
  createNoticesLoadedSimpleAction,
  createPageLoadingAction, createNoticesSimpleFailedAction, createNewsSimpleFailedAction,
  createNoticeDetailedFailedAction, createNewsDetailedFailedAction
} from "../actions";
import { mapToObjWithProp } from '../utils'

export const createPageLoadingStartEpic = (action$, store) =>
  action$.pipe(
    ofType(LISTING_PAGE_CHANGED),
    // Check if the page really changed or is it the same with the store
    //filter(({ page: newPage }) => newPage !== ((store.getState().listing || {}).page || 0)),
    flatMap(({ page }) => Rx.Observable.from([ createNewsSimpleLoadingAction(page), createNoticesLoadingSimpleAction(page) ]))
  );

export const createNewsLoadingStartEpic = (newsRequest) => (action$) =>
  action$.pipe(
    ofType(LOADING_NEWS_SIMPLE),
    flatMap(({ page }) =>
      newsRequest(page)
          .takeUntil(action$.ofType(LOADING_NEWS_SIMPLE))
          // TODO: could optimize by changing the parsing schema
          .map(({ items, maxPage }) => createNewsSimpleLoadedAction({ maxPage, items: mapToObjWithProp(items, 'id') }))
          .catch((e) => Rx.Observable.of(createNewsSimpleFailedAction(e.message)))
    )
  );

export const createNoticesLoadingStartEpic = (noticesRequest) => (action$) =>
  action$.pipe(
    ofType(LOADING_NOTICES_SIMPLE),
    flatMap(({ page }) =>
      noticesRequest(page)
        .takeUntil(action$.ofType(LOADING_NOTICES_SIMPLE))
        // TODO: could optimize by changing the parsing schema
        .map(({ items, maxPage}) => createNoticesLoadedSimpleAction({ maxPage, items: mapToObjWithProp(items, 'id') }))
        .catch((e) => Rx.Observable.of(createNoticesSimpleFailedAction(e.message))))
  );

export function createDetailLoadingEpic(requestSingleItem, concurrency, type, itemsExtractor, actionCreator, errorCreator, takeUntilActionType){
  return (action$, store) =>
    action$.pipe(
      ofType(type),
      flatMap((action) =>
        Rx.Observable
          .from(itemsExtractor(action))
          .flatMap((item) =>
            // Request single item, and in case error create an error for it.
            requestSingleItem(item)
              .map((result) => actionCreator({ id: item.id, ...result }))
              .catch((e) => Rx.Observable.of(errorCreator(item, e)))
            , undefined, concurrency)
          .takeUntil(action$.ofType(takeUntilActionType))
      )
    );
}

export const startNewsDetailLoadingEpic = (requestSingleItem, concurrency) =>
  createDetailLoadingEpic(
    requestSingleItem, concurrency, LOAD_NEWS_SIMPLE, (action) => Object.values(action.news.items),
    createNewsDetailLoadedAction, (item, e) => createNewsDetailedFailedAction(item, e.message),
    LOADING_NEWS_SIMPLE
  );

export const startNoticesDetailLoadingEpic = (requestSingleItem, concurrency) =>
  createDetailLoadingEpic(
    requestSingleItem, concurrency, LOAD_NOTICES_SIMPLE, (action) => Object.values(action.notices.items),
    createNoticeLoadedDeatiledAction, (item, e) => createNoticeDetailedFailedAction(item, e.message),
    LOADING_NOTICES_SIMPLE
  );

export default (scraper) => combineEpics(
  createPageLoadingStartEpic,
  createNewsLoadingStartEpic((page) => scraper.news(page)),
  createNoticesLoadingStartEpic((page) => scraper.notices(page)),
  startNewsDetailLoadingEpic((newsItem) => scraper.single(newsItem.href), 1),
  startNoticesDetailLoadingEpic((noticeItem) => scraper.single(noticeItem.href), 1)
);