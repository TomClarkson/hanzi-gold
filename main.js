/**
 * @providesModule main
 */
'use strict';

import React, {
  AppRegistry,
  BackAndroid,
  PixelRatio,
  StyleSheet,
  View,
  AsyncStorage,
  Platform,
  Navigator,
  Text,
  Component
} from 'react-native';

import Colors from 'Colors';
import ExNavigator from '@exponent/react-native-navigator';
import ExRouter from 'ExRouter';
import configureStore from './redux/configureStore';
import getCardsToStudy from './domain/getCardsToStudy';
import { Provider } from 'react-redux/native';

getCardsToStudy(5).then(cards => {
  console.log('cards', cards);
});

AsyncStorage.getItem('cards')
  .then(c => c ? c : [])
  .then(cards => {
    console.log('still works', cards);
  });

let store = configureStore();

class Main extends Component {
  componentDidMount() {
    if (BackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this._navigator.getCurrentRoutes().length > 1) {
          this._navigator.pop();
          return true;
        }

        return false;
      });
    }
  }

  render() {
    let initialRoute = ExRouter.getHomeRoute();

    return (
      <Provider store={store}>
        {() => 
          <ExNavigator
            ref={component => this._navigator = component}
            initialRoute={initialRoute}
            showNavigationBar={false} />
        }
      </Provider>  
    );
  }
}

AppRegistry.registerComponent('main', () => Main);