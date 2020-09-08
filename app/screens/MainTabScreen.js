import * as React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './stack-screens/HomeStackScreen';
import WanderStackScreen from './stack-screens/WanderStackScreen';
import RewardsStackScreen from './stack-screens/RewardsStackScreen';
import ProfileStackScreen from './stack-screens/ProfileStackScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({color}) => <Icon name="earth" color={color} size={22} />,
      }}
    />

    <Tab.Screen
      name="Wander"
      component={WanderStackScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="list-circle" color={color} size={24} />
        ),
      }}
    />

    <Tab.Screen
      name="Rewards"
      component={RewardsStackScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="scan-circle" color={color} size={24} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="person-circle" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
