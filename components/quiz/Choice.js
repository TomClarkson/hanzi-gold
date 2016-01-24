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
    let {title} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.choiceButton} onPress={this.handlePress.bind(this)}>
            <Text>Choice</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  choiceButton: {
    backgroundColor: 'yellow',
    padding: 20,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
});