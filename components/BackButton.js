import React, { 
  Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import ExRouter from 'ExRouter';

export default class BackButton extends Component {
  goBack() {
    this.props.navigator.push(ExRouter.getDashboardRoute());

    // the following code wasn't working inside of the exponent contest app for some reason

    // let currentRoutes = this.props.navigator.getCurrentRoutes();
    // if([0,1].includes(currentRoutes.length)) {
    //   return this.props.navigator.push(ExRouter.getDashboardRoute());
    // }

    // let previousRoute = currentRoutes[currentRoutes.length -2];
    // let wrappedComponent = previousRoute.scene.getWrappedInstance();
    // if(wrappedComponent) {
    //   if(wrappedComponent.constructor.name == 'Onboarding') {
    //     return this.props.navigator.push(ExRouter.getDashboardRoute());   
    //   }
    // }
    // this.props.navigator.pop();
  }
  render() {
    
    return (
      <View>
        <TouchableHighlight onPress={this.goBack.bind(this)}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>
            ←
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}