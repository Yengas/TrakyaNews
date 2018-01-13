import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PageSelection from './PageSelection';
import SimpleItem from './SimpleItem';
import LoadedItem from './LoadedItem';
import { mapStateItemToProps } from '../utils';
import { createPageChangeAction, createDetailSelectedAction } from '../actions/index'

function renderLoadingOverlay(){
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

function renderSingleListingItem(item, onClick){
  if(!item.isLoading)
    return (
      <LoadedItem
        title={item.title}
        date={item.date}
        views={item.views}
        content={item.content}
        images={item.images}
        files={item.files}
        onClick={onClick}
        />
    );
  else
    return (
      <SimpleItem
        title={item.title}
        date={item.date}
        isLoading={true}
        isError={item.isError}
        onClick={onClick}
        />
    );
}

class ListingPage extends Component{
  componentWillMount(){
    const { createPageChangeAction } = this.props;

    createPageChangeAction(1);
  }

  render(){
    const { loading, items } = this.props;
    const { createPageChangeAction, createDetailSelectedAction, navigation } = this.props;
    const navigateDetails = NavigationActions.navigate({ routeName: 'Detail' });

    return (
      <View style={styles.container}>
        {loading ? renderLoadingOverlay() : null}
        <View style={styles.content}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ margin: 1 }}/>}
            renderItem={({ item }) =>
              renderSingleListingItem(
                item,
                () => {
                  createDetailSelectedAction(item.id);
                  navigation.dispatch(navigateDetails);
                })
            } />
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

const mapStateToProps = (state) => {
  if(!state || !state.news || !state.notices || !state.listing) return {};
  const { news, notices, listing } = state;

  if(news.loading && notices.loading) return { loading: true };
  if(!news.loading && news.failed && !notices.loading && notices.failed) return { failed: true };
  // TODO: optimize, sort seperate, process and merge sort later?
  const allItems =  { ...(news.items || []), ...(notices.items || []) };
  const items = Object.keys(allItems).map(key => {
    const item = allItems[key];
    return mapStateItemToProps(item);
  // TODO: could optimize the sort here aswell.
  }).sort((a, b) => a.date == b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date));

  return { loading: false, items };
};

export default connect(mapStateToProps, { createPageChangeAction, createDetailSelectedAction })(ListingPage);