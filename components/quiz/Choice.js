import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import { Motion, spring } from 'react-motion/native';
import Colors from 'Colors';

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrect: false,
      isWrong: false
    };
  }
  handlePress(e) {
    if(! this.props.question.answer) {
      this.props.onSelectChoice(
        this.props.choice.id
      );  
    }
  }
  render() {
    let {question, choice, isFirst} = this.props;
    let topMarginStyle = isFirst ? {marginTop: 20} : {};
    
    var wrongStyle = {};
    var correctStyle = {};

    if(question.answer) {
      if(question.correctChoiceId == choice.id) {
        correctStyle = {backgroundColor: Colors.GREEN};
      }

      if(question.answer == choice.id && choice.id != question.correctChoiceId) {
        wrongStyle = {backgroundColor: Colors.RED};
      }
    }

    return (
      <TouchableOpacity 
        style={[styles.choiceButton, topMarginStyle, wrongStyle, correctStyle]} 
        onPress={this.handlePress.bind(this)}>
          <Text style={styles.choiceText}>{choice.title}</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  choiceButton: {
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E1EEF3',
    borderWidth: 2,
    borderRadius: 5,
    flex: 1,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  choiceText: {
    color: '#333',
    fontSize: 30
  }
});