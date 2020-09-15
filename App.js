import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MainTabScreen from './app/screens/MainTabScreen';
import SettingsScreen from './app/screens/side-screens/SettingsScreen';
import SupportScreen from './app/screens/side-screens/SupportScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignUpScreen';

import {SidebarScreen} from './app/screens/SidebarScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <SidebarScreen {...props} />}>
        <Drawer.Screen name="Home" component={MainTabScreen} />
        <Drawer.Screen name="LogIn" component={LoginScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Support" component={SupportScreen} />
        <Drawer.Screen name="SignUp" component={SignupScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
