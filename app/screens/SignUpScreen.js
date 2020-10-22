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
    confirmPassword: '',
    email: '',
    phone_number: '',
    hasError: false,
    errorMessage: ''
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    const { username, password, email, phone_number, confirmPassword } = this.state;
    if (confirmPassword == password && strongRegex.test(password) && emailRegex.test(email)) {
      await axios
        .post(CONFIG.API_URL + 'Authenticate/register', {
          username,
          email,
          password,
        })
        .then((res) => {
          this.props.navigation.pop() //??
        })
        .catch(res => {
          console.log(res)
          this.setState({ hasError: true, errorMessage: res.data.message })
        })
    } else {
      if (password != confirmPassword) {
      this.setState({ errorMessage: "Passwords must match", hasError: true })
      } else if (!strongRegex.test(password)) {
        this.setState({ errorMessage: "Password is too weak. Must contain at least 1 lower case, 1 upper case, 1 special character, 1 number and least 8 characters long.", hasError: true })
      } else if (!emailRegex.test(email)) {
        this.setState({ errorMessage: "Invalid email.", hasError: true })
      } else {
        this.setState({ errorMessage: "Create user failed. Check details and try again.", hasError: true })
      }
      console.log("passwords must match")
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
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="mail-outline" size={24} color="#5F9E98" />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#4d4d4d"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="key" size={24} color="#5F9E98" />
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#4d4d4d"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="key" size={24} color="#5F9E98" />
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#4d4d4d"
            onChangeText={(text) => this.setState({ confirmPassword: text })}
          />
        </View>
        <View style={styles.button}>
          {this.state.hasError ? (<View>
            <Text>{this.state.errorMessage}</Text>
          </View>) : (<></>)}

          <TouchableOpacity style={styles.signUp}
          onPress={this.signUp}>
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
