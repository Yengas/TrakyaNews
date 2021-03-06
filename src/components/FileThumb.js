import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

function inferType(name){
  const extension = name.split('.').pop().trim();

  if(['doc', 'dot', 'wbk', 'docx', 'docm', 'dotx', 'dotm', 'docb'].indexOf(extension) !== -1)
    return "word";
  else if(['xls', 'xlt', 'xlm', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xla', 'xlam', 'xll', 'xlw'].indexOf(extension) !== -1)
    return "excel";
  else if(['ppt', 'pot', 'pps', 'pptx', 'pptm', 'potx', 'potm', 'ppam', 'ppsx', 'ppsm', 'sldx', 'sldm'].indexOf(extension) !== -1)
    return "powerpoint";
  else if(['aac', 'mp3', 'flac', 'm4a', 'ogg', 'oga', 'mogg', 'opus', 'wav', 'wma'].indexOf(extension) !== -1)
    return "audio";
  else if(['webm', 'mkv', 'flv', 'gifv', 'avi', 'wmv', 'mp4', 'm4v', 'mpg', 'mpeg', 'm2v'].indexOf(extension) !== -1)
    return "video";
  else if(['php', 'asp', 'html', 'java', 'hs', 'scala', 'js', 'css'].indexOf(extension) !== -1)
    return "code";

  return null;
}



const FileThumb = ({ downloadURL, size, fileSize, title, large }) => {
  const inferred = inferType(title);

  if(large)
    return (
      <View style={styles.largeContainerStyle}>
        <Text style={styles.largeTitleStyle}>{title}</Text>
        <Divider />
        <Icon style={styles.iconStyle} size={size} name={`file${inferred ? '-' + inferred : ''}-o`} />
        <Divider />
        <Text style={styles.largeSizeStyle}>{fileSize}</Text>
      </View>
    );
  else
    return (
      <View>
        <Icon style={styles.iconStyle} size={size} name={`file${inferred ? '-' + inferred : ''}-o`} />
      </View>
    );
};

const styles = StyleSheet.create({
  aboveContainerStyle: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  largeContainerStyle: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 5
  },
  largeTitleStyle: {
    textAlign: 'center'
  },
  largeSizeStyle: {
    textAlign: 'right'
  },
  sizeTextStyle: {

  },
  titleTextStyle: {
    alignSelf: 'center',
  },
  iconStyle: {}
});

export default FileThumb;