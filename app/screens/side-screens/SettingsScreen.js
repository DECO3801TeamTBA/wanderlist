import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeatMap from '../../components/MapComponent';

const SettingsScreen = () => {
  return <View>{HeatMap()}</View>;
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
