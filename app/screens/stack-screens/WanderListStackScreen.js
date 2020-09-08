import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import WanderListScreen from '../tab-screens/WanderListScreen';

const WanderListStack = createStackNavigator();

export default function WanderListStackScreen({navigation}) {
  return (
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
}
