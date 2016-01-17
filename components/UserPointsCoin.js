import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity
} from 'react-native';
import Colors from 'Colors';
import { Motion, spring } from 'react-motion/native';

export default class UserPointsCoin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {scale: 1};
	}
	componentWillReceiveProps(nextProps) {
	  if(nextProps.points > this.props.points) {
	  	this.setState({scale: 1.5});
	  } else {
	  	this.setState({scale: 0.75});
	  }

	  setTimeout(() => {
	  	this.setState({scale: 1});
	  }, 700);
	}
	render() {
		var {points} = this.props;
		return (
			<View style={styles.outerWrapper}>
				<View style={styles.innerWrapper}>
					<Motion style={{scale: spring(this.state.scale)}}>
					{m =>
						<Text style={{
							color: '#fff', 
							fontSize: 16, 
							fontWeight: 'bold', 
							transform: [{scale: m.scale}]}}>
							{points}
						</Text>
					}
					</Motion>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	outerWrapper: {
		height: 40,
		width: 40,
		borderRadius: 40,
		backgroundColor: '#FDDE4A',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3,
		borderColor: '#EAB700'
	},
	innerWrapper: {
		height: 30,
		width: 30,
		borderRadius: 30,
		backgroundColor: '#FAC15B',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#EAB700'
	}
}); 