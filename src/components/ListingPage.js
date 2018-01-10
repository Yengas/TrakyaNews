import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class ListingPage extends Component<{}>{
  render(){
    return (
      <View style={styles.container}>
        <Text>Hello, World!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default ListingPage;