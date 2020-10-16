import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Image,
  Button
} from 'react-native';
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
    
    axios.get(`${CONFIG.API_URL}User/${this.props.user.id}/Shortlist`,
      { headers: { "Authorization": `Bearer ${this.props.token}` } })
      .then((res) => {
        var lists = []

        //expecting a list of cities
        // const shortlists = res.data;
        lists = res.data.map((r) => {
          return {id:r.shortlistId, listName:r.listName, coverImage:"1"}
        })
        
          

        for (let index = 0; index < lists.length; index++) {
          axios.get(`${CONFIG.API_URL}Shortlist/${lists[index].id}/Content`,
          { headers: { "Authorization": `Bearer ${this.props.token}` } })
          .then((result) => {
            lists[index].coverImage = result.data[0].coverImage.resourceId

            this.setState({ shortlists: lists })


          })
          .catch((result) => {
            console.log(test)
          })
          // console.log(lists)
    
        }
        


        // console.log(this.state)



        
        
        // this.setState({ shortlists: lists })
        console.log(this.state.shortlists)

        // this.setState({ shortlists: res.data })
      })
      .catch((res) => {
        console.log('Wander failed cause: ' + res)
      })
      .finally(() => {
        
        // this.setState({ shortlists: lists })
        this.setState({ isLoading: false })
        // this.setState({ isLoading: false })
      })


    


      
  }

  

  

  render() {

    return (
      //ListView to show with textinput used as search bar

      <View style={styles.viewStyle}>
        {/* <View style={styles.searchStyle}>

        
        </View> */}
        <View style={{ height: 50 }}>
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

        <View style={{ height: 50 }} >

          <Text style={styles.bigBlack}>
            Your Lists
          </Text>


        </View>

        <FlatList
          data={this.state.shortlists}
          renderItem={({ item }) => {
            return (
              // Single Comes here which will be repeatative for the FlatListItems

              <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
                <View style={styles.card}>
                  <Image style={styles.cover} source={{
                        uri: `${CONFIG.API_URL}resource/${item.coverImage}`,
                        headers: {Authorization: `Bearer ${this.props.token}`},
                      }} ></Image>
                  <Text style={styles.titleStyle}>{item.listName}</Text>
                  
                    
                  </View>

              </TouchableWithoutFeedback>

            )
          }}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}

        />
        {/* <ul>
            { this.state.shortlists.map(shortlist => <li>{shortlist.title}</li>)}
          </ul> */}

      </View>
    );
  }

  actionOnRow(item) {
    console.log('Selected Item :', item.coverImage);
    this.props.navigation.navigate('List', {
      shortlistId: item.listName,
      otherParam: 'anything you want here',
    });
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
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    top: 80,
    left: 20,
    right: 0,
    bottom: 0,
  },
  card: {
    borderRadius: 20,

    height: 200,
    marginVertical: 30,
    marginHorizontal: 20,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
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
  cover: {
    borderTopLeftRadius:20,
    borderTopRightRadius: 20,
    position: 'relative',
    flex: 3,
    marginHorizontal: 0,
    marginBottom: 130,
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