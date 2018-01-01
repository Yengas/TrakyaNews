/**
 * This file holds test cases for the scraping part of this application.
 * Each page has a path, html content and an expected response associated to it.
 */
import fs from 'fs'
import path from 'path'

export const TEST_SITE_DOMAIN = "kycubyo.trakya.edu.tr";

export const NOTICES_PAGE_1 = {
  path: "/news_cats/duyurular/1",
  content: read('./duyurular-1.html'),
  response: []
};

export const NOTICES_PAGE_3 = {
  path: "/news_cats/duyurular/3",
  content: read('./duyurular-3.html'),
  response: []
};

export const NEWS_PAGE_1 = {
  path: "/news_cats/haberler/1",
  content: read('./haberler-1.html'),
  response: [ { thumb: 'tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017', href: 'http://kycubyo.trakya.edu.tr/news/tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017', title: 'TÜBİT Gururla Sundu. Bilişim ve Kariyer Günleri 2017', date: '21.12.2017', id: 'h-tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017' }, { thumb: 'bulut-bilisime-mercek-tutuyor', href: 'http://kycubyo.trakya.edu.tr/news/bulut-bilisime-mercek-tutuyor', title: 'Bulut Bilişime Mercek Tutuyor', date: '19.12.2017', id: 'h-bulut-bilisime-mercek-tutuyor' }, { thumb: 'vefat-ve-bassagligi-hakkinda', href: 'http://kycubyo.trakya.edu.tr/news/vefat-ve-bassagligi-hakkinda', title: 'Vefat ve Başsağlığı Hakkında!', date: '18.12.2017', id: 'h-vefat-ve-bassagligi-hakkinda' }, { thumb: 'vefat-ve-bassagligi', href: 'http://kycubyo.trakya.edu.tr/news/vefat-ve-bassagligi', title: 'Vefat ve Başsağlığı', date: '07.12.2017', id: 'h-vefat-ve-bassagligi' }, { thumb: '2017-2018-guz-donemi-ders-programi-degisikligi-hk', href: 'http://kycubyo.trakya.edu.tr/news/2017-2018-guz-donemi-ders-programi-degisikligi-hk', title: '2017-2018 Güz Dönemi Ders Programı Değişikliği Hk.', date: '18.11.2017', id: 'h-2017-2018-guz-donemi-ders-programi-degisikligi-hk' }, { thumb: 'teb-girisim-evi--wake-up--programi-etkinligi', href: 'http://kycubyo.trakya.edu.tr/news/teb-girisim-evi--wake-up--programi-etkinligi', title: 'TEB Girişim Evi "WAKE UP" Programı etkinliği', date: '17.10.2017', id: 'h-teb-girisim-evi--wake-up--programi-etkinligi' }, { thumb: 'kismi-zamanli-ogrenci-basvurulari-hk', href: 'http://kycubyo.trakya.edu.tr/news/kismi-zamanli-ogrenci-basvurulari-hk', title: 'Kısmi Zamanlı Öğrenci Başvuruları Hk.', date: '11.10.2017', id: 'h-kismi-zamanli-ogrenci-basvurulari-hk' }, { thumb: '2017---2018-akademik-yilinda-dgs-ile-yerlesen-ogrenciler-hk', href: 'http://kycubyo.trakya.edu.tr/news/2017---2018-akademik-yilinda-dgs-ile-yerlesen-ogrenciler-hk', title: '2017 - 2018 Akademik Yılında DGS ile Yerleşen Öğrenciler Hk.', date: '04.10.2017', id: 'h-2017---2018-akademik-yilinda-dgs-ile-yerlesen-ogrenciler-hk' }, { thumb: '2017-2018-yili-zorunlu-ortak-yabanci-dil-muafiyet-sinavi-yeri-ve-saati-hk', href: 'http://kycubyo.trakya.edu.tr/news/2017-2018-yili-zorunlu-ortak-yabanci-dil-muafiyet-sinavi-yeri-ve-saati-hk', title: '2017-2018 Yılı Zorunlu Ortak Yabancı Dil Muafiyet Sınavı Yeri ve Saati Hk.', date: '28.09.2017', id: 'h-2017-2018-yili-zorunlu-ortak-yabanci-dil-muafiyet-sinavi-yeri-ve-saati-hk' }, { thumb: '2017-2018-ogretim-yili-zorunlu-ortak-yabanci-dil-muafiyet-sinavi', href: 'http://kycubyo.trakya.edu.tr/news/2017-2018-ogretim-yili-zorunlu-ortak-yabanci-dil-muafiyet-sinavi', title: '2017-2018 Öğretim Yılı Zorunlu Ortak Yabancı Dil Muafiyet Sınavı', date: '21.09.2017', id: 'h-2017-2018-ogretim-yili-zorunlu-ortak-yabanci-dil-muafiyet-sinavi' }, { thumb: 'edirne-5--kitap-fuari-hk', href: 'http://kycubyo.trakya.edu.tr/news/edirne-5--kitap-fuari-hk', title: 'Edirne 5. Kitap Fuarı Hk', date: '21.09.2017', id: 'h-edirne-5--kitap-fuari-hk' }, { thumb: 'yemek-yardimi-ile-ilgili-duyuru', href: 'http://kycubyo.trakya.edu.tr/news/yemek-yardimi-ile-ilgili-duyuru', title: 'Yemek Yardımı İle İlgili Duyuru', date: '21.09.2017', id: 'h-yemek-yardimi-ile-ilgili-duyuru' }, { thumb: '2017-2018-yili-guz-donemi-yatay-gecis-degerlendirme-sonuclari', href: 'http://kycubyo.trakya.edu.tr/news/2017-2018-yili-guz-donemi-yatay-gecis-degerlendirme-sonuclari', title: '2017-2018 yılı güz dönemi yatay geçiş değerlendirme sonuçları', date: '25.08.2017', id: 'h-2017-2018-yili-guz-donemi-yatay-gecis-degerlendirme-sonuclari' }, { thumb: 'yuksekokulumuz-25-mayis-2017-tarihli-mezuniyet-toreni-hakkinda', href: 'http://kycubyo.trakya.edu.tr/news/yuksekokulumuz-25-mayis-2017-tarihli-mezuniyet-toreni-hakkinda', title: 'Yüksekokulumuz 25 Mayıs 2017 tarihli Mezuniyet Töreni Hakkında!', date: '06.06.2017', id: 'h-yuksekokulumuz-25-mayis-2017-tarihli-mezuniyet-toreni-hakkinda' }, { thumb: 'yuksekokulumuz-muzik-toplulugu-tarafindan-gerceklestirilen-konser-hakkinda', href: 'http://kycubyo.trakya.edu.tr/news/yuksekokulumuz-muzik-toplulugu-tarafindan-gerceklestirilen-konser-hakkinda', title: 'Yüksekokulumuz Müzik Topluluğu tarafından gerçekleştirilen Konser Hakkında!', date: '08.05.2017', id: 'h-yuksekokulumuz-muzik-toplulugu-tarafindan-gerceklestirilen-konser-hakkinda' }, { thumb: 'gumruk-isletme-toplulugu-etkinligi-hk', href: 'http://kycubyo.trakya.edu.tr/news/gumruk-isletme-toplulugu-etkinligi-hk', title: 'Gümrük İşletme Topluluğu Etkinliği Hk.', date: '05.05.2017', id: 'h-gumruk-isletme-toplulugu-etkinligi-hk' }, { thumb: 'okulumuz-ogretim-uyesinin-erasmus-ders-verme-hareketliligi-kapsaminda-ziyareti-hk', href: 'http://kycubyo.trakya.edu.tr/news/okulumuz-ogretim-uyesinin-erasmus-ders-verme-hareketliligi-kapsaminda-ziyareti-hk', title: 'Okulumuz Öğretim Üyesinin Erasmus Ders Verme Hareketliliği Kapsamında Ziyareti Hk.', date: '05.05.2017', id: 'h-okulumuz-ogretim-uyesinin-erasmus-ders-verme-hareketliligi-kapsaminda-ziyareti-hk' }, { thumb: 'trakya-universitesi-bilisim-ve-inovasyon-zirvesi-2017-hakkinda-', href: 'http://kycubyo.trakya.edu.tr/news/trakya-universitesi-bilisim-ve-inovasyon-zirvesi-2017-hakkinda-', title: 'Trakya Üniversitesi Bilişim ve İnovasyon Zirvesi 2017 Hakkında !!!', date: '18.04.2017', id: 'h-trakya-universitesi-bilisim-ve-inovasyon-zirvesi-2017-hakkinda-' }, { thumb: 'canakkale-zaferini-anlama-ve-sehitleri-anma-konferansi-hakkinda', href: 'http://kycubyo.trakya.edu.tr/news/canakkale-zaferini-anlama-ve-sehitleri-anma-konferansi-hakkinda', title: 'Çanakkale Zaferini Anlama ve Şehitleri Anma Konferansı Hakkında!', date: '05.04.2017', id: 'h-canakkale-zaferini-anlama-ve-sehitleri-anma-konferansi-hakkinda' }, { thumb: 'mudur-yardimcimiza-bassagligi-mesaji', href: 'http://kycubyo.trakya.edu.tr/news/mudur-yardimcimiza-bassagligi-mesaji', title: 'Müdür Yardımcımıza Başsağlığı Mesajı', date: '16.03.2017', id: 'h-mudur-yardimcimiza-bassagligi-mesaji' } ]
};

