import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import SimpleItem from './SimpleItem';
import FileThumb from './FileThumb';

const CardSection = ({ title, children }) => (
  <View style={styles.cardSectionContainerStyle}>
    <Divider />
    <Text style={styles.cardSectionTitleStyle}>{title}</Text>
    <Divider />
    {children}
    <Divider />
  </View>
);

function renderContentSection(content){
  return (
    <CardSection title={"Content"}>
      <Text selectable={true}>{content}</Text>
    </CardSection>
  );
}

function renderImageSection(images){
  return (
    <CardSection title={"Images"}>
      <FlatList
        data={images}
        horizontal={true}
        keyExtractor={(uri) => uri}
        renderItem={({ item: uri }) => <Image style={styles.imageSectionImageStyle} source={{ uri }} /> } />
    </CardSection>
  );
}

function renderFilesSection(files){
  return (
    <View style={styles.fileSectionStyle}>
      <Text style={styles.cardSectionTitleStyle}>{"Files: "}</Text>
      <FlatList
        data={files}
        horizontal={true}
        keyExtractor={(item) => item.href}
        renderItem={({ item }) => <FileThumb title={item.title} size={16} fileSize={item.size} downloadURL={item.href} /> }/>
    </View>
  );
}

const LoadedItem = ({ title, views, date, content, images, files, contentTrim, onClick }) => (
  <Card containerStyle={{ padding: 0, margin: 0 }}>
    <SimpleItem
      title={title} views={views} date={date}
      isLoading={false} onClick={onClick}>
    </SimpleItem>
    { !!content ? renderContentSection(content.substring(0, contentTrim || 300) + (content.length > 300 ? "..." : "")) : null}
    { !!images ? renderImageSection(images) : null}
    { !!files ? renderFilesSection(files) : null}
  </Card>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  cardSectionContainerStyle: {
    flexDirection: 'column'
  },
  cardSectionTitleStyle: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  imageSectionStyle: {
    flexDirection: 'row'
  },
  imageSectionImageStyle: {
    width: 96,
    height: 96
  },
  fileSectionStyle: {
    flexDirection: 'row'
  }
});

export default LoadedItem;