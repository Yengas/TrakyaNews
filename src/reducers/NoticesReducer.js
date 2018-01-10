/**
 * The state of the current notices loaded in the app.
 * For each notice, it may either be fully loaded or partial.
 **/
import {
  LOAD_NOTICE_DETAILED, LOAD_NOTICES_SIMPLE, LOADING_NOTICES_SIMPLE, NOTICES_DETAILED_FAILED,
  NOTICES_SIMPLE_FAILED
} from "../actions/types";

export default (state = {}, action) => {
  switch(action.type){
    case LOADING_NOTICES_SIMPLE:
      return { loading: true };
    case LOAD_NOTICES_SIMPLE:
      return { loading: false, items: action.notices };
    case LOAD_NOTICE_DETAILED:
      return { ...state, items: { ...state.items, [action.notice.id]: action.notice }};
    case NOTICES_SIMPLE_FAILED:
      return { loading: false, failed: true, reason: action.reason };
    case NOTICES_DETAILED_FAILED:
      return { ...state, items: { ...state.items, [action.notice.id]: { ...state.items[action.notice.id], detail: { failed: true, reason: action.reason }} }};
  }

  return state;
};
