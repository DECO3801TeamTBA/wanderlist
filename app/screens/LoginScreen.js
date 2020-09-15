/*
This is login screen
author: Thanh Tran Vo @thanhtrv
*/
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { connect } from 'react-redux';
import { setUser, setToken, setExpiry } from '../actions/user';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';




export class LoginScreenClass extends React.Component {
  state = {
    username: '',
    password: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>WanderList</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <Pressable>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
        <Pressable
          style={styles.loginBtn}
          onPress={() => {
            //email and password are state local only to this screen
            //no need to rope them into 
            const { username, password } = this.state;
            const payload = { username, password };
            console.log(payload);
            axios.post('https://deco3801-tba.uqcloud.net/api/Authenticate/login', payload)
              .then(res => {
                console.log(res);
                const token = res.data.authToken;
                const expiry = res.data.expiry;
                const user = res.data.user;
                this.props.attachUser(user);
                this.props.attachExpiry(expiry);
                this.props.attachToken(token);
                console.log("Success???");
                //Then navigate from here. Now in homescreen and beyond, we can check the global user state
              }).catch(res => {
                console.log(res);
                console.log("Login failed!");
              })
          }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </Pressable>
        <Pressable>
          <Pressable 
          style={styles.loginText}
          onPress={() => { 
            this.props.navigation.navigate('SignUp')
          }}>
          <Text style={styles.loginText}>Sign Up</Text>

          </Pressable>
         
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});


const mapStateToProps = (state) => {

  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attachUser: (user) => dispatch(setUser(user)),
    attachToken: (authToken) => dispatch(setToken(authToken)),
    attachExpiry: (expiry) => dispatch(setExpiry(expiry))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenClass);
