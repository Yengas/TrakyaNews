import { Observable } from 'rxjs/Rx'
import cheerio from 'cheerio'

function createURL(domain, path){
  return `http://${domain}${path}`;
}

function getDocumentFromURL(ajax, url){
  return ajax({ url, responseType: 'document' })
    .map(e => cheerio.load(e.response));
}

function parseNewsItem(li){
  const a = li.find('a').first();
  const href = a.attr('href');
  const thumb = href.match(/([^\/]*)\/*\??$/)[1];

  return {
    thumb,
    href,
    title: a.text(),
    date: li.find('div.date').first().text()
  };
}

function parseNewsPage($){
  // TODO: should move parsing of items into observable...
  return Observable.from($("ul.news_list > li")
    .map(function(){ return parseNewsItem($(this)); })
    .toArray());
}

function createSimpleIdGenerator(prefix){
  return (simple) => ({ ...simple, id: `${prefix}${simple.thumb}` });
}

export default class TrakyaScrape{
  constructor(domain, ajax = Observable.ajax){
    this.domain = domain;
    this.ajax = ajax;
  }

  news(page){
    const url = createURL(this.domain, `/news_cats/haberler/${page}`);

    return getDocumentFromURL(this.ajax, url)
      .mergeMap(parseNewsPage)
      .map(createSimpleIdGenerator('h-'));
  }
}
