import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
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

function renderSingleListingItem(item){
  if(!item.isError && (item.content || item.views))
    return (
      <LoadedItem
        title={item.title}
        date={item.date}
        views={item.views}
        content={item.content}
        images={item.images}
        files={item.files}
        />
    );
  else
    return (
      <SimpleItem
        title={item.title}
        date={item.date}
        isLoading={true}
        isError={item.isError}
        />
    );
}

class ListingPage extends Component{
  render(){
    const { loading, items } = this.props;

    return (
      <View style={styles.container}>
        {loading ? renderLoadingOverlay() : null}
        <View style={styles.content}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderSingleListingItem(item)} />
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

    return {
      id: item.id, title: item.title, date: item.date, views: item.hitCount, content: item.content,
      href: item.href, thumb: item.thumb, images: [...(item.images || []), ...((item.extras || {}).images || [])],
      files: [...((item.extras || {}).files || [])], isError: item.detailed && item.detailed.failed
    };
  // TODO: could optimize the sort here aswell.
  }).sort((a, b) => a.date == b.date ? a.title.localeCompare(b.title) : a.date.localeCompare(b.date));

  return { loading: false, items };
};

export default connect(mapStateToProps, {})(ListingPage);