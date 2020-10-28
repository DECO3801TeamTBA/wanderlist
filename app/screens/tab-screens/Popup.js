import React from 'react';
// import './style.css';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Platform,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import DialogInput from 'react-native-dialog-input';
const window = Dimensions.get('window');

class Popup extends React.Component {
  render() {
    return (
        <View style={styles.popup}>
                
                <Text >New List</Text>

        </View>
        
    );
  }
}

const styles = StyleSheet.create({
    popup: {
        borderRadius: 20,
        marginTop: window.height*0.75,
        //paddingHorizontal: 20,
        height: 200,
        // width: 350,
        //justifyContent: 'center',
        //alignItems: 'center',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: '#fff',
      },
})


export default Popup;

