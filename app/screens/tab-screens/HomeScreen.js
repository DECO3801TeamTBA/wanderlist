import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import CONFIG from '../../config';
import axios from 'axios';
import DestinationCard from '../DestinationCard';
import {Modal, Portal} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({navigation}) {
  const token = useSelector((state) => state.userReducer.authToken);
  const user = useSelector((state) => state.userReducer.user);
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const onSuccess = (e) => {
    console.log(e.data);
    axios
      .post(
        `${CONFIG.API_URL}QR/`,
        {qrCode: e.data, userId: user.id},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then((res) => {
        // scan succeeded, alert user
        // show a message then
        alert('QR scan successful.');
      })
      .catch((res) => {
        console.log('QR failed cause: ' + res);
        //scan failed, alert user as to reason
        console.log(res.response.data);
        if (res.response.data.message) {
          let msg = res.response.data.message;
          if (msg.includes('has already been to this location')) {
            alert('You have already scanned at this location.');
          } else if (msg.includes('has expired')) {
            alert('That code is expired.');
          } else {
            alert('Error scanning code.');
          }
        } else {
          alert('Error scanning code.');
        }
      })
      .finally(() => {
        //show message about whether or not QR was successful
        //then close modal
        setModalShow(false);
      });
  };
  useEffect(() => {
    // gather cities
    async function onHomeLoad() {
      await axios
        .get(`${CONFIG.API_URL}city`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(async (res) => {
          //expecting a list of cities
          setCities(res.data);
        })
        .catch((res) => {
          console.log('Home failed cause: ' + res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    onHomeLoad();
  }, []);

  return (
    <Portal.Host>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.heading}>Discovery</Text>
          <Pressable
            onPress={() => {
              setModalShow(true);
            }}
            style={styles.buttonScan}>
            <Icon name="scan-circle-outline" size={32} />
          </Pressable>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={cities}
            keyExtractor={(item, index) => item.cityId}
            extraData={{cities}}
            renderItem={({item}) => {
              return (
                <DestinationCard
                  detail={item}
                  location={item.name}
                  source={{
                    uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                    headers: {Authorization: `Bearer ${token}`},
                  }}
                  navigation={navigation}
                />
              );
            }}
          />
        )}
        <Portal>
          <Modal
            visible={modalShow}
            onDismiss={() => {
              setModalShow(false);
            }}
            dismissable={true}>
            <View
              style={{
                marginTop: -200,
              }}>
              <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={<Text style={styles.centerText}>Scan QR</Text>}
              />
            </View>
          </Modal>
        </Portal>
      </View>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonScan: {
    marginTop: 30,
    marginRight: 15,
    alignSelf: 'center',
  },
  buttonCancel: {
    marginTop: -100,
    padding: 16,
  },
  qr: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textQR: {
    padding: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modal: {
    flex: 2,
    marginTop: -450,
  },
});
