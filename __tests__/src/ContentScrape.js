import TrakyaScrape from "../../src/TrakyaScrape";
import { request } from 'universal-rxjs-ajax'
import { NEWS_PAGE_1, TEST_SITE_DOMAIN } from '../data/html'
import nock from "nock";

const MOCK_REQUESTS = true;
jest.unmock('nock');

function mockResponse(domain, testObject){
  nock('http://' + domain)
    .get(testObject.path)
    .reply(200, testObject.content);
}

describe('scraping of content', () => {
  let scraper;

  beforeAll(() => {
    scraper = new TrakyaScrape(TEST_SITE_DOMAIN, request);
  });

  it('should scrape news page 1', (done) => {
    if(MOCK_REQUESTS) mockResponse(TEST_SITE_DOMAIN, NEWS_PAGE_1);

    scraper.news(1).forEach((result) => {
      try{
        expect(result).toEqual(NEWS_PAGE_1.response);
        done();
      }catch(ex){
        done(ex);
      }
    });
  });
});