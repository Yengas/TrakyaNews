/**
 * The state of the current notices loaded in the app.
 * For each notice, it may either be fully loaded or partial.
 **/
import { LOAD_NOTICE_DETAILED, LOAD_NOTICES_SIMPLE } from "../actions/types";

export default (state = {}, action) => {
  switch(action.type){
    case LOAD_NOTICES_SIMPLE:
      return action.notices;
    case LOAD_NOTICE_DETAILED:
      return { ...state, [action.notice.id]: action.notice };
  }

  return state;
};
