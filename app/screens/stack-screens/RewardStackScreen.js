import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import RewardScreen from '../tab-screens/RewardScreen';

const RewardStack = createStackNavigator();

export default function RewardStackScreen({navigation}) {
  return (
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
}
