import {useSelector} from 'react-redux';
import {userReducer} from '../../reducers/userReducer';
import CONFIG from '../../config';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ProfileScreen({navigation}) {
  const user = useSelector((state) => state.userReducer.user);
  const userCopy = {...user};
  const token = useSelector((state) => state.userReducer.authToken);
  const [userState, setUserState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function uploadImage(image) {
    const imageData = {
      type: image.type,
      name: image.fileName,
      uri: image.uri,
    };
    const formData = new FormData();
    console.log(imageData);
    formData.append('photo', imageData);
    axios
      .post(`${CONFIG.API_URL}user/${userCopy.id}/resource`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(true);
        loadProfile();
      })
      .catch((res) => {
        console.log('image upload failed: ' + res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function changeProfilePicture() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        //Alert error?
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Image picked, awaiting server upload');
        uploadImage(response);
      }
    });
  }
  async function loadProfile() {
    await axios
      .get(`${CONFIG.API_URL}User/${userCopy.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        setUserState(res.data);
      })
      .catch((res) => {
        console.log('profile failed cause:' + res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={{paddingHorizontal: 15, paddingTop: 20}}>
            <View style={styles.profileImage}>
              <ImageBackground
                source={{
                  uri: `${CONFIG.API_URL}resource/${userState.profilePic.resourceId}`,
                  headers: {Authorization: `Bearer ${token}`},
                }}
                style={styles.image}
                resizeMode="center">
                <Icon
                  name="create-sharp"
                  size={24}
                  color="#FFFFFF"
                  style={{
                    textShadowOffset: {width: 5, height: 2},
                    shadowColor: '#000000',
                    shadowOpacity: 0.7,
                    top: 75,
                    left: 75,
                  }}
                  onPress={changeProfilePicture}
                />
              </ImageBackground>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.text, {fontWeight: '300', fontSize: 30}]}>
                {userCopy.firstName}
              </Text>
              <Text style={[styles.text, {color: '#000000', fontSize: 15}]}>
                Enjoy you trip.
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Icon name="bar-chart" color="#4ba199" size={30} />
              <Text style={[styles.text, styles.subText]}>Ranking</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {borderColor: '#DFD8C8', borderLeftWidth: 1},
              ]}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Rewards');
                }}>
                <Icon name="pricetags" color="#ffd244" size={30} />
              </Pressable>
              <Text style={[styles.text, styles.subText]}>Rewards</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 24}]}>
                {userCopy.points}
              </Text>
              <Text style={[styles.text, styles.subText]}>Points</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {borderColor: '#DFD8C8', borderLeftWidth: 1},
              ]}>
              <Text style={[styles.text, {fontSize: 24}]}>6</Text>
              <Text style={[styles.text, styles.subText]}>Level</Text>
            </View>
          </View>

          <Text
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              fontSize: 28,
              color: '#000000',
            }}>
            Contact Us
          </Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#000000',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 100,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    // alignSelf: "center",
    // alignItems: "center",
    top: -100,
    left: 150,
    right: 0,
    bottom: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
    top: -80,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffff',
    borderRadius: 20,
    width: window.width,
    height: 100,
    marginHorizontal: 20,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
