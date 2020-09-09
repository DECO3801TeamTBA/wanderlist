/*
This is login screen
author: Thanh Tran Vo @thanhtrv
*/
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { connect } from 'react-redux';
import { setUser } from '../actions/user';
import axios from 'axios';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
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
            onChangeText={(text) => this.setState({ email: text })}
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
            axios.post('https://deco3801-tba.uqcloud.net/api/Authenticate/login', payload)
              .then(res => {
                const token = res.data.token;
                const expiry = res.data.token;
                const user = res.data.user;
                this.props.attachUser(user); //this isn't in the API yet, but I will add it later
                this.props.attachExpiry(expiry);
                this.props.attachToken(token);
                console.log("Success???");
                //Then navigate from here. Now in homescreen and beyond, we can check the global user state
              }).catch(res => {
                console.log(`Error login with code ${res.data.status} and message: \n
                  ${res.data.message}`);
              })
          }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.loginText}>Signup</Text>
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

// export default class LoginScreen extends React.Component {
//   state = {
//     email: '',
//     password: '',
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.logo}>WanderList</Text>
//         <View style={styles.inputView}>
//           <TextInput
//             style={styles.inputText}
//             placeholder="Email..."
//             placeholderTextColor="#003f5c"
//             onChangeText={(text) => this.setState({email: text})}
//           />
//         </View>
//         <View style={styles.inputView}>
//           <TextInput
//             secureTextEntry
//             style={styles.inputText}
//             placeholder="Password..."
//             placeholderTextColor="#003f5c"
//             onChangeText={(text) => this.setState({password: text})}
//           />
//         </View>
//         <TouchableOpacity>
//           <Text style={styles.forgot}>Forgot Password?</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.loginBtn}>
//           <Text style={styles.loginText}>LOGIN</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Text style={styles.loginText}>Signup</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#003f5c',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     fontWeight: 'bold',
//     fontSize: 50,
//     color: '#fb5b5a',
//     marginBottom: 40,
//   },
//   inputView: {
//     width: '80%',
//     backgroundColor: '#465881',
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   inputText: {
//     height: 50,
//     color: 'white',
//   },
//   forgot: {
//     color: 'white',
//     fontSize: 11,
//   },
//   loginBtn: {
//     width: '80%',
//     backgroundColor: '#fb5b5a',
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   loginText: {
//     color: 'white',
//   },
// });

const mapStatetoProps = (state) => {

  return {
    user: state.userReducer.user
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    attachUser: (user) => dispatch(setUser(user)),
    attachToken: (token) => dispatch(setToken(token)),
    attachExpiry: (expiry) => dispatch(setExpiry(expiry))
  }
}


export default connect(mapStatetoProps, mapDispatchtoProps)(LoginScreen);