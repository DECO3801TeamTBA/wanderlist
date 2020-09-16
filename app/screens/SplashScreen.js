import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to WanderList!</Text>
      <View>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <LinearGradient colors={['#08d4c4', '#01ab9d']}>
              <Text>Get Started</Text>
            </LinearGradient>
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
