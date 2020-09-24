import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setExpiry } from '../actions/user'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const SplashScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  /*
  The behaviour for this screen is as follows:
  1. Load persistently stored user, token and expiration from storage
  2. If there is none, go straight to Login
  3. if there they are stored, set global state of the value and go Home
  */
  useEffect(() => {
    async function checkAsyncStorage() {
      try {
        const value = await AsyncStorage.getItem('persistentAuth')
        if (value !== null) {
          const auth = JSON.parse(value)
          //have to compare them as ISO strings
          const result = auth.expiry.toString() < (new Date()).toISOString()
          //check if expired
          if (result) {
            navigation.navigate('Login')
          } else {
            //set global state
            dispatch(setUser(auth.user))
            dispatch(setToken(auth.authToken))
            dispatch(setExpiry(auth.expiry))
            navigation.navigate('Home')
          }
        } else {
          navigation.navigate('Login')
        }
      } catch (e) {
        // error reading value
        console.log("Why though? " + e)
      }
    }
    checkAsyncStorage()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="3000"
          source={require('../../assets/logo.png')}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Text style={styles.title}>Welcome to WanderList!</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <LinearGradient
              colors={['#0384fc', '#0345fc']}
              style={styles.getStarted}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f65ff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 40,
  },
  getStarted: {
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  getStartedText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
