import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Colors from 'Colors';

export default class Results extends Component {
  render() {
    let { questions } = this.props;
    let correctCount = questions.reduce((acc, question) => question.wasCorrect ? acc + 1 : acc, 0);

    return (
      <View style={styles.container}>
        <View style={styles.questionWrapper}>
          <View><Text style={styles.resultsHeaderText}>You got {correctCount} / {questions.length} correct!</Text></View>
        </View>
        <View style={styles.choicesWrapper}>
          <View style={styles.headerRow}>
            <Text style={styles.headerRowText}>Question</Text>
            <Text style={styles.headerRowText}>Your answer</Text>
            <Text style={styles.headerRowText}>Correct Answer</Text>
          </View>
          <View style={styles.answersWrapper}>
            {questions.map((question, index) => {

              let correctChoice = question.choices.find(c => c.id == question.correctChoiceId);
              let usersChoice = question.choices.find(c => c.id == question.answer);

              return (
                <View key={index} style={styles.resultRow}>
                  <Text style={styles.resultRowText}>{question.title}</Text>
                  <Text style={styles.resultRowText}>{usersChoice.title}</Text>
                  <Text style={styles.resultRowText}>{correctChoice.title}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}
// borderBottomWidth: 0,

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  questionWrapper: {
    backgroundColor: Colors.GOLD,
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  answerWrappers: {

  },
  choicesWrapper: {
    flex: 0.8,
    flexDirection: 'column',
    padding: 10
  },
  headerRow: {
    flexDirection: 'row', 
    height: 70, 
    alignItems: 'center', 
    borderBottomWidth: 2,
    borderColor: '#E1EEF3',
    borderStyle: 'solid',
  },
  headerRowText: {
    flex: 0.3, 
    fontWeight: 'bold',
    paddingLeft: 10
  },
  resultRowText: {
    flex: 0.3, 
    paddingLeft: 10,
    fontSize: 20
  },
  resultRow: {
    flexDirection: 'row', 
    flex: 1, 
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#E1EEF3',
    borderStyle: 'solid',
    height: 70
  },
  resultsHeaderText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: "bold"
  }
});