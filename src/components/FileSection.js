import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import FileThumb from './FileThumb';

const FileSection = ({ files }) => (
  <View style={styles.containerStyle}>
    <FlatList
      data={files}
      numColumns={3}
      keyExtractor={(file) => file.href}
      renderItem={({ item }) =>
        <View style={styles.thumbContainerStyle}>
          <FileThumb large title={item.title} fileSize={item.size} size={96} downloadURL={item.href} />
        </View>
      } style={styles.flatListStyle} />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  flatListStyle: {
    flex: 1
  },
  thumbContainerStyle: {
    flex: 1
  },
});

export default FileSection;