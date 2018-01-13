import { DETAIL_SELECTED } from '../actions/types';

export default (state = { id: null }, action) => {
  switch(action.type){
    case DETAIL_SELECTED:
      return { id: action.id };
  }

  return state;
};