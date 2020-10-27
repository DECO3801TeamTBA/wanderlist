import * as React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './stack-screens/HomeStackScreen';
import WanderStackScreen from './stack-screens/WanderStackScreen';
import RewardsStackScreen from './stack-screens/RewardsStackScreen';
import ProfileStackScreen from './stack-screens/ProfileStackScreen';
import ProfileScreen from './tab-screens/ProfileScreen'

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#5F9E98"
    inactiveColor="#000"
    barStyle={{
      backgroundColor: '#fff',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
      }}
    />

    <Tab.Screen
      name="Lists"
      component={WanderStackScreen}
      options={{
        tabBarIcon: ({color}) => <Icon name="reader" color={color} size={24} />,
      }}
    />

    {/*<Tab.Screen*/}
    {/*  name="Rewards"*/}
    {/*  component={RewardsStackScreen}*/}
    {/*  options={{*/}
    {/*    tabBarIcon: ({color}) => (*/}
    {/*      <Icon name="scan-circle" color={color} size={24} />*/}
    {/*    ),*/}
    {/*  }}*/}
    {/*/>*/}

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color}) => <Icon name="person" color={color} size={24} />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
