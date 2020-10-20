import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../tab-screens/ProfileScreen';
import RewardsScreen from '../RewardsScreen'

const ProfileStack = createStackNavigator();

export default function ProfileStackScreen({navigation}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={30}
              backgroundColor="#ffffff"
              color="#000000"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <ProfileStack.Screen
      name="Rewards"
      component={RewardsScreen}/>
    </ProfileStack.Navigator>
  );
}
