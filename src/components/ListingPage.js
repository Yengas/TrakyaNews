import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PageSelection from './PageSelection';
import SimpleItem from './SimpleItem';
import LoadedItem from './LoadedItem';

class ListingPage extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <LoadedItem
            title={"Değişik bir şey deniyelim."}
            date={"27.12.2017"}
            content={"Bilişim ve Kariyer Günleri 2017 gerçekleştirildi.B.T.B.S. bölümü Bilişim ve İnovasyon Topluluğu (TÜBİT) tarafından 12-13 Aralık 2017 tarihlerinde gerçekleştirilen \"Bilişim & Kariyer Günleri 2017\" yoğun bir katılım ile gerçekleştirildi.Katılımcı ve destekçilerimize teşekkür ederiz.B.T.B.S. Bölüm Başkanlığı"}
            images={["http://bys.trakya.edu.tr/file/open/63842743", "http://bys.trakya.edu.tr/file/open/68391839", "http://bys.trakya.edu.tr/file/open/90435715", "http://bys.trakya.edu.tr/file/open/21739328", "http://bys.trakya.edu.tr/file/open/55000773", "http://bys.trakya.edu.tr/file/open/31697390", "http://bys.trakya.edu.tr/file/open/45062883", "http://bys.trakya.edu.tr/file/open/43240904"]}
            files={[{"title":"gib1 (51652).docx","href":"http://bys.trakya.edu.tr/file/download/61512976/","size":"(20.77 KB)"}]}
            views={1524}
            onClick={() => console.log("Tıklandı!")}
            isLoading={true} />
          <SimpleItem
            title={"Değişik bir şey deniyelim."}
            date={"27.12.2017"}
            views={1524}
            onClick={() => console.log("Tıklandı!")}
            isLoading={true} />
        </View>
        <View style={styles.pageNav}>
          <PageSelection min={1} max={6} toShow={5} selected={3} pageChanged={(page) => console.log(page)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 92
  },
  pageNav: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ListingPage;