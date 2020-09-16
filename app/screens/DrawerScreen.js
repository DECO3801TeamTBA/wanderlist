import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {SidebarScreen} from './SidebarScreen';
import MainTabScreen from './MainTabScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './side-screens/SettingsScreen';
import SupportScreen from './side-screens/SupportScreen';
import SignupScreen from './SignUpScreen';

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={(props) => <SidebarScreen {...props} />}>
      <Drawer.Screen name="Home" component={MainTabScreen} />
      <Drawer.Screen name="LogIn" component={LoginScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="SignUp" component={SignupScreen} />
    </Drawer.Navigator>
  );
}