export const NEWS_PAGE_3 = {
  path: "/news_cats/haberler/3",
  content: read('./haberler-3.html'),
  response: [ { thumb: 'uluslararasi-ticaret-bolumu-mezunlari-haklarina-kavustu', href: 'http://kycubyo.trakya.edu.tr/news/uluslararasi-ticaret-bolumu-mezunlari-haklarina-kavustu', title: 'Uluslararası Ticaret Bölümü Mezunları Haklarına Kavuştu', date: '11.07.2014', id: 'h-uluslararasi-ticaret-bolumu-mezunlari-haklarina-kavustu' }, { thumb: 'mezuniyet-torenimiz', href: 'http://kycubyo.trakya.edu.tr/news/mezuniyet-torenimiz', title: 'Mezuniyet Törenimiz', date: '19.06.2014', id: 'h-mezuniyet-torenimiz' }, { thumb: 'basketbolcularimizin-buyuk-basarisi', href: 'http://kycubyo.trakya.edu.tr/news/basketbolcularimizin-buyuk-basarisi', title: 'Basketbolcularımızın Büyük Başarısı', date: '07.05.2014', id: 'h-basketbolcularimizin-buyuk-basarisi' }, { thumb: 'gumruk-bolumu-ile-ilgili-konferans', href: 'http://kycubyo.trakya.edu.tr/news/gumruk-bolumu-ile-ilgili-konferans', title: 'Gümrük Bölümü İle İlgili Konferans', date: '26.04.2014', id: 'h-gumruk-bolumu-ile-ilgili-konferans' }, { thumb: 'kariyer-merkezi-acilisi-ve-faaliyetleri-hakkinda', href: 'http://kycubyo.trakya.edu.tr/news/kariyer-merkezi-acilisi-ve-faaliyetleri-hakkinda', title: 'Kariyer Merkezi Açılışı ve Faaliyetleri Hakkında', date: '20.03.2014', id: 'h-kariyer-merkezi-acilisi-ve-faaliyetleri-hakkinda' }, { thumb: 'bankacilik-ve-sigortacilik-bolumu-mezunlari-haklarina-kavustu', href: 'http://kycubyo.trakya.edu.tr/news/bankacilik-ve-sigortacilik-bolumu-mezunlari-haklarina-kavustu', title: 'Bankacılık ve Sigortacılık Bölümü Mezunları Haklarına Kavuştu', date: '28.02.2014', id: 'h-bankacilik-ve-sigortacilik-bolumu-mezunlari-haklarina-kavustu' }, { thumb: 'geleneksel-donem-sonu-konseri', href: 'http://kycubyo.trakya.edu.tr/news/geleneksel-donem-sonu-konseri', title: '“Geleneksel Dönem Sonu Konseri” ', date: '09.01.2014', id: 'h-geleneksel-donem-sonu-konseri' }, { thumb: 'fotograf-gosterisi-ve-soylesi', href: 'http://kycubyo.trakya.edu.tr/news/fotograf-gosterisi-ve-soylesi', title: 'Fotoğraf Gösterisi ve Söyleşi', date: '08.01.2014', id: 'h-fotograf-gosterisi-ve-soylesi' }, { thumb: 'diploma-eki', href: 'http://kycubyo.trakya.edu.tr/news/diploma-eki', title: 'Diploma Eki', date: '26.12.2013', id: 'h-diploma-eki' }, { thumb: 'gumruk-isletme-bolumu-mezunlari-haklarina-kavustu', href: 'http://kycubyo.trakya.edu.tr/news/gumruk-isletme-bolumu-mezunlari-haklarina-kavustu', title: 'GÜMRÜK İŞLETME BÖLÜMÜ MEZUNLARI HAKLARINA KAVUŞTU', date: '13.12.2013', id: 'h-gumruk-isletme-bolumu-mezunlari-haklarina-kavustu' }, { thumb: 'siir-dinletisi', href: 'http://kycubyo.trakya.edu.tr/news/siir-dinletisi', title: 'Şiir Dinletisi', date: '27.05.2013', id: 'h-siir-dinletisi' }, { thumb: 'gonulluler-toplulugundan-mavi-kapak-uygulamasina-destek', href: 'http://kycubyo.trakya.edu.tr/news/gonulluler-toplulugundan-mavi-kapak-uygulamasina-destek', title: 'Gönüllüler Topluluğundan Mavi Kapak Uygulamasına Destek', date: '15.05.2013', id: 'h-gonulluler-toplulugundan-mavi-kapak-uygulamasina-destek' }, { thumb: 'geleneksel-donem-sonu-konserimiz', href: 'http://kycubyo.trakya.edu.tr/news/geleneksel-donem-sonu-konserimiz', title: 'Geleneksel Dönem Sonu Konserimiz ', date: '15.05.2013', id: 'h-geleneksel-donem-sonu-konserimiz' }, { thumb: 'firma-ziyareti', href: 'http://kycubyo.trakya.edu.tr/news/firma-ziyareti', title: 'Firma Ziyareti', date: '09.05.2013', id: 'h-firma-ziyareti' }, { thumb: 'spor-senliklerindeki-basarimiz', href: 'http://kycubyo.trakya.edu.tr/news/spor-senliklerindeki-basarimiz', title: 'Spor Şenliklerindeki Başarımız', date: '08.05.2013', id: 'h-spor-senliklerindeki-basarimiz' }, { thumb: 'dis-ticaret-semineri', href: 'http://kycubyo.trakya.edu.tr/news/dis-ticaret-semineri', title: 'Dış Ticaret Semineri', date: '02.05.2013', id: 'h-dis-ticaret-semineri' }, { thumb: 'kariyer-yonelimi-egitimi', href: 'http://kycubyo.trakya.edu.tr/news/kariyer-yonelimi-egitimi', title: 'Kariyer Yönelimi Eğitimi', date: '30.04.2013', id: 'h-kariyer-yonelimi-egitimi' }, { thumb: 'yaza-merhaba-piknigi', href: 'http://kycubyo.trakya.edu.tr/news/yaza-merhaba-piknigi', title: 'Yaza Merhaba Pikniği', date: '28.04.2013', id: 'h-yaza-merhaba-piknigi' }, { thumb: 'basketbol-takimimizdan-bir-zafer-daha', href: 'http://kycubyo.trakya.edu.tr/news/basketbol-takimimizdan-bir-zafer-daha', title: 'Basketbol Takımımızdan Bir Zafer Daha', date: '15.04.2013', id: 'h-basketbol-takimimizdan-bir-zafer-daha' }, { thumb: 'spor-musabakalari', href: 'http://kycubyo.trakya.edu.tr/news/spor-musabakalari', title: 'Spor Müsabakaları', date: '10.04.2013', id: 'h-spor-musabakalari' } ]
};

export const NEWS_NO_EXTRA_WITH_IMAGES = {
  path: "/news/tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017",
  content: read('./news-no-extra-with-images.html'),
  response: []
};

export const NEWS_WITH_EXTRA_FILES = {
  path: "/news/ders-programina-dersliklerin-ve-laboratuvarlarin-eklenmis-hali-",
  content: read('./news-with-extra-files.html'),
  response: []
};
export const NEWS_WITH_EXTRA_IMAGES = {
  path: "/news/edirne-5--kitap-fuari-hk",
  content: read('./news-with-extra-images.html'),
  response: []
};

function read(filePath){ return fs.readFileSync(path.join(__dirname, filePath)).toString(); }

describe('html files for testing', () => {
  it('should have exports with path,content,response', () => {
    const arr = [
      NOTICES_PAGE_1, NOTICES_PAGE_3, NEWS_PAGE_1, NEWS_PAGE_3, NEWS_NO_EXTRA_WITH_IMAGES, NEWS_WITH_EXTRA_FILES,
      NEWS_WITH_EXTRA_IMAGES
    ];

    for(let i = 0; i < arr.length; i++){
      expect(Object.keys(arr[i])).toEqual(['path', 'content', 'response']);
    }
  });
});