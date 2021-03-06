import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { mapStateItemToProps} from "../utils";
import TabNavigator from 'react-native-tab-navigator';
import SimpleItem from './SimpleItem';
import ContentSection from './ContentSection';
import ImageSection from './ImageSection';
import FileSection from './FileSection';

const loadingBottom = () => (
  <View style={styles.loadingContainerStyle}>
    <ActivityIndicator size={"large"} />
  </View>
);

const errorBottom = (reason) => (
  <View style={styles.errorContainerStyle}>
    <Text style={styles.errorHeaderStyle}>An error has occured!</Text>
    <Text style={styles.errorReasonStyle}>{reason || "Couldn't figure out the reason." }</Text>
  </View>
);

const createTabItem = (name, iconName, selectedName, onClick, children) => (
  <TabNavigator.Item
      selected={name === selectedName}
      onPress={() => onClick(name)}
      renderIcon={() => <Icon name={iconName} size={16} />}
      title={name}><View style={{ marginTop: 50, flex: 1 }}>{children}</View></TabNavigator.Item>
);

const bottomNavBar = (selectedName, onClick, contentSection, imageSection, fileSection) => (
  <TabNavigator tabBarStyle={[{ top: 0 }, styles.tabBarStyle]} style={{ marginBottom: -50 }}>
    { contentSection ? createTabItem("Content", "book", selectedName, onClick, contentSection) : null }
    { imageSection ? createTabItem("Images", "camera", selectedName, onClick, imageSection) : null }
    { fileSection ? createTabItem("Files", "files-o", selectedName, onClick, fileSection) : null }
  </TabNavigator>
);

const createContentSection = (content) => (<ContentSection content={content} />);
const createImageSection = (images) => (<ImageSection images={images} />);
const createFileSection = (files) => (<FileSection files={files} />);

class DetailPage extends Component{
  constructor(props){
    super(props);
    this.state = { selectedTabName: "Content" };
  }

  render(){
    const { title, views, date, content, images, files, isLoading, isError, errorReason } = this.props;
    const { selectedTabName } = this.state;
    const contentSection = content ? createContentSection(content) : null;
    const imageSection = images && images.length > 0 ? createImageSection(images) : null;
    const fileSection = files && files.length > 0 ? createFileSection(files) : null;

    return (
      <View style={styles.containerStyle}>
        <SimpleItem
          title={title}
          titleLines={3}
          views={views}
          date={date}
          hideAvatar={true}
          hideChevron={true}
        />
        <View style={styles.bottomContainerStyle}>
          {
            isError ?
              errorBottom(errorReason)
              :
              isLoading ?
                loadingBottom()
                :
                bottomNavBar(
                  selectedTabName,
                  (selectedTabName) => this.setState({ selectedTabName }),
                  contentSection, imageSection, fileSection
                )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  bottomContainerStyle: {
    flex: 1
  },
  loadingContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF88'
  },
  errorContainerStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  errorHeaderStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  errorReasonStyle: {

  },
  tabBarStyle: {
    backgroundColor: 'white'
  }
});

function mapStateToProps(state){
  const { id } = state.details;
  const item = (state.news.items || {})[id] || (state.notices.items || {})[id];
  return item ? mapStateItemToProps(item) : {};
}

export default connect(mapStateToProps, {})(DetailPage);

