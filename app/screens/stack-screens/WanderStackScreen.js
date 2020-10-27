import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import WanderScreen from '../tab-screens/WanderScreen';
import ListScreen from '../ListScreen';


const WanderListStack = createStackNavigator();

export default function WanderStackScreen({navigation}) {
  return (
    <WanderListStack.Navigator>
      <WanderListStack.Screen
        name="Wander"
        component={WanderScreen}
        options={{
          title: 'Wander',
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
      <WanderListStack.Screen name="List" component={ListScreen} />
    </WanderListStack.Navigator>
  );
}
