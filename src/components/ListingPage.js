import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, FlatList } from 'react-native';
import PageSelection from './PageSelection';
import SimpleItem from './SimpleItem';
import LoadedItem from './LoadedItem';

function renderLoadingOverlay(){
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

class ListingPage extends Component{
  render(){
    const { loading } = this.props;

    return (
      <View style={styles.container}>
        {loading ? renderLoadingOverlay() : null}
        <View style={styles.content}>
          <FlatList />
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
    flex: 100
  },
  content: {
    zIndex: 0,
    flex: 92
  },
  pageNav: {
    zIndex: 0,
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingOverlay: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#F5FCFF88',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ListingPage;