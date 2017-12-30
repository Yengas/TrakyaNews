import { LISTING_LOADING_ENDED, LISTING_LOADING_START, LISTING_PAGE_CHANGED } from "./types";

export function createPageChangeAction(page){
  return { type: LISTING_PAGE_CHANGED, page };
}

export function createPageLoadingAction(loading = true){
  return { type: loading ? LISTING_LOADING_START : LISTING_LOADING_ENDED };
}