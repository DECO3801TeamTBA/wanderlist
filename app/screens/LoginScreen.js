import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {setUser, setToken, setExpiry, setIsAuth} from '../actions/user';
import axios from 'axios';
import CONFIG from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
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
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={async () => {
              //email and password are state local only to this screen
              //no need to rope them into
              const {username, password} = this.state;
              const payload = {username, password};
              await axios
                .post(CONFIG.API_URL + 'authenticate/login', payload)
                .then(async (res) => {
                  //console.log(res);
                  const authToken = res.data.token;
                  const expiry = res.data.expiration;
                  const user = res.data.user;
                  this.props.attachUser(user);
                  this.props.attachExpiry(expiry);
                  this.props.attachToken(authToken);
                  this.props.attachIsAuth(true)
                  await AsyncStorage.setItem(
                    'persistentAuth',
                    JSON.stringify({
                      authToken: authToken,
                      expiry: expiry,
                      user: user,
                    }),
                  );
                  //this.props.navigation.popToTop()
                  //Then navigate from here. Now in homescreen and beyond, we can check the global user state
                })
                .catch((res) => {
                  //Display login failed text and don't do anything?
                  //TODO: Inform user that login failed and prompt them again?
                  console.log('Login failed reason: ' + res);
                });
            }}>
            <LinearGradient
              colors={['#81c784', '#4caf50']}
              style={styles.signIn}>
              <Text style={styles.textSignIn}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUp}>
            <Pressable
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}>
              <Text style={styles.textSignUp}>Sign Up</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </View>
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
  signIn: {
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
  signUp: {
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
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attachUser: (user) => dispatch(setUser(user)),
    attachToken: (authToken) => dispatch(setToken(authToken)),
    attachExpiry: (expiry) => dispatch(setExpiry(expiry)),
    attachIsAuth: (isAuth) => dispatch(setIsAuth(isAuth))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
