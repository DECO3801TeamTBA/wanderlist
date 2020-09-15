import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <View>
      <Text>Welcome to WanderList!</Text>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;
