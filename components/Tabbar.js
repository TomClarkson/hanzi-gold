import React, { 
  Component, Image, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import Colors from 'Colors';


export default class Tabbar extends React.Component {
  render() {
    return (
      <Text>Tabbar</Text>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.GREEN,
    padding: 20,
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 0,
    borderRadius: 8
  },
  whiteFont: {
    color: '#fff'
  }
});