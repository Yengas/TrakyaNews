import { DETAIL_SELECTED } from './types';

export function createDetailSelectedAction(id){
  return { type: DETAIL_SELECTED, id };
}