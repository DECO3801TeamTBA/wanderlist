import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function WanderScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Wander Screen</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Rewards Screen"
        onPress={() => navigation.navigate('Rewards')}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}
