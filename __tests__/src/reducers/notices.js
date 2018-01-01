import NoticesReducer from "../../../src/reducers/NoticesReducer";
import { LOAD_NOTICE_DETAILED, LOAD_NOTICES_SIMPLE } from "../../../src/actions/types";

describe('notices reducers', () => {
  const DEFAULT_STATE = {};
  const sampleNoticesSimple = { 'd-test': { id: 'd-test' }};
  const sampleNoticeDetailedSingle = { id: 'd-test', description: 'test' };

  it('should create default state with empty object', () => {
    expect(NoticesReducer(undefined, {})).toEqual(DEFAULT_STATE);
  });

  it('should load a list of notices as the new state', () => {
    expect(NoticesReducer(undefined, { type: LOAD_NOTICES_SIMPLE, notices: sampleNoticesSimple }))
      .toBe(sampleNoticesSimple);
  });

  it('should add a single detailed notices to state', () => {
    expect(NoticesReducer(sampleNoticesSimple, { type: LOAD_NOTICE_DETAILED, notice: sampleNoticeDetailedSingle }))
      .toEqual({ 'd-test': { id: 'd-test', description: 'test' }});
  });
});