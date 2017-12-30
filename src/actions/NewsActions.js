import { LOAD_NEWS_DETAILED, LOAD_NEWS_SIMPLE } from "./types";

export function createNewsSimpleLoadedAction(news){
  return { type: LOAD_NEWS_SIMPLE, news };
}

export function createNewsDetailLoadedAction(news){
  return { type: LOAD_NEWS_DETAILED, news }
}