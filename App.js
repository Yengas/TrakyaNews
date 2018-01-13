import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import epics from './src/epics';
import reducers from './src/reducers';
import Router from './Router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends Component<{}> {
  render() {
    const initialState = {
      news: {
        loading: false,
        items: {
          'd-ders-programina-dersliklerin-ve-laboratuvarlarin-eklenmis-hali-': JSON.parse('{"id":"d-ders-programina-dersliklerin-ve-laboratuvarlarin-eklenmis-hali-","date":"05.02.2017","images":[{"src":"http://bys.trakya.edu.tr/file/open/63842743","width":300,"height":446},{"src":"http://bys.trakya.edu.tr/file/open/68391839","width":300,"height":446},{"src":"http://bys.trakya.edu.tr/file/open/90435715","width":300,"height":445},{"src":"http://bys.trakya.edu.tr/file/open/21739328","width":500,"height":327},{"src":"http://bys.trakya.edu.tr/file/open/55000773","width":500,"height":328},{"src":"http://bys.trakya.edu.tr/file/open/31697390","width":300,"height":450},{"src":"http://bys.trakya.edu.tr/file/open/45062883","width":300,"height":450},{"src":"http://bys.trakya.edu.tr/file/open/43240904","width":300,"height":449}],"href":"http://kycubyo.trakya.edu.tr/news/ders-programina-dersliklerin-ve-laboratuvarlarin-eklenmis-hali-","thumb":"ders-programina-dersliklerin-ve-laboratuvarlarin-eklenmis-hali-","title":"Ders Programına Dersliklerin ve Laboratuvarların Eklenmiş Hali ","content":"Programa sınıflar eklenmiştir.","hitCount":"5112","extras":{"files":[{"title":"bsb1 (4590).docx","href":"http://bys.trakya.edu.tr/file/download/81408221/","size":"(20.74 KB)"},{"title":"bsb2 (358035).docx","href":"http://bys.trakya.edu.tr/file/download/51905489/","size":"(22.95 KB)"},{"title":"bsb3 (203).docx","href":"http://bys.trakya.edu.tr/file/download/95224801/","size":"(25.19 KB)"},{"title":"bsb4 (77224).docx","href":"http://bys.trakya.edu.tr/file/download/96393622/","size":"(23.64 KB)"},{"title":"btbs1  (1578).docx","href":"http://bys.trakya.edu.tr/file/download/51679692/","size":"(17.74 KB)"},{"title":"btbs2 (377).docx","href":"http://bys.trakya.edu.tr/file/download/33203941/","size":"(19.56 KB)"},{"title":"btbs3 (102346).docx","href":"http://bys.trakya.edu.tr/file/download/30623486/","size":"(21.54 KB)"},{"title":"btbs4 (898).docx","href":"http://bys.trakya.edu.tr/file/download/54171698/","size":"(21.21 KB)"},{"title":"gib1 (51652).docx","href":"http://bys.trakya.edu.tr/file/download/61512976/","size":"(20.77 KB)"},{"title":"gib2 (12351).docx","href":"http://bys.trakya.edu.tr/file/download/31619918/","size":"(23.02 KB)"},{"title":"gib3 (321).docx","href":"http://bys.trakya.edu.tr/file/download/41545757/","size":"(25.03 KB)"},{"title":"gib4 (9184).docx","href":"http://bys.trakya.edu.tr/file/download/18659105/","size":"(23.9 KB)"},{"title":"iby1 (310102).docx","href":"http://bys.trakya.edu.tr/file/download/72472477/","size":"(20.82 KB)"},{"title":"iby2 (235762).docx","href":"http://bys.trakya.edu.tr/file/download/43796072/","size":"(21.42 KB)"},{"title":"iby3 (1033).docx","href":"http://bys.trakya.edu.tr/file/download/20130185/","size":"(23.13 KB)"},{"title":"iby4  (5757).docx","href":"http://bys.trakya.edu.tr/file/download/90871735/","size":"(22.35 KB)"},{"title":"utb1 (8642).docx","href":"http://bys.trakya.edu.tr/file/download/36189948/","size":"(20.62 KB)"},{"title":"utb2 (12450).docx","href":"http://bys.trakya.edu.tr/file/download/35722332/","size":"(21.2 KB)"},{"title":"utb3 (34b1).docx","href":"http://bys.trakya.edu.tr/file/download/45089496/","size":"(24.51 KB)"},{"title":"utb4 (12649).docx","href":"http://bys.trakya.edu.tr/file/download/64179542/","size":"(22.24 KB)"}]}}'),
          'h-tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017': { thumb: 'tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017', href: 'http://kycubyo.trakya.edu.tr/news/tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017', title: 'TÜBİT Gururla Sundu. Bilişim ve Kariyer Günleri 2017', date: '21.12.2017', id: 'h-tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017' }
        }
      },
      notices: {
        loading: false,
        items: {
          'd-yemek-yardimi-hakkinda': { thumb: 'yemek-yardimi-hakkinda', href: 'http://kycubyo.trakya.edu.tr/news/yemek-yardimi-hakkinda', title: 'YEMEK YARDIMI HAKKINDA', date: '01.02.2017', id: 'd-yemek-yardimi-hakkinda', detail: { failed: true } },
        }
      },
      listing: { page: 1 },
      details: { id: 'd-ders-programina-dersliklerin-ve-laboratuvarlarin-eklenmis-hali-' }
    };
    const epicMiddleware = createEpicMiddleware(epics);
    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
