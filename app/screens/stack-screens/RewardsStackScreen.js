import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import RewardsScreen from '../side-screens/RewardsScreen';

const RewardsStack = createStackNavigator();

export default function RewardsStackScreen({navigation}) {
  return (
    <RewardsStack.Navigator>
      <RewardsStack.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          title: 'Rewards',
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
    </RewardsStack.Navigator>
  );
}
