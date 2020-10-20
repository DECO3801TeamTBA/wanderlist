import React from 'react';
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
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import CONFIG from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

export class WanderScreen extends React.Component {

  state = {
    shortlists: [],
    isLoading: true,
    isModalVisible: false,
    userIcon: "",
    newTextList: "123",
  }
  
// get data from server 
  componentDidMount() {
    
    axios.get(`${CONFIG.API_URL}User/${this.props.user.id}/Shortlist`,
      { headers: { "Authorization": `Bearer ${this.props.token}` } })
      .then((res) => {
       
        this.setState({ shortlists: res.data })

      })
      .catch((res) => {
        console.log('Wander failed cause: ' + res)
      })
      .finally(() => {
        
        this.setState({ isLoading: false })
      })

      Icon.getImageSource('user', 20, 'red').then(source =>
        this.setState({ userIcon: "../../../assets/logo.png" })
      );
      
  }

  componentDidUpdate() {

  }

  addNewList = () => {


    axios.post(`${CONFIG.API_URL}Shortlist/${this.props.user.id}`, { listName: this.state.newTextList },
      { headers: { "Authorization": `Bearer ${this.props.token}` }})
      .then((res) => {
       
        console.log(res.data);

      })
      .catch((res) => {
        console.log('Wander failed cause: ' + res)
      })
      .finally(() => {
        
        this.setState({ isLoading: false })
      })



    alert("Your List is created");
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  };

  

  render() {
    return (
      //ListView to show with text input used as search bar
      <View style={styles.viewStyle}>
       
        <View style={{ height: 50 }}>
          <SearchBar
            showLoading={false}
            platform={Platform.OS}
            clearIcon={true}
            round
            searchIcon={{ size: 20 }}
            placeholder="Search Your Lists"
          />
        </View>

        <View style={{ height: 50 }} >

          <Text style={styles.bigBlack}>
            Your Lists
            
            <View style={{alignSelf: "center"}}>
               <Icon.Button
                name="plus"
                backgroundColor="#fff"
                color="#000000"
                onPress={this.toggleModal}
              >
              </Icon.Button>       
            </View>
            <Modal isVisible={this.state.isModalVisible}    >

                <View style={{flex: 1, alignSelf: "center",}}>
                  <View style={styles.card}>
                    <Text style={styles.bigBlack}>New List</Text>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Enter name of new list!"
                      placeholderTextColor="#4d4d4d"
                      onChangeText={(text) => this.setState({newTextList: text})}
                    />
                    <Icon.Button  
                      onPress={this.addNewList}
                      backgroundColor="#fff"
                      color="#008000" 
                    >Create</Icon.Button>
                    <Icon.Button 
                      style={{fontStyle: "bold", }} 
                      onPress={this.toggleModal}
                      backgroundColor="#fff"
                      color="#008000"
                      size={30}
                    >Cancel</Icon.Button>

                  </View>
                  
                </View>
            </Modal>
            
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
                        uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
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

      </View>
    );
  }

  actionOnRow(item) {
    console.log('Selected Item :', item.coverImage);
    this.props.navigation.navigate('List', {
      listName: item.listName,
      shortlistId: item.shortlistId,
      token: this.props.token,
      otherParam: 'anything you want here',
    });
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  searchStyle: {
    justifyContent: 'center',
    flex: 2,
    backgroundColor: 'white',
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
    marginVertical: 15,
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
  inputText: {
    marginTop: Platform.OS === 'ios' ? 0 : -10,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,

  },
});



// get user auth
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