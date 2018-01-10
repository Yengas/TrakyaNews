import ListingReducer from "../../../src/reducers/ListingReducer";
import { LISTING_LOADING_ENDED, LISTING_LOADING_START, LISTING_PAGE_CHANGED } from "../../../src/actions/types";

describe('list reducer', () => {
  const DEFAULT_STATE = { page: 1 };
  it('should return default state of page 1', () => {
    expect(
      ListingReducer(undefined, {})
    ).toEqual(DEFAULT_STATE);
  });

  it('should set page to given number', () => {
    expect(ListingReducer(undefined, { type: LISTING_PAGE_CHANGED, page: 2 })).toEqual({ ...DEFAULT_STATE, page: 2 });
  });
});