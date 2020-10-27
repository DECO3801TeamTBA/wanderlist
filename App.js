import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerScreen from './app/screens/DrawerScreen';
import {useDispatch, useSelector} from 'react-redux';

import RootStackScreen from './app/screens/RootStackScreen';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {setExpiry, setToken, setUser, setIsAuth} from './app/actions/user';
import SearchScreen from './app/screens/SearchScreen';
import CityScreen from './app/screens/CityScreen';
import ContentScreen from './app/screens/ContentScreen';
import SplashScreen from './app/screens/SplashScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import ImageViewerScreen from './app/screens/ImageViewerScreen';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['RCTBridge']);

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  //const [isAuth, setIsAuth] = React.useState(false);
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  useEffect(() => {
    async function checkAsyncStorage() {
      try {
        const value = await AsyncStorage.getItem('persistentAuth');
        if (value !== null) {
          const auth = JSON.parse(value);
          //have to compare them as ISO strings
          const result = auth.expiry.toString() < new Date().toISOString();
          //check if expired
          if (result) {
            //setIsAuth(false);
            dispatch(setIsAuth(false));
          } else {
            //set global state
            dispatch(setUser(auth.user));
            dispatch(setToken(auth.authToken));
            dispatch(setExpiry(auth.expiry));
            //setIsAuth(true);
            dispatch(setIsAuth(true));
          }
        } else {
          //setIsAuth(false);
          dispatch(setIsAuth(false));
        }
      } catch (e) {
        // error reading value
        console.log('Why though? ' + e);
      }
    }
    checkAsyncStorage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuth === true ? (
          <>
            <Stack.Screen
              name="Home"
              component={DrawerScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="City" component={CityScreen} />
            <Stack.Screen
              name="Content"
              component={ContentScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ImageViewer"
              component={ImageViewerScreen}
              options={{title: 'Picture'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
