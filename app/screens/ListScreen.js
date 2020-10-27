import React, { useState, useEffect } from 'react';
import {
  Button, 
  StyleSheet, 
  Text, 
  View, 
  FlatList,   
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import CONFIG from '../config';
import axios from 'axios';
// import RewardsScreen from '../side-screens/RewardsScreen';


export default function ListScreen({route, navigation}) {

    const { shortlistId } = route.params;
    const { listName } = route.params;
    const { collection } = route.params;

    const { token } = route.params;

    return (
      <View style={styles.viewStyle}>
          {/* <Text style={styles.bigBlackCentre}>{listName}</Text> */}
    
          
          <View style={{height: 50}}>
          <SearchBar
              showLoading={false}
              platform={Platform.OS}
              clearIcon={true}            
              round
              searchIcon={{ size: 20 }}
              placeholder="Search Your Lists"
          />
          </View>

          <View style={{height: 50}} >
          <Text style={styles.bigBlack}>
              Collection
          </Text>
          </View>

          <FlatList
            data={collection}
            renderItem={({ item }) => {
              return (
                // Single Comes here which will be repeatative for the FlatListItems
  
                <TouchableWithoutFeedback onPress={() => {
                  navigation.navigate('Content', {
                    contentId: item.id,
                    type: 'Activity',
                  });
                }}>
                  <View style={styles.card}>
                    <Image style={styles.cover} source={{
                          uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                          headers: {Authorization: `Bearer ${token}`},
                        }} ></Image>
                    <Text style={styles.titleStyle}>{item.name}</Text>
                    
                      
                    </View>
  
                </TouchableWithoutFeedback>
  
              )
            }}
            extraData={collection}
            keyExtractor={(item, index) => index.toString()}  
          />
      </View>
    );
}


const styles = StyleSheet.create({
    titleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      position: 'absolute',
      top: 80,
      left: 20,
      right: 0,
      bottom: 0,
    },
    viewStyle: {
      justifyContent: 'center',
      flex: 1,
      
      backgroundColor: 'white',
    },
    searchStyle: {
      justifyContent: 'center',
      flex: 2,
      backgroundColor: 'white',
      // marginTop: Platform.OS == 'ios' ? 30 : 0,
    },
    textStyle: {
      padding: 10,
    },
    
    categoryContainer: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      marginTop: 25,
      marginBottom: 10,
    },
    bigBlack: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 25,
      marginHorizontal: 20,
    },
    bigBlackCentre: {
      paddingTop: 20,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: 20,
      alignSelf: 'center',

    },
    cardInfo: {
      flex: 2,
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: '#fff',
    },
    cover: {
      borderTopLeftRadius:20,
      borderTopRightRadius: 20,
      position: 'relative',
      flex: 3,
      marginHorizontal: 0,
      marginBottom: 130,
    },
    card: {
      borderRadius: 20,
  
      height: 200,
      marginVertical: 15,
      marginHorizontal: 20,
      shadowColor: '#999',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      backgroundColor: '#fff',
    },
  });
