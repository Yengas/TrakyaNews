import {
  LOAD_NEWS_DETAILED, LOAD_NEWS_SIMPLE, LOADING_NEWS_SIMPLE, NEWS_DETAILED_FAILED,
  NEWS_SIMPLE_FAILED
} from "./types";

export function createNewsSimpleLoadingAction(page){
  return { type: LOADING_NEWS_SIMPLE, page };
}

export function createNewsSimpleLoadedAction(news){
  return { type: LOAD_NEWS_SIMPLE, news };
}

export function createNewsDetailLoadedAction(news){
  return { type: LOAD_NEWS_DETAILED, news }
}

export function createNewsDetailedFailedAction(news, reason){
  return { type: NEWS_DETAILED_FAILED, news, reason };
}

export function createNewsSimpleFailedAction(reason){
  return { type: NEWS_SIMPLE_FAILED, reason };
}
