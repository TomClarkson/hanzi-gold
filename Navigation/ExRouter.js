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
import Onboarding from '../screens/Onboarding';
import CharacterList from '../screens/CharacterList';
import CharacterDetail from '../screens/CharacterDetail';
import Quiz from '../screens/Quiz';

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
        return Splash;
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
  },
  getOnboardingRoute() {
    return {
      getSceneClass() {
        return Onboarding;
      },
      configureScene() {
        return ExNavigator.SceneConfigs.ZoomFromFront;
      }
    };
  },
  getCharacterListRoute() {
    return {
      getSceneClass(navigator) {
        return CharacterList;
      },
      configureScene() {
        return ExNavigator.SceneConfigs.ZoomFromFront;
      }
    };
  },
  getCharacterDetailRoute() {
    return {
      getSceneClass(navigator) {
       return CharacterDetail;
      },
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromRight;
      }
    }; 
  },
  getQuizModeRoute() {
    return {
      getSceneClass(navigator) {
       return Quiz;
      },
      configureScene() {
        return ExNavigator.SceneConfigs.FloatFromRight;
      }
    }; 
  }
};

export default ExRouter;
