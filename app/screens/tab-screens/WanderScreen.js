import React from 'react';
import {Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Button} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import CONFIG from '../../config';


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

export class WanderScreen extends React.Component {

  state = {
    shortlists: [],
    isLoading: true
  }
    
  componentDidMount() {
    axios.get(`${CONFIG.API_URL}ApplicationUser/${this.props.user.id}/Shortlist`,
        { headers: { "Authorization": `Bearer ${this.props.token}` } })
        .then((res) => {
          //expecting a list of cities
          // const shortlists = res.data;

          this.setState({shortlists:res.data, isLoading: false})
          console.log(res.data)
        })
        .catch((res) => {
          console.log('Wander failed cause: ' + res)
        })
        // .finally(() => {
        //   this.setLoading(false)
        // })
  }

  render() {

    return (
      //ListView to show with textinput used as search bar
      
      <View style={styles.viewStyle}>
        {/* <View style={styles.searchStyle}>

        
        </View> */}
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
            Your Lists
          </Text>
          

        </View>

          <FlatList
            // data={this.state.dataSource}
            // // ItemSeparatorComponent={this.ListViewItemSeparator}
            // //Item Separator View
            // renderItem={({ item }) => (
            //   // Single Comes here which will be repeatative for the FlatListItems
            //   <View style={styles.card}>

            //     <Text style={styles.textStyle}>{item.title}</Text>
            //   </View>

            // )}
            // enableEmptySections={true}
            // style={{ marginTop: 10 }}
            // keyExtractor={(item, index) => index.toString()}
            data={this.state.shortlists}
            renderItem={({ item }) => (
                // Single Comes here which will be repeatative for the FlatListItems
                <View style={styles.card}>
  
                  <Text style={styles.textStyle}>{item.listName}</Text>
                </View>
  
              )}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}

          />
          {/* <ul>
            { this.state.shortlists.map(shortlist => <li>{shortlist.title}</li>)}
          </ul> */}

      </View>
    );
  }
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


const mapStateToProps = (state) => {

  return {
    user: state.userReducer.user,
    token: state.userReducer.authToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attachUser: (user) => dispatch(setUser(user)),
    attachToken: (authToken) => dispatch(setToken(authToken)),
    attachExpiry: (expiry) => dispatch(setExpiry(expiry))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WanderScreen);