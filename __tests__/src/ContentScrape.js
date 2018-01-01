import TrakyaScrape from "../../src/TrakyaScrape";
import { request } from 'universal-rxjs-ajax'
import { NEWS_PAGE_1, NEWS_PAGE_3, TEST_SITE_DOMAIN } from '../data/html'
import nock from "nock";

const MOCK_REQUESTS = true;
jest.unmock('nock');

function mockResponse(domain, testObject){
  nock('http://' + domain)
    .get(testObject.path)
    .reply(200, testObject.content);
}

function simpleGetRequestTestGenerator(observableGenerator, testObject){
  return (done) => {
    if(MOCK_REQUESTS) mockResponse(TEST_SITE_DOMAIN, testObject);

    observableGenerator().toArray().forEach((result) => {
      try{
        expect(result).toEqual(testObject.response);
        done();
      }catch(ex){
        done(ex);
      }
    });
  };
}

describe('scraping of content', () => {
  let scraper;

  beforeAll(() => {
    scraper = new TrakyaScrape(TEST_SITE_DOMAIN, request);
  });

  beforeEach(() => {
    nock.cleanAll();
  });

  it('should scrape news page 1', simpleGetRequestTestGenerator(() => scraper.news(1), NEWS_PAGE_1));
  it('should scrape news page 3', simpleGetRequestTestGenerator(() => scraper.news(3), NEWS_PAGE_3));
});