import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {SidebarScreen} from './SidebarScreen';
import MainTabScreen from './MainTabScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignUpScreen';
import ListScreen from './ListScreen';
import MapScreen from './side-screens/MapScreen';
import RewardsStackScreen from './stack-screens/RewardsStackScreen';

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={(props) => <SidebarScreen {...props} />}>
      <Drawer.Screen name="Home" component={MainTabScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Rewards" component={RewardsStackScreen} />
      <Drawer.Screen name="SignUp" component={SignupScreen} />
      <Drawer.Screen name="List" component={ListScreen} />
    </Drawer.Navigator>
  );
}
