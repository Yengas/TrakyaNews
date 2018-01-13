import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContentSection = ({ content }) => (
  <View style={styles.containerStyle}>
    <Text style={styles.textStyle}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  textStyle: {

  }
});

export default ContentSection;