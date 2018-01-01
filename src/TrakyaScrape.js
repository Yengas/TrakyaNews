import { Observable } from 'rxjs/Rx'
import cheerio from 'cheerio'

function createURL(domain, path){
  return `http://${domain}${path}`;
}

// Given an ajax instance, and a url creates a get request that returns html.
function getDocumentFromURL(ajax, url){
  return ajax({ url, responseType: 'document' })
    .map(e => cheerio.load(e.response));
}

/**
 * Parses a single simple item, given its html object.
 * @param li the <li> html object of the simple item.
 * @return {{thumb: *|string, href: *, title, date}}
 */
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

/**
 * Parses a news/notices page into an observable of simple items.
 * @param $ the page object, full html document.
 * @return {Observable<any>}
 */
function parseNewsPage($){
  // TODO: should move parsing of items into observable...
  return Observable.from($("ul.news_list > li")
    .map(function(){ return parseNewsItem($(this)); })
    .toArray());
}

/**
 * Adds the given prefix to thumbs of each record it finds.
 * @param prefix the prefix to add
 * @return {function(*): {id: string}}
 */
function createSimpleIdGenerator(prefix){
  return (simple) => ({ ...simple, id: `${prefix}${simple.thumb}` });
}

/**
 * Parses the information text and returns the found hitcount if it can find it.
 * @param infoText a string to inspect and parse.
 * @return {*}
 */
function parseInfoText(infoText){
  const hitCount = infoText.match("([0-9]+) kez okundu\.");

  return hitCount.length > 1 ? { hitCount: hitCount[1] } : null;
}

/**
 * Parses information of the image, given a img object.
 * @param image the html document object for the image.
 * @return {*}
 */
function parseImageInfo(image){
  const src = image.attr('src');
  const width = image.attr('width');
  const height = image.attr('height');

  if(!src) return null;

  return {
    src,
    ...(width ? { width: parseInt(width) } : {}),
    ...(height ? { height: parseInt(height) } : {})
  };
}

/**
 * Given a content, scrapes info, extra files and extra images from it.
 * @param content
 */
function stripExtrasFromContent($, content){
  ['.by-images', '.by-files', '.info'].forEach((selector) => $(selector).remove());
  $("a:contains('Tümünü Sıkıştır ve İndir')").remove();
  $(".title-mini:contains('Ek Dosyalar')").remove();
  $(".title-mini:contains('Ek Resimler')").remove();
  return content;
}

/**
 * Parses extra images section of the document. Returns src of each extra image.
 * @param $ the full document to look at. html object.
 * @param content the content part of the document.
 */
function parseExtraImages($, content){
  const images = content.find('.by-images');

  if(images.length === 0) return null;
  return images.first().find('li > a > img').map(function(){ return { src: $(this).attr('src') }; }).toArray();
}

/**
 * Parses the extra files section of the document. Returns file title, size and href for each of the extras.
 * @param $ the full document to look at. html object.
 * @param content the content part of the document.
 */
function parseExtraFiles($, content){
  const files = content.find('.by-files');

  if(files.length === 0) return null;
  function parseFile(elem){
    const title = elem.contents().filter(function() {
      return this.type === 'text';
    }).text().trim();
    const href = elem.attr('href');

    // Remove the url for downloading all of the files.
    if(href.includes("/file/zip/")) return null;
    return { title, href, size: elem.find('span.file-size').text() };
  }

  return files.first().find('li a').map(function(){ return parseFile($(this)); }).toArray().filter(x => x);
}

/**
 * Parses a single page into an object.
 * @param $ the page object, full html document.
 */
function parseSingleContent($){
  const content = $('div#content').first();
  const realContent = content.find('div.content').first();

  // Info title and extras should be parsed before stripping.
  const info = realContent.find('div.info').text();
  const title = content.find('h1.title').text();
  const extraImages = parseExtraImages($, realContent);
  const extraFiles = parseExtraFiles($, realContent);

  stripExtrasFromContent($, realContent);

  // Better to get these after stripping extras.
  const images = realContent.find("img").map(function(){ return parseImageInfo($(this)); }).toArray().filter(x => x);
  const contentText = realContent.text().replace(/\s+$/, '').replace(/\s([^\S\n]+|\s{2,})/g, ' ').trim();

  return {
    title,
    content: contentText,
    images,
    ...parseInfoText(info),
    ...(extraImages || extraFiles ? {
        extras:
          Object.assign(
            extraImages ? { images: extraImages } : {},
            extraFiles ? { files: extraFiles } : {}
          )
      } : null)
  }
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

  notices(page){
    const url = createURL(this.domain, `/news_cats/duyurular/${page}`);

    return getDocumentFromURL(this.ajax, url)
      .mergeMap(parseNewsPage)
      .map(createSimpleIdGenerator('d-'));
  }

  single(path){
    const url = createURL(this.domain, path);

    return getDocumentFromURL(this.ajax, url)
      .map(parseSingleContent);
  }
}
