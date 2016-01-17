import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity
} from 'react-native';
import Colors from 'Colors';
import UserPointsCoin from './UserPointsCoin';
import BackButton from './BackButton';
import { connect } from 'react-redux/native';

class Header extends React.Component {
	render() {
		let {points, navigator} = this.props;

		return (
			<View style={styles.headerContainer}>
				<BackButton navigator={navigator} />
				<UserPointsCoin points={points} />
			</View>
		);
	}
}

export default connect(state => ({points: state.user.points}))(Header);

var styles = StyleSheet.create({
	headerContainer: {
		height: 70,
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 15,
		backgroundColor: Colors.GOLD,
		alignItems: 'center',
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	headerText: {
		color: Colors.WHITE,
		fontSize: 22,
		fontWeight: "bold"
	}
}); 