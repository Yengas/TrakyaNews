import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";

const PageSelectionButton = ({ content, disabled, onClick }) => (
  <TouchableOpacity onPress={onClick} disabled={disabled}>
    <View style={[styles.buttonContainer, disabled ? { backgroundColor: 'grey' } : {}]}>
      <Text>{content}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    opacity: 100,
    borderRadius: 2,
    borderWidth: 1,
    marginRight: 2,
    borderColor: 'blue'
  }
});

export default PageSelectionButton;