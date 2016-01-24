import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';

export default class Choice extends Component {
  handlePress(e) {
    console.log('handling press in choice component', e);
  }
  render() {
    let {onSelectChoice} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.choiceButton} onPress={onSelectChoice}>
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