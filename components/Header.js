import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity
} from 'react-native';
import Colors from 'Colors';
import DrawerLayout from 'react-native-drawer-layout';
import UserPointsCoin from './UserPointsCoin';
import { connect } from 'react-redux/native';

var hamburgerIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABsCAYAAADt5bniAAAAAXNSR0IArs4c6QAAAfdJREFUeAHt3VGRAkEQREEgTsYZOZMYwci5gh1MVEVUYqB7st83e39fv5sfgZDAIzTXWAJfAQEKISogwCi/4QLUQFRAgFF+wwWogaiAAKP8hgtQA1EBAUb5DRegBqICAozyGy5ADUQFBBjlN1yAGogKCDDKb7gANRAV+Lmm/0c3MJwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBApcD9+lTcs3IzS00InAB9rHDi1J2P9O9YnXeZ2UqAM6fufKgAO+8ys5UAZ07d+VABdt5lZisBzpy686EC7LzLzFYCnDl150MF2HmXma0EOHPqzocKsPMuM1sJcObUnQ8VYOddZrYS4MypOx8qwM67zGwlwJlTdz70fKzwr3M1WxEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLzAudTXb/zCgBiAr4VF6M3+Aj4cyIdRAUEGOU3XIAaiAoIMMpvuAA1EBUQYJTfcAFqICogwCi/4QLUQFRAgFF+wwWogaiAAKP8hgtQA1EBAUb5DRegBqICAozyG36+FffCQIAAgUmBD4uOFLZEmC6mAAAAAElFTkSuQmCC';

class Header extends React.Component {
	render() {
		let {title, onToggleDraw, showUserPointsCoin, showTitle, points} = this.props;

		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity
				  onPress={onToggleDraw}
				  style={styles.menuButtonContainer}>
				  <Image
				    style={styles.menuButton}
				    source={{uri: hamburgerIcon}} />
				</TouchableOpacity>
				{showUserPointsCoin &&
					<Text style={styles.headerText}>{title}</Text>
				}
				
			  	{showUserPointsCoin &&
			  		<UserPointsCoin points={points} />
			  	}
			</View>
		);
	}
}

Header.defaultProps = {
	showUserPointsCoin: true,
	showTitle: true
};

export default connect(state => ({points: state.user.points}))(Header);

var styles = StyleSheet.create({
	menuButtonContainer: {
	  
	},
	menuButton: {
	  width: 25.5,
	  height: 17.5,
	},
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