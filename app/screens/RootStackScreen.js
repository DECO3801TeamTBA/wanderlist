import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import DrawerScreen from './DrawerScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator>
    <RootStack.Screen name="Splash" component={SplashScreen} />
    <RootStack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="Home"
      component={DrawerScreen}
      options={{headerShown: false}}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
