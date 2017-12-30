import { ofType, combineEpics } from 'redux-observable';
import Rx from 'rxjs/Rx';
import { map, mapTo, flatMap } from 'rxjs/operators';
import { LISTING_PAGE_CHANGED, LOAD_NEWS_SIMPLE, LOAD_NOTICES_SIMPLE } from "../actions/types";
import { createNewsDetailLoadedAction, createNoticeLoadedDeatiledAction, createPageLoadingAction } from "../actions";

const pageLoadingStartEpic = (action$) =>
  action$.pipe(
    ofType(LISTING_PAGE_CHANGED),
    mapTo(createPageLoadingAction(true))
  );

const pageLoadingEndedEpic = (action$) =>
  action$.pipe(
    ofType(LOAD_NEWS_SIMPLE, LOAD_NOTICES_SIMPLE),
    mapTo(createPageLoadingAction(false))
  );

function requestSingleItem(item){
  return Rx.Observable.of(item);
}

function createDetailLoadingEpic(concurrency, type, itemsExtractor, actionCreator){
  return (action$) =>
    action$.pipe(
      ofType(type),
      flatMap((action) =>
        Rx.Observable
          .from(itemsExtractor(action))
          .pipe(
            flatMap(requestSingleItem, undefined, concurrency),
            map(actionCreator)
          )
      )
    );
}

const startNewsDetailLoadingEpic = (concurrency) =>
  createDetailLoadingEpic(concurrency, LOAD_NEWS_SIMPLE, (action) => action.news, createNewsDetailLoadedAction);

const startNoticesDetailLoadingEpic = (concurrency) =>
  createDetailLoadingEpic(concurrency, LOAD_NOTICES_SIMPLE, (action) => action.notices, createNoticeLoadedDeatiledAction);

export default combineEpics(
  pageLoadingStartEpic,
  pageLoadingEndedEpic,
  startNewsDetailLoadingEpic(3),
  startNoticesDetailLoadingEpic(5)
);