import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import CONFIG from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SwipeListView} from 'react-native-swipe-list-view';
import {LogBox} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const window = Dimensions.get('window');

export class WanderScreen extends React.Component {
  state = {
    shortlists: [],
    isLoading: true,
    isModalVisible: false,
    userIcon: '',
    newTextList: 'NaN',
    collection: [],
    key: '',
    showPopup: false,
    isDialogVisible: false,
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  // get data from server
  componentDidMount() {
    axios
      .get(`${CONFIG.API_URL}User/${this.props.user.id}/Shortlist`, {
        headers: {Authorization: `Bearer ${this.props.token}`},
      })
      .then((res) => {
        this.setState({shortlists: res.data});
      })
      .catch((res) => {
        console.log('Wander failed cause: ' + res);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  //update list method
  updateList = () => {
    //enable loading again
    this.setState({isLoading: true});
    axios
      .get(`${CONFIG.API_URL}User/${this.props.user.id}/Shortlist`, {
        headers: {Authorization: `Bearer ${this.props.token}`},
      })
      .then((res) => {
        this.setState({shortlists: res.data});
      })
      .catch((res) => {
        console.log('Wander failed cause: ' + res);
      })
      .finally(() => {
        //finish loading
        this.setState({isLoading: false});
      });
  };

  //adding list method
  addNewList = () => {
    // Ignore log notification by message:
    LogBox.ignoreLogs(['Warning: ...']);
    const newList = {
      listName: this.state.newTextList,
    };
    console.log('Add to list');

    // invalid input
    if (this.state.newTextList == 'NaN' || this.state.newTextList.length == 0) {
      alert('Invalid input');
      return;
    }

    //post list to server
    axios
      .post(`${CONFIG.API_URL}Shortlist/${this.props.user.id}`, newList, {
        headers: {Authorization: `Bearer ${this.props.token}`},
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log('Wander failed cause: ' + res);
      })
      .finally(() => {
        this.updateList();
        //close the popup
      });
    this.setState({showPopup: !this.state.showPopup});

    // created list pop up
    alert('Your List is created');
    // this.togglePopup.bind(this)

    // this.setState({isModalVisible: !this.state.isModalVisible});
  };

  //toggle popup
  toggleModal = () => {
    //console.log('this is a message');
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  //remove list
  removeList = (data, rowMap) => {
    //post list to server
    axios
      .delete(`${CONFIG.API_URL}Shortlist/${data.item.shortlistId}`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log('Wander failed cause: ' + res);
        alert('Error, pls contact the developers' + res);
      })
      .finally(() => {
        this.updateList();
      });
    this.closeRow(rowMap, data.item.shortlistId);
  };

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      console.log(rowMap[rowKey]);
    }
  };

  render() {
    return (
      //ListView to show with text input used as search bar
      <View style={styles.viewStyle}>
        {/*<View>*/}
        {/*  <SearchBar*/}
        {/*    showLoading={false}*/}
        {/*    platform={Platform.OS}*/}
        {/*    clearIcon={true}*/}
        {/*    round*/}
        {/*    searchIcon={{size: 20}}*/}
        {/*    placeholder="Search Your Lists"*/}
        {/*  />*/}
        {/*</View>*/}

        <View style={styles.bigBlackContainer}>
          <Text style={styles.bigBlack}>Your Lists</Text>
          <View style={styles.plus}>
            <Icon.Button
              name="plus-circle"
              backgroundColor="#fff"
              color="#4ba199"
              size={32}
              onPress={this.togglePopup.bind(this)}
            />
          </View>
        </View>
        {/* <Modal
              onBackdropPress={this.toggleModal}
              isVisible={this.state.isModalVisible}>
              <View style={styles.popup}>
                <Text style={styles.bigBlackPopUp}>New List</Text>

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
                  size={10}>
                  Create
                </Icon.Button>

                <Icon.Button
                      style={{fontStyle: "bold", }}
                      onPress={this.toggleModal}
                      backgroundColor="#fff"
                      color="#008000"
                      size={30}
                    >Cancel</Icon.Button>
              </View>

            </Modal> */}

        <SwipeListView
          disableLeftSwipe
          closeOnScroll
          closeOnRowPress
          closeOnRowOpen
          data={this.state.shortlists}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
                <View style={styles.card}>
                  {item.coverImage ? (
                    <>
                      <Image
                        style={styles.cover}
                        source={{
                          uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                          headers: {
                            Authorization: `Bearer ${this.props.token}`,
                          },
                        }}
                      />
                      {/*TODO: some meaningful name here*/}
                      <Text style={styles.titleStyle}>Some name here</Text>
                    </>
                  ) : (
                    <>
                      <Image
                        style={styles.cover}
                        source={require('../../../assets/default_cover.png')}
                      />
                      {/*TODO: some meaningful name here*/}
                      <Text style={styles.titleStyle}>Some name here</Text>
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          extraData={this.state}
          keyExtractor={(item, index) => item.shortlistId.toString()}
          // keyExtractor={(item, index) => {
          //   return rowData.id.toString();
          // }}
          renderHiddenItem={(data, rowMap) => (
            <TouchableOpacity
              style={styles.rowBack}
              onPress={() => this.removeList(data, rowMap)}>
              <Text style={styles.styleRemove}>Delete</Text>
            </TouchableOpacity>
          )}
          leftOpenValue={75}
          // previewRowKey={'0'}
          previewOpenDelay={3000}
        />

        {this.state.showPopup ? (
          <View style={styles.popup}>
            <Text style={styles.bigBlackPopUp}>New List</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Enter name of new list!"
              placeholderTextColor="#4d4d4d"
              onChangeText={(text) => this.setState({newTextList: text})}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonCreate}
                onPress={this.addNewList}>
                <LinearGradient
                  colors={['#4caf50', '#388e3c']}
                  style={styles.buttonCreate}>
                  <Text style={styles.textButtonCreate}>Create</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={this.togglePopup.bind(this)}>
                <LinearGradient
                  colors={['#f06292', '#e91e63']}
                  style={styles.buttonCancel}>
                  <Text style={styles.textButtonCancel}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  actionOnRow(item) {
    console.log('Selected Item :', item.listName);
    axios
      .get(`${CONFIG.API_URL}ShortlistContent/${item.shortlistId}`, {
        headers: {Authorization: `Bearer ${this.props.token}`},
      })
      .then((res) => {
        // this.setState({collection: res.data});
        this.props.navigation.navigate('List', {
          listName: item.listName,
          shortlistId: item.shortlistId,
          token: this.props.token,
          collection: res.data,
        });
      })
      .catch((res) => {
        console.log('Collection failed cause: ' + res);
      })
      .finally(() => {
        // setLoading(false);
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
    top: 150,
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#fff',
  },
  popup: {
    position: 'absolute',
    borderRadius: 20,
    marginTop: window.height * 0.75,
    marginLeft: window.width * 0.13,
    //paddingHorizontal: 20,
    height: 200,
    width: window.width * 0.75,
    // width: 350,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: 15,
  },
  bigBlackPopUp: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputText: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 5,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonCreate: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    marginRight: 10,
  },
  buttonCancel: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  textButtonCreate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  textButtonCancel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    flex: 3,
    marginHorizontal: 0,
    marginBottom: 60,
  },
  rowBack: {
    borderRadius: 20,
    height: 200,
    width: 350,
    marginVertical: 15,
    marginHorizontal: 20,
    elevation: 5,
    backgroundColor: '#FF0000',
  },
  styleRemove: {
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    top: 80,
    left: 20,
    right: 0,
    bottom: 0,
  },
  bigBlackContainer: {
    flexDirection: 'row',
    width: window.width,
  },
  plus: {
    position: 'absolute',
    marginTop: 10,
    right: 10,
  },
});

// get user auth
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.authToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attachUser: (user) => dispatch(setUser(user)),
    attachToken: (authToken) => dispatch(setToken(authToken)),
    attachExpiry: (expiry) => dispatch(setExpiry(expiry)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WanderScreen);
