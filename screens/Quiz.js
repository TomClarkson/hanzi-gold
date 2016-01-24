import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Quiz from '../components/quiz/Quiz';

export default class QuizScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Quiz />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});