import { LISTING_PAGE_CHANGED } from "./types";

export function createPageChangeAction(page){
  return { type: LISTING_PAGE_CHANGED, page };
}
