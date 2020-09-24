import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { SearchBar } from 'react-native-elements';


// export default function WanderScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Wander Screen</Text>
//       <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
//       <Button
//         title="Rewards Screen"
//         onPress={() => navigation.navigate('Rewards')}
//       />
//       <Button
//         title="Profile Screen"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// }

export default class WanderScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        platform='ios'
        placeholder="Search Destinations and Activities"
        barTintColor="red"
        tintColor="green"
        textColor="blue"
        textFieldBackgroundColor="pink"
        hideBackground={false}
        barStyle="default"
        searchBarStyle="default"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}




const styles = StyleSheet.create({

});