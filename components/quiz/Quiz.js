import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Choice from './Choice';

export default class Quiz extends Component {
  handleSelectChoice(e) {
    console.log('handling press from choice', e);
  }
  render() {
    return (
      <View style={styles.container}>
        <Choice onSelectChoice={this.handleSelectChoice.bind(this)} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});