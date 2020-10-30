import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';

export default function SplashScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../../assets/Splash_Screen.png')}
      style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={{width: '100%', height: '100%'}}
      />
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
