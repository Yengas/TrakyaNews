import React from 'react';
import { StyleSheet, FlatList, Image, View } from 'react-native';

const ImageBox = ({ uri }) => (
  <View style={styles.imageContainerStyle}>
    <Image style={styles.imageStyle} source={{ uri }} />
  </View>
);

const ImageSection = ({ images }) => (
  <View style={styles.containerStyle}>
    <FlatList
      data={images}
      keyExtractor={(item) => item.src}
      numColumns={3}
      renderItem={({ item }) => <ImageBox uri={item.src} />}
      style={styles.flatListStyle} />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  flatListStyle: {
    flex: 1
  },
  imageContainerStyle: {
    width: 128,
    height: 128
  },
  imageStyle: {
    flex: 1
  }
});

export default ImageSection;