import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PageSelection from './PageSelection'

class ListingPage extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Hello, World!</Text>
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