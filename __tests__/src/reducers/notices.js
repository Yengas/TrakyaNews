import NoticesReducer from "../../../src/reducers/NoticesReducer";
import {
  LOAD_NOTICE_DETAILED, LOAD_NOTICES_SIMPLE, LOADING_NOTICES_SIMPLE, NOTICES_DETAILED_FAILED,
  NOTICES_SIMPLE_FAILED
} from "../../../src/actions/types";

describe('notices reducers', () => {
  const DEFAULT_STATE = {};
  const sampleNoticesSimple = { loading: false, items: { 'd-test': { id: 'd-test' }}};
  const sampleNoticeDetailedSingle = { id: 'd-test', description: 'test' };

  it('should create default state with empty object', () => {
    expect(NoticesReducer(undefined, {})).toEqual(DEFAULT_STATE);
  });

  it('should get into loading mode', () => {
    expect(NoticesReducer(undefined, { type: LOADING_NOTICES_SIMPLE })).toEqual({ loading: true });
  });

  it('should load a list of notices as the new state', () => {
    expect(NoticesReducer(undefined, { type: LOAD_NOTICES_SIMPLE, notices: sampleNoticesSimple.items }))
      .toEqual(sampleNoticesSimple);
  });

  it('should fail gracefully with simple loading', () => {
    expect(NoticesReducer(undefined, { type: NOTICES_SIMPLE_FAILED, reason: 'test'  })).toEqual({ loading: false, failed: true, reason: 'test' });
  });

  it('should fail gracefully with detail loading', () => {
    expect(
      NoticesReducer(sampleNoticesSimple, { type: NOTICES_DETAILED_FAILED, notice: { id: 'd-test' }, reason: 'test' })
    ).toEqual({ loading: false, items: { 'd-test' : { id: 'd-test', detail: { failed: true, reason: 'test' }}}});
  });

  it('should add a single detailed notices to state', () => {
    expect(NoticesReducer(sampleNoticesSimple, { type: LOAD_NOTICE_DETAILED, notice: sampleNoticeDetailedSingle }))
      .toEqual({ loading: false, items: { 'd-test': { id: 'd-test', description: 'test' }}});
  });
});