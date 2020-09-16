import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <View>
      <Text>Welcome to WanderList!</Text>
      <View>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
