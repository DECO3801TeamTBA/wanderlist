import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function ProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Wander Screen"
        onPress={() => navigation.navigate('Wander')}
      />
      <Button
        title="Rewards Screen"
        onPress={() => navigation.navigate('Rewards')}
      />
    </View>
  );
}
