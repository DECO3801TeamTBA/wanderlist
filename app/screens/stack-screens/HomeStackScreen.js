import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../tab-screens/HomeScreen';
import SplashScreen from '../SplashScreen';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator initialRouteName="Splash">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
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
      <HomeStack.Screen name="Splash" component={SplashScreen} />
    </HomeStack.Navigator>
  );
}
