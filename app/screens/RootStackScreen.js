/*
This contains all screens before login
author: Thanh Tran Vo @thanhtrv
*/
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Root" component={HomeScreen} />
    {/* <RootStack.Screen name="HomeScreen" component={HomeScreen} /> */}
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
