import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function ProfileScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Wander Screen"
        onPress={() => navigation.navigate('Wander')}
      />
      <Button
        title="Rewards Screen"
        onPress={() => navigation.navigate('Rewards')}
      />
      {/*<Button title="Login" onPress={() => navigation.navigate('Login')} />*/}
    </View>
  );
}

// export default class ProfileScreen extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.logo}>Profile Page</Text>
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
// });
