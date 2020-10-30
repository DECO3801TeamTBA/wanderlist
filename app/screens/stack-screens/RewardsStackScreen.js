import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RewardsScreen from '../side-screens/RewardsScreen';
import RewardDetailsScreen from '../RewardDetailsScreen';
import {HeaderBackButton} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';

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
            <HeaderBackButton
              onPress={() => {
                navigation.dispatch(CommonActions.goBack());
              }}
            />
          ),
        }}
      />
      <RewardsStack.Screen
        name="RewardDetails"
        component={RewardDetailsScreen}
        options={{
          title: 'Reward Details',
        }}
      />
    </RewardsStack.Navigator>
  );
}
