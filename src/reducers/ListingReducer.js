/**
 * Holds the state for the listing page.
 * Currently the listing only has the current page selection.
 **/
import { LISTING_LOADING_ENDED, LISTING_LOADING_START, LISTING_PAGE_CHANGED } from "../actions/types";

export default (state = { page: 1, loading: true }, action) => {
  switch(action.type){
    case LISTING_PAGE_CHANGED:
      if(state.page !== action.page)
        return { ...state, page: action.page };
    case LISTING_LOADING_START:
        return { ...state, loading: true };
    case LISTING_LOADING_ENDED:
        return { ...state, loading: false };
  }

  return state;
};