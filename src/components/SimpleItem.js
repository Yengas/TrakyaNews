import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

function loadingSpinner(){
  return (<ActivityIndicator color="#222222" size={"small"} />);
}

function errorIcon(){
  return (<Avatar small rounded icon={{ name: 'error' }} />);
}

const SimpleItem = ({ title, date, isLoading, onClick }) => (
  <ListItem
    containerStyle={styles.listItemContainerStyle}
    overlayColor={'grey'}
    onPress={onClick}
    title={title}
    subtitle={(
      <View style={styles.subtitleContainerStyle}>
        <Icon style={styles.subtitleAvatar} size={16} name={'date-range'} />
        <Text style={styles.subtitleText}>{date}</Text>
      </View>
    )}
    avatar={isLoading ? loadingSpinner() : errorIcon()} />
);

const styles = StyleSheet.create({
  listItemContainerStyle: {
    backgroundColor: 'white'
  },
  subtitleContainerStyle: {
    flexDirection: 'row',
    paddingLeft: 8,
    alignItems: 'center',
  },
  subtitleAvatar: {
    paddingRight: 3
  },
  subtitleText: {}
});

export default SimpleItem;