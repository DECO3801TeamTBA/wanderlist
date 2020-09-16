import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to WanderList!</Text>
      <View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f65ff',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
});
