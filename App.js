// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// // import {
// //   Header,
// //   LearnMoreLinks,
// //   Colors,
// //   DebugInstructions,
// //   ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>/* Rest of your app code */
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>

//   );
// };

// export default App;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import AppNavigator from './app/app.navigator';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <NavigationContainer>
//         <AppNavigator/>
//       </NavigationContainer>
//     );
//   }
// }

// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootStackScreen from './app/screens/RootStackScreen';
import HomeScreen from './app/screens/HomeScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import WanderListScreen from './app/screens/WanderListScreen';
import RewardScreen from './app/screens/RewardScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <RootStackScreen /> */}
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reward" component={RewardScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="WanderList" component={WanderListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
