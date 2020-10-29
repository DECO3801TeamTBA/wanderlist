import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import HeatMap from '../../components/MapComponent';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MapScreen({navigation}) {
  return (
    <View>
      <HeatMap />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Icon name="chevron-back" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 50 : 20,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#388e3c',
  },
});
