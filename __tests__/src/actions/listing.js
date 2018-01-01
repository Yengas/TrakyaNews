import { LISTING_PAGE_CHANGED } from "../../../src/actions/types";
import { createPageChangeAction } from "../../../src/actions/index";

describe('listing action creators', () => {
  it('should create page change action successfully', () => {
    const expectedAction = { type: LISTING_PAGE_CHANGED, page: 2 };

    expect(createPageChangeAction(2)).toEqual(expectedAction);
  });
});