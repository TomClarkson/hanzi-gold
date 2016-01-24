import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Choice from './Choice';
import Results from './Results';

let getQuestions = () => {
  return [
    {
      title: 'One plus one',
      choices: [
        {
          id: 1,
          title: 'one'
        },
        {
          id: 2,
          title: 'two'
        },
        {
          id: 3,
          title: 'three'
        },
        {
          id: 4,
          title: 'four'
        }
      ],
      correctChoiceId: 2
    },
    {
      title: 'Two minus one',
      choices: [
        {
          id: 1,
          title: 'one'
        },
        {
          id: 2,
          title: 'two'
        },
        {
          id: 3,
          title: 'three'
        },
        {
          id: 4,
          title: 'four'
        }
      ],
      correctChoiceId: 1
    },
  ];
};


export default class Quiz extends Component {
  constructor(props) {
    super(props);

    let questions = getQuestions();
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