import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerScreen from './app/screens/DrawerScreen';
import {useDispatch} from 'react-redux';

import RootStackScreen from './app/screens/RootStackScreen';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {setExpiry, setToken, setUser} from './app/actions/user';
import SearchScreen from './app/screens/SearchScreen';
import CityScreen from './app/screens/CityScreen';
import ContentScreen from './app/screens/ContentScreen';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = React.useState(false);
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
            setIsAuth(false);
          } else {
            //set global state
            dispatch(setUser(auth.user));
            dispatch(setToken(auth.authToken));
            dispatch(setExpiry(auth.expiry));
            setIsAuth(true);
          }
        } else {
          setIsAuth(false);
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
      {isAuth === true ? (
        <Stack.Navigator>
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
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
}
