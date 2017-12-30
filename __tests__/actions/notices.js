import { LOAD_NOTICE_DETAILED, LOAD_NOTICES_SIMPLE } from "../../src/actions/types";
import { createNoticeLoadedDeatiledAction, createNoticesLoadedSimpleAction } from "../../src/actions";

describe('news actions', () => {
  const sampleNoticesSimple = { 'd-test': { id: 'd-test' }};
  const sampleNoticeDetailed = { 'd-test': { id: 'd-test', description: 'test' }};

  it('should creaete news load action without problems', () => {
    const expectedAction = { type: LOAD_NOTICES_SIMPLE, notices: sampleNoticesSimple };

    expect(createNoticesLoadedSimpleAction(sampleNoticesSimple)).toEqual(expectedAction);
  });

  it('should create news detail load action without problems', () => {
    const expectedAction = { type: LOAD_NOTICE_DETAILED, notice: sampleNoticeDetailed };

    expect(createNoticeLoadedDeatiledAction(sampleNoticeDetailed)).toEqual(expectedAction);
  });
});