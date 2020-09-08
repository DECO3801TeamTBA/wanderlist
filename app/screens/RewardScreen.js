/*
Reward Screen
*/

import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function RewardScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Reward Screen</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button
        title="WanderList Screen"
        onPress={() => navigation.navigate('WanderList')}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

// export default class RewardScreen extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.logo}>Reward Page</Text>
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
