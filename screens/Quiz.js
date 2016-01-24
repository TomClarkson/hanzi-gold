import React, { 
	Component, StyleSheet, View, Text
} from 'react-native';

export default class Quiz extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Quiz to come here</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  }
}); 