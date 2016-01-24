import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';

export default class Choice extends Component {
  handlePress(e) {
    this.props.onSelectChoice(
      this.props.choice.id
    );
  }
  render() {
    let {choice, isFirst} = this.props;
    let topMarginStyle = isFirst ? {marginTop: 20} : {};

    return (
      <TouchableOpacity style={[styles.choiceButton, topMarginStyle]} onPress={this.handlePress.bind(this)}>
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
    color: '#333'
  }
});