import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');

class Popup extends React.Component {
  render() {
    return (
      <View style={styles.popup}>
        <Text>New List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    borderRadius: 20,
    marginTop: window.height * 0.75,
    height: 200,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#fff',
  },
});

export default Popup;
