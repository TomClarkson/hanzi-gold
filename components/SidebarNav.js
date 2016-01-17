import React, { 
	Component, Image, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity
} from 'react-native';
import Colors from 'Colors';
import Header from './Header';

var hamburgerIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABsCAYAAADt5bniAAAAAXNSR0IArs4c6QAAAfdJREFUeAHt3VGRAkEQREEgTsYZOZMYwci5gh1MVEVUYqB7st83e39fv5sfgZDAIzTXWAJfAQEKISogwCi/4QLUQFRAgFF+wwWogaiAAKP8hgtQA1EBAUb5DRegBqICAozyGy5ADUQFBBjlN1yAGogKCDDKb7gANRAV+Lmm/0c3MJwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBApcD9+lTcs3IzS00InAB9rHDi1J2P9O9YnXeZ2UqAM6fufKgAO+8ys5UAZ07d+VABdt5lZisBzpy686EC7LzLzFYCnDl150MF2HmXma0EOHPqzocKsPMuM1sJcObUnQ8VYOddZrYS4MypOx8qwM67zGwlwJlTdz70fKzwr3M1WxEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLzAudTXb/zCgBiAr4VF6M3+Aj4cyIdRAUEGOU3XIAaiAoIMMpvuAA1EBUQYJTfcAFqICogwCi/4QLUQFRAgFF+wwWogaiAAKP8hgtQA1EBAUb5DRegBqICAozyG36+FffCQIAAgUmBD4uOFLZEmC6mAAAAAElFTkSuQmCC';

export default class SidebarNav extends React.Component {
	render() {
		let {onToggleDraw} = this.props;

		return (
			<View style={styles.container}>
			  <Header showUserPointsCoin={false} onToggleDraw={onToggleDraw} />
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: Colors.GREY_BG
	}
});