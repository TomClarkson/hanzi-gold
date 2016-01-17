/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule ExRouter
 */
'use strict';

import React, {
  Platform,
  StatusBarIOS,
  Text,
  View,
} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator';
import Splash from '../screens/Splash';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Learn from '../screens/Learn';

const ExRouter = {
  getLoginRoute() {
    return {
      getSceneClass() {
        return Login;
      },
      configureScene() {
        return ExNavigator.SceneConfigs.Fade;
      }
    }
  },
  getDashboardRoute({sceneConfig} = {}) {
    return {
      getSceneClass() {
        return Dashboard
      },
      configureScene() {
        if(sceneConfig) {
          return sceneConfig;
        }

        return ExNavigator.SceneConfigs.Fade;
      }
    };
  },
  getHomeRoute() {
    return {
      getSceneClass() {
        // return Splash;
        return Dashboard;
      }
    };
  },
  getLearnRoute() {
    return {
      getSceneClass() {
        return Learn;
      },
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromBottom;
      }
    };
  }
};

export default ExRouter;
