import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Choice from './Choice';

var question = {
  choices: [
    {
      id: 1,
      title: 'one'
    }
  ]
}

export default class Quiz extends Component {
  handleSelectChoice(id) {
    console.log('selected choice id', id);
  }
  render() {
    return (
      <View style={styles.container}>
        <Choice key={question.choices[0].id} choice={question.choices[0]} onSelectChoice={this.handleSelectChoice.bind(this)} />
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