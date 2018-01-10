import NewsReducer from "../../../src/reducers/NewsReducer";
import {
  LOAD_NEWS_DETAILED, LOAD_NEWS_SIMPLE, LOADING_NEWS_SIMPLE, NEWS_DETAILED_FAILED,
  NEWS_SIMPLE_FAILED
} from "../../../src/actions/types";

describe('news reducers', () => {
  const DEFAULT_STATE = {};
  const sampleNewsSimple = { loading: false, items: { 'h-test': { id: 'h-test' }}};
  const sampleNewsDetailedSingle = { id: 'h-test', description: 'test' };

  it('should create default state with empty object', () => {
    expect(NewsReducer(undefined, {})).toEqual(DEFAULT_STATE);
  });

  it('should get into loading mode', () => {
    expect(NewsReducer(undefined, { type: LOADING_NEWS_SIMPLE })).toEqual({ loading: true });
  });

  it('should fail gracefully with simple loading', () => {
    expect(NewsReducer(undefined, { type: NEWS_SIMPLE_FAILED, reason: 'test'  })).toEqual({ loading: false, failed: true, reason: 'test' });
  });

  it('should fail gracefully with detail loading', () => {
    expect(
      NewsReducer(sampleNewsSimple, { type: NEWS_DETAILED_FAILED, news: { id: 'h-test' }, reason: 'test' })
    ).toEqual({ loading: false, items: { 'h-test' : { id: 'h-test', detail: { failed: true, reason: 'test' }}}});
  });

  it('should load a list of news as the new state', () => {
    expect(NewsReducer(undefined, { type: LOAD_NEWS_SIMPLE, news: sampleNewsSimple.items })).toEqual(sampleNewsSimple);
  });

  it('should add a single detailed news to state', () => {
    expect(NewsReducer(sampleNewsSimple, { type: LOAD_NEWS_DETAILED, news: sampleNewsDetailedSingle}))
      .toEqual({ loading: false, items: { 'h-test': { id: 'h-test', description: 'test' }}});
  });

});