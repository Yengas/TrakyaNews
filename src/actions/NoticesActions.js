import {
  LOAD_NOTICE_DETAILED, LOAD_NOTICES_SIMPLE, LOADING_NOTICES_SIMPLE, NOTICES_DETAILED_FAILED, NOTICES_SIMPLE_FAILED
} from "./types";

export function createNoticesLoadingSimpleAction(page){
  return { type: LOADING_NOTICES_SIMPLE, page };
}

export function createNoticesLoadedSimpleAction(notices){
  return { type: LOAD_NOTICES_SIMPLE, notices };
}

export function createNoticeLoadedDeatiledAction(notice){
  return { type: LOAD_NOTICE_DETAILED, notice }
}

export function createNoticeDetailedFailedAction(notice, reason){
  return { type: NOTICES_DETAILED_FAILED, notice, reason };
}

export function createNoticesSimpleFailedAction(reason){
  return { type: NOTICES_SIMPLE_FAILED, reason };
}
