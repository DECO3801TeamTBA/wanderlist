import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 1000);
  }

  render() {
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
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
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
  }
}

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
