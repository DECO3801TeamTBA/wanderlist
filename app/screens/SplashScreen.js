import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({navigation}) {

  return (
      <ImageBackground source={require('../../assets/Splash_Screen.png')}
      style={styles.container}>
        <Pressable onPress={() => {
          navigation.navigate('Login')
        }}
        style={{width:'100%', height:'100%'}}></Pressable>
      </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c8e6c9',
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


/*
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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinearGradient
              colors={['#81c784', '#388e3c']}
              style={styles.getStarted}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>

*/