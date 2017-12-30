/**
 * The state of the current news loaded in the app.
 * For each notice, it may either be fully loaded or partial.
 **/
import { LOAD_NEWS_DETAILED, LOAD_NEWS_SIMPLE } from "../actions/types";

export default (state = {}, action) => {
  switch(action.type){
    case LOAD_NEWS_SIMPLE:
      return action.news;
    case LOAD_NEWS_DETAILED:
      return { ...state, [action.news.id]: action.news };
  }

  return state;
};