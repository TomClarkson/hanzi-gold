import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Choice from './Choice';

var question = {
  title: 'Question Title',
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
  ]
}

export default class Quiz extends Component {
  handleSelectChoice(id) {
    console.log('selected choice id', id);
  }
  render() {
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