import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';

export default class Quiz extends Component {
  handlePress(e) {
    console.log('handling press', e);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.choiceButton} onPress={this.handlePress.bind(this)}>
            <Text>Choice</Text>
        </TouchableOpacity>
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
  choiceButton: {
    backgroundColor: 'yellow',
    padding: 20,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
});