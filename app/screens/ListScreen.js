import React from 'react';
import {Button, StyleSheet, Text, View, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function ListScreen({ route, navigation}) {
    const { shortlistId } = route.params;
    const { otherParam } = route.params;
    return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <Text>ListScreen, be there soon</Text>
    //     <Text>shortlistId: {JSON.stringify(shortlistId)}</Text>

    // </View>

    <View style={styles.viewStyle}>
        
        <View style={{height: 50}}>
        <SearchBar
            showLoading={false}
            platform={Platform.OS}
            clearIcon={true}            
            round
            searchIcon={{ size: 20 }}
            // onChangeText={text => this.SearchFilterFunction(text)}
            // onClear={text => this.SearchFilterFunction('')}
            placeholder="Search Your Lists"
            // value={this.state.search}
        />
        </View>

        <View style={{height: 50}} >

        <Text style={styles.bigBlack}>
            Collection
        </Text>
        

        </View>

        <FlatList
            
            // data={this.state.shortlists}
            // renderItem={({ item }) => (
            //     // Single Comes here which will be repeatative for the FlatListItems
                
            //     <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
            //     <View style={styles.card}>

            //     <Text style={styles.textStyle}>{item.listName}</Text>
            //     </View>
                
            //     </TouchableWithoutFeedback>

            // )}
            // extraData={this.state}
            // keyExtractor={(item, index) => index.toString()}

        />
    

    </View>
    );
}


const styles = StyleSheet.create({
    viewStyle: {
      justifyContent: 'center',
      flex: 1,
      
      backgroundColor: 'white',
      // marginTop: Platform.OS == 'ios' ? 30 : 0,
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
    card: {
      height: 200,
      marginVertical: 30,
      marginHorizontal: 20,
      flexDirection: 'row',
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      backgroundColor: '#fff',
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
      fontSize: 30,
      marginHorizontal: 20,
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
  });
