import { ofType, combineEpics } from 'redux-observable';
import Rx from 'rxjs/Rx';
import { map, mapTo, flatMap, takeUntil } from 'rxjs/operators';
import { LISTING_PAGE_CHANGED, LOAD_NEWS_SIMPLE, LOAD_NOTICES_SIMPLE } from "../actions/types";
import {
  createNewsDetailLoadedAction, createNewsSimpleLoadedAction, createNoticeLoadedDeatiledAction,
  createNoticesLoadedSimpleAction,
  createPageLoadingAction
} from "../actions";

const createPageLoadingStartEpic = (newsRequest, noticesRequest) => (action$) =>
  action$.pipe(
    ofType(LISTING_PAGE_CHANGED),
    flatMap(({ page }) => {
      // A stream of page changes where the page id doesn't equal to this one. Meaning the page has changed.
      const pageChanged$ = action$.ofType(LISTING_PAGE_CHANGED).filter(({ page: newPage }) => newPage !== page);

      return Rx.Observable.merge(
        Rx.Observable.of(createPageLoadingAction(true)),
        newsRequest(page).toArray().takeUntil(pageChanged$).map(news => createNewsSimpleLoadedAction(news)),
        noticesRequest(page).toArray().takeUntil(pageChanged$).map(notices => createNoticesLoadedSimpleAction(notices))
      );
    })
  );

const pageLoadingEndedEpic = (action$) =>
  action$.pipe(
    ofType(LOAD_NEWS_SIMPLE, LOAD_NOTICES_SIMPLE),
    mapTo(createPageLoadingAction(false))
  );

function createDetailLoadingEpic(requestSingleItem, concurrency, type, itemsExtractor, actionCreator){
  return (action$, store) => {
    const pageChanged$ = action$.ofType(LISTING_PAGE_CHANGED)
      .filter(({ page: newPage }) => newPage !== store.getState().listing.page);

    return action$.pipe(
      ofType(type),
      flatMap((action) =>
        Rx.Observable
          .from(itemsExtractor(action))
          .pipe(
            flatMap(requestSingleItem, undefined, concurrency),
            takeUntil(pageChanged$),
            map(actionCreator)
          )
      )
    );
  };
}

export const startNewsDetailLoadingEpic = (requestSingleItem, concurrency) =>
  createDetailLoadingEpic(requestSingleItem, concurrency, LOAD_NEWS_SIMPLE, (action) => action.news, createNewsDetailLoadedAction);

export const startNoticesDetailLoadingEpic = (requestSingleItem, concurrency) =>
  createDetailLoadingEpic(requestSingleItem, concurrency, LOAD_NOTICES_SIMPLE, (action) => action.notices, createNoticeLoadedDeatiledAction);

export default (scraper) => combineEpics(
  createPageLoadingStartEpic((page) => scraper.news(page), (page) => scraper.notices(page)),
  pageLoadingEndedEpic,
  startNewsDetailLoadingEpic((newsItem) => scraper.single(newsItem.href), 3),
  startNoticesDetailLoadingEpic((noticeItem) => scraper.single(noticeItem.href), 5)
);