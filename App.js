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
// import RootStackScreen from './app/screens/RootStackScreen';
// import HomeScreen from './app/screens/HomeScreen';
// import ProfileScreen from './app/screens/ProfileScreen';
// import WanderListScreen from './app/screens/WanderListScreen';
// import AddScreen from './app/screens/AddScreen';
// import RewardScreen from './app/screens/RewardScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="WanderList Screen"
        onPress={() => navigation.navigate('WanderList')}
      />
      <Button
        title="Reward Screen"
        onPress={() => navigation.navigate('Reward')}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const WanderListScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>WanderList Screen</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Reward Screen"
        onPress={() => navigation.navigate('Reward')}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const RewardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Reward Screen</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button
        title="WanderList Screen"
        onPress={() => navigation.navigate('WanderList')}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button
        title="WanderList Screen"
        onPress={() => navigation.navigate('WanderList')}
      />
      <Button
        title="Reward Screen"
        onPress={() => navigation.navigate('Reward')}
      />
    </View>
  );
};

const HomeStack = createStackNavigator();
const WanderListStack = createStackNavigator();
const RewardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
      }}
    />
  </ProfileStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      {/*<Stack.Navigator>*/}
      {/*  <Stack.Screen name="Home" component={HomeScreen} />*/}
      {/*  <Stack.Screen name="WanderList" component={WanderListScreen} />*/}
      {/*  <Stack.Screen name="Reward" component={RewardScreen} />*/}
      {/*  <Stack.Screen name="Profile" component={ProfileScreen} />*/}
      {/*</Stack.Navigator>*/}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="WanderList" component={WanderListStackScreen} />
        <Drawer.Screen name="Reward" component={RewardStackScreen} />
        <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      </Drawer.Navigator>
      {/* <RootStackScreen /> */}
      {/*<Tab.Navigator>*/}
      {/*  <Tab.Screen*/}
      {/*    name="Home"*/}
      {/*    component={HomeScreen}*/}
      {/*    options={{*/}
      {/*      tabBarIcon: ({color}) => (*/}
      {/*        <Icon name="earth" color={color} size={28} />*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}

      {/*  <Tab.Screen*/}
      {/*    name="WanderList"*/}
      {/*    component={WanderListScreen}*/}
      {/*    options={{*/}
      {/*      tabBarIcon: ({color}) => (*/}
      {/*        <Icon name="list-circle" color={color} size={30} />*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}

      {/*  <Tab.Screen*/}
      {/*    name="Add"*/}
      {/*    component={AddScreen}*/}
      {/*    options={{*/}
      {/*      tabBarIcon: ({color}) => (*/}
      {/*        <Icon name="add-circle" color={color} size={30} />*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}

      {/*  <Tab.Screen*/}
      {/*    name="Reward"*/}
      {/*    component={RewardScreen}*/}
      {/*    options={{*/}
      {/*      tabBarIcon: ({color}) => (*/}
      {/*        <Icon name="scan-circle" color={color} size={30} />*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}

      {/*  <Tab.Screen*/}
      {/*    name="Profile"*/}
      {/*    component={ProfileScreen}*/}
      {/*    options={{*/}
      {/*      tabBarIcon: ({color}) => (*/}
      {/*        <Icon name="person-circle" color={color} size={30} />*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Tab.Navigator>*/}
    </NavigationContainer>
  );
}
