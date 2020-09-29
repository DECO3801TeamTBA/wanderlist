import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Splash"
      component={SplashScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
