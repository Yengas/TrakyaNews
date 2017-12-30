import { LOAD_NEWS_DETAILED, LOAD_NEWS_SIMPLE } from "../../src/actions/types";
import { createNewsDetailLoadedAction, createNewsSimpleLoadedAction } from "../../src/actions";

describe('news actions', () => {
  const sampleNewsSimple = { 'h-test': { id: 'h-test' }};
  const sampleNewsDetailed = { 'h-test': { id: 'h-test', description: 'test' }};

  it('should creaete news load action without problems', () => {
    const expectedAction = { type: LOAD_NEWS_SIMPLE, news: sampleNewsSimple };

    expect(createNewsSimpleLoadedAction(sampleNewsSimple)).toEqual(expectedAction);
  });

  it('should create news detail load action without problems', () => {
    const expectedAction = { type: LOAD_NEWS_DETAILED, news: sampleNewsDetailed };

    expect(createNewsDetailLoadedAction(sampleNewsDetailed)).toEqual(expectedAction);
  });
});