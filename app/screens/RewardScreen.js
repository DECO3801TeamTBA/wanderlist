/*
Home Screen
*/

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class RewardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>RewardScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
});
