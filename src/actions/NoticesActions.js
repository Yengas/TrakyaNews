import { LOAD_NOTICE_DETAILED, LOAD_NOTICES_SIMPLE } from "./types";

export function createNoticesLoadedSimpleAction(notices){
  return { type: LOAD_NOTICES_SIMPLE, notices };
}

export function createNoticeLoadedDeatiledAction(notice){
  return { type: LOAD_NOTICE_DETAILED, notice };
}