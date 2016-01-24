import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Quiz from '../components/quiz/Quiz';
import Colors from 'Colors';
import GoBackHeader from '../components/GoBackHeader';

export default class QuizScreen extends Component {
  render() {
    let { navigator } = this.props;
    return (
      <View style={styles.container}>
        <GoBackHeader navigator={navigator} />
        <Quiz />       
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREY_BG,
    flexDirection: 'column',
  }
});