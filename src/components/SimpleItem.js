import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

function loadingSpinner(){
  return (<ActivityIndicator style={{ paddingLeft: 8, paddingRight: 8 }} color="#222222" size={"small"} />);
}

function errorIcon(){
  return (<Avatar small rounded icon={{ name: 'error' }} />);
}

function loadedIcon(){
  return (<Avatar small rounded icon={{ name: 'check' }} />);
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

const SimpleItem = ({ title, date, views, isLoading, isError, titleLines, hideChevron, hideAvatar, onClick }) => {
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
      titleNumberOfLines={titleLines}
      subtitle={subtitleView}
      hideChevron={hideChevron}
      avatar={hideAvatar ? undefined : isError ? errorIcon() : isLoading ? loadingSpinner() : loadedIcon()}/>
  );
};

const styles = StyleSheet.create({
  listItemContainerStyle: {
    backgroundColor: 'white',
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