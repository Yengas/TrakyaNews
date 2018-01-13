/**
 * The state of the current news loaded in the app.
 * For each notice, it may either be fully loaded or partial.
 **/
import {
  LOAD_NEWS_DETAILED, LOAD_NEWS_SIMPLE, LOADING_NEWS_SIMPLE, NEWS_DETAILED_FAILED,
  NEWS_SIMPLE_FAILED
} from "../actions/types";

export default (state = {}, action) => {
  switch(action.type){
    case LOADING_NEWS_SIMPLE:
      return { loading: true };
    case LOAD_NEWS_SIMPLE:
      return { loading: false, items: action.news.items, maxPage: action.news.maxPage };
    case LOAD_NEWS_DETAILED:
      return { ...state, items: { ...state.items, [ action.news.id ]: { ...state.items[action.news.id], ...action.news } } };
    case NEWS_SIMPLE_FAILED:
      return { loading: false, failed: true, reason: action.reason };
    case NEWS_DETAILED_FAILED:
      return { ...state, items: { ...state.items, [action.news.id]: { ...state.items[action.news.id], detail: { failed: true, reason: action.reason }}} };
  }

  return state;
};