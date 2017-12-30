import NewsReducer from "../../src/reducers/NewsReducer";
import { LOAD_NEWS_DETAILED, LOAD_NEWS_SIMPLE } from "../../src/actions/types";

describe('news reducers', () => {
  const DEFAULT_STATE = {};
  const sampleNewsSimple = { 'h-test': { id: 'h-test' }};
  const sampleNewsDetailedSingle = { id: 'h-test', description: 'test' };

  it('should create default state with empty object', () => {
    expect(NewsReducer(undefined, {})).toEqual(DEFAULT_STATE);
  });

  it('should load a list of news as the new state', () => {
    expect(NewsReducer(undefined, { type: LOAD_NEWS_SIMPLE, news: sampleNewsSimple })).toBe(sampleNewsSimple);
  });

  it('should add a single detailed news to state', () => {
    expect(NewsReducer(sampleNewsSimple, { type: LOAD_NEWS_DETAILED, news: sampleNewsDetailedSingle}))
      .toEqual({ 'h-test': { id: 'h-test', description: 'test' }});
  });

});