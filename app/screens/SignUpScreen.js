// SignUp.js
import React from 'react';
import axios from 'axios';
import CONFIG from '../config';

import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

export default class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
  };
  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };
  signUp = async () => {
    const {username, password, email, phone_number} = this.state;
    try {
      // here place  signup logic
      axios
        .post(CONFIG.API_URL + '/Authenticate/register', {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      console.log('user successfully signed up!: ', success);
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WanderList</Text>
        <View style={styles.inputView}>
          <Icon name="person" size={24} color="#5F9E98" />
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#4d4d4d"
            onChangeText={(text) => this.setState({username: text})}
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="key" size={24} color="#5F9E98" />
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#4d4d4d"
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="key" size={24} color="#5F9E98" />
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#4d4d4d"
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signUp}>
            <LinearGradient
              colors={['#81c784', '#4caf50']}
              style={styles.signIn}>
              <Text style={styles.textSignIn}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signIn}>
            <Pressable
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={styles.textSignUp}>Sign In</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </View>
      // <View style={styles.container}>
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Username"
      //     autoCapitalize="none"
      //     placeholderTextColor="white"
      //     onChangeText={(val) => this.onChangeText('username', val)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Password"
      //     secureTextEntry={true}
      //     autoCapitalize="none"
      //     placeholderTextColor="white"
      //     onChangeText={(val) => this.onChangeText('password', val)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Email"
      //     autoCapitalize="none"
      //     placeholderTextColor="white"
      //     onChangeText={(val) => this.onChangeText('email', val)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Phone Number"
      //     autoCapitalize="none"
      //     placeholderTextColor="white"
      //     onChangeText={(val) => this.onChangeText('phone_number', val)}
      //   />
      //   <Button title="Sign Up" onPress={this.signUp} />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
  },
  button: {
    width: '80%',
    alignItems: 'center',
    marginTop: 50,
  },
  inputView: {
    width: '60%',
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  inputText: {
    paddingLeft: 10,
    marginTop: Platform.OS === 'ios' ? 0 : -10,
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignIn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#388e3c',
    borderWidth: 1,
    marginTop: 15,
  },
  textSignUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  // input: {
  //   width: 350,
  //   height: 55,
  //   backgroundColor: '#42A5F5',
  //   margin: 10,
  //   padding: 8,
  //   color: 'white',
  //   borderRadius: 14,
  //   fontSize: 18,
  //   fontWeight: '500',
  // },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
