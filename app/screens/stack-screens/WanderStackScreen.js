import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WanderScreen from '../tab-screens/WanderScreen';
import ListScreen from '../ListScreen';

const WanderListStack = createStackNavigator();

export default function WanderStackScreen() {
  return (
    <WanderListStack.Navigator>
      <WanderListStack.Screen
        name="Wander"
        component={WanderScreen}
        options={{
          title: 'Wander',
        }}
      />
      <WanderListStack.Screen name="List" component={ListScreen} />
    </WanderListStack.Navigator>
  );
}
