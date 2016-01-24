import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Choice from './Choice';
import Results from './Results';
import allCharacters from 'Characters';

let getRandomCharacter = (characters) => 
  characters[Math.floor(Math.random() * characters.length)];

let getRandomCharacters = (limit, characters, randomCharacters = []) => {
  var randomCharacter = getRandomCharacter(characters);

  var randomCharacters = randomCharacters.concat([randomCharacter]);
  if(randomCharacters.length == limit) {
    return randomCharacters;
  }

  var characters = characters.filter(c => c.id != randomCharacter.id);
  return getRandomCharacters(limit, characters, randomCharacters);
}


let makeQuestion = (characters, questionId) => {
  var randomCharacters = getRandomCharacters(4, characters);
  
  var questionCharacter = getRandomCharacter(randomCharacters);

  var isQuestionInHanzi = Math.random() > 0.5;
  var choices = randomCharacters.map(c => ({
    id: c.id,
    title: isQuestionInHanzi ? c.english : c.hanzi 
  }));

  return {
    id: questionId,
    isQuestionInHanzi,
    title: isQuestionInHanzi ? questionCharacter.hanzi : questionCharacter.english,
    choices,
    correctChoiceId: questionCharacter.id
  };
};


export default class Quiz extends Component {
  constructor(props) {
    super(props);

    let questions = [1, 2, 3, 4, 5].map(num => makeQuestion(allCharacters, num));

    this.state = {
      activeIndex: 0,
      questions
    };
  }
  handleSelectChoice(choiceId) {
    let {questions, activeIndex} = this.state;
    let question = questions[activeIndex];
    question.answer = choiceId;
    question.wasCorrect = choiceId == question.correctChoiceId;

    this.setState({questions});
    this.setState({activeIndex: this.state.activeIndex + 1});
  }
  render() {
    var isOver = this.state.activeIndex == this.state.questions.length;

    if(isOver) {
      return (
        <Results questions={this.state.questions} />
      );
    }

    var question = this.state.questions[this.state.activeIndex];

    var { title, choices } = question;
    return (
      <View style={styles.container}>
        <View style={styles.questionWrapper}>
          <View><Text>{title}</Text></View>
        </View>
        <View style={styles.choicesWrapper}>
        {choices.map((c, index) => 
          <Choice key={c.id} 
            isFirst={index == 0}
            choice={c} 
            onSelectChoice={this.handleSelectChoice.bind(this)} />  
        )}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  questionWrapper: {
    backgroundColor: '#eee',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  choicesWrapper: {
    flex: 0.8,
    flexDirection: 'column',
  }
});