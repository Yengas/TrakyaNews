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

function createDateBadge(date){
  return (
    <View style={styles.badgeContainerStyle}>
      <Icon style={styles.badgeAvatar} size={16} name={'date-range'} />
      <Text style={styles.badgeText}>{date}</Text>
    </View>
  );
}

function createViewBadge(view){
  return (
    <View style={styles.badgeContainerStyle}>
      <Icon style={styles.badgeAvatar} size={16} name={'remove-red-eye'} />
      <Text style={styles.badgeText}>{view}</Text>
    </View>
  );
}

const SimpleItem = ({ title, date, views, isLoading, onClick }) => {
  const dateBadge = date ? createDateBadge(date) : null;
  const viewBadge = views ? createViewBadge(views) : null;

  const subtitleView = (
    <View style={styles.subtitleContainerStyle}>
      { !!date ? createDateBadge(date) : null }
      { !!views ? createViewBadge(views) : null }
    </View>
  );

  return (
    <ListItem
      containerStyle={styles.listItemContainerStyle}
      overlayColor={'grey'}
      onPress={onClick}
      title={title}
      subtitle={subtitleView}
      avatar={isLoading ? loadingSpinner() : errorIcon()}/>
  );
};

const styles = StyleSheet.create({
  listItemContainerStyle: {
    backgroundColor: 'white'
  },
  badgeContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  subtitleContainerStyle: {
    flexDirection: 'row',
    paddingLeft: 8,
    alignItems: 'center',
  },
  badgeAvatar: {
    paddingRight: 3
  },
  badgeText: {}
});

export default SimpleItem;