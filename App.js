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
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './app/screens/HomeScreen';
import WanderListScreen from './app/screens/WanderListScreen';
import RewardScreen from './app/screens/RewardScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import LoginScreen from './app/screens/LoginScreen';

// import RootStackScreen from './app/screens/RootStackScreen';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const WanderListStack = createStackNavigator();
const RewardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import Icon from 'react-native-vector-icons/Ionicons';

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
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
  </HomeStack.Navigator>
);

const WanderListStackScreen = ({navigation}) => (
  <WanderListStack.Navigator>
    <WanderListStack.Screen
      name="WanderList"
      component={WanderListScreen}
      options={{
        title: 'WanderList',
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
  </WanderListStack.Navigator>
);

const RewardStackScreen = ({navigation}) => (
  <RewardStack.Navigator>
    <RewardStack.Screen
      name="Reward"
      component={RewardScreen}
      options={{
        title: 'Reward',
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
  </RewardStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
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
  </ProfileStack.Navigator>
);

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
      name="WanderList"
      component={WanderListStackScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="list-circle" color={color} size={24} />
        ),
      }}
    />

    <Tab.Screen
      name="Reward"
      component={RewardStackScreen}
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

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainTabScreen} />
        {/*<Drawer.Screen name="WanderList" component={WanderListStackScreen} />*/}
        {/*<Drawer.Screen name="Reward" component={RewardStackScreen} />*/}
        {/*<Drawer.Screen name="Profile" component={ProfileStackScreen} />*/}

        {/*<Drawer.Screen name="Login" component={LoginScreen} />*/}
      </Drawer.Navigator>

      {/*<Stack.Navigator>*/}
      {/*  <Stack.Screen name="Home" component={HomeScreen} />*/}
      {/*  <Stack.Screen name="WanderList" component={WanderListScreen} />*/}
      {/*  <Stack.Screen name="Reward" component={RewardScreen} />*/}
      {/*  <Stack.Screen name="Profile" component={ProfileScreen} />*/}
      {/*</Stack.Navigator>*/}

      {/* <RootStackScreen /> */}
    </NavigationContainer>
  );
}

// const HomeScreen = ({navigation}) => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//       <Button
//         title="WanderList Screen"
//         onPress={() => navigation.navigate('WanderList')}
//       />
//       <Button
//         title="Reward Screen"
//         onPress={() => navigation.navigate('Reward')}
//       />
//       <Button
//         title="Profile Screen"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// };

// const WanderListScreen = ({navigation}) => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>WanderList Screen</Text>
//       <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
//       <Button
//         title="Reward Screen"
//         onPress={() => navigation.navigate('Reward')}
//       />
//       <Button
//         title="Profile Screen"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// };

// const RewardScreen = ({navigation}) => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Reward Screen</Text>
//       <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
//       <Button
//         title="WanderList Screen"
//         onPress={() => navigation.navigate('WanderList')}
//       />
//       <Button
//         title="Profile Screen"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// };

// const ProfileScreen = ({navigation}) => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Profile Screen</Text>
//       <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
//       <Button
//         title="WanderList Screen"
//         onPress={() => navigation.navigate('WanderList')}
//       />
//       <Button
//         title="Reward Screen"
//         onPress={() => navigation.navigate('Reward')}
//       />
//     </View>
//   );
// };
