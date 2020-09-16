import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabScreen from './app/screens/MainTabScreen';
import SettingsScreen from './app/screens/side-screens/SettingsScreen';
import SupportScreen from './app/screens/side-screens/SupportScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignUpScreen';

import {SidebarScreen} from './app/screens/SidebarScreen';
import DrawerScreen from './app/screens/DrawerScreen';
import SplashScreen from './app/screens/SplashScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={DrawerScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
