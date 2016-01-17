import React, { 
	Component, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Colors from 'Colors';

export default class Button extends Component {
	render() {
		return (
			<TouchableOpacity style={styles.button} onPress={this.props.onPress}>
				  <Text style={styles.whiteFont}>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.GREEN,
    padding: 20,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
  whiteFont: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});