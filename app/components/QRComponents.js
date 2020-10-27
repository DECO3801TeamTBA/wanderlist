import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity, Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {userReducer} from '../reducers/userReducer';
import CONFIG from '../config';
import axios from 'axios';
import {Modal} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('window');

export default function QRScannerModal() {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
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
        //scan succeeded, alert user?
        // show a message then
      })
      .catch((res) => {
        console.log('QR failed cause: ' + res);
        //scan failed, alert user as to reason
      })
      .finally(() => {
        //show message about whether or not QR was successful
        //then close modal
        setModalShow(false);
      });
  };
  return (
    <View style={{
      marginTop:10,
      alignSelf:'center'
    }}>
      <Pressable
        onPress={() => {
          setModalShow(true);
        }}
        style={styles.buttonScan}>
        {/*<TouchableOpacity style={styles.qr}>*/}
        <Icon name="scan-circle-outline" size={32}></Icon>
        {/*</TouchableOpacity>*/}
      </Pressable>
      <View style={styles.modal}>
        <Modal visible={modalShow}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={<Text style={styles.centerText}>Scan QR</Text>}
            bottomContent={
              <Pressable
                style={styles.buttonCancel}
                onPress={() => {
                  setModalShow(false);
                }}>
                <LinearGradient
                  colors={['#81c784', '#4caf50']}
                  style={styles.qr}>
                  <Text style={styles.textQR}>Cancel</Text>
                </LinearGradient>
              </Pressable>
            }
          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 16,
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

/*
<LinearGradient colors={['#81c784', '#4caf50']} style={styles.qr}>
          <Text style={styles.textQR}>Scan QR Code</Text>
        </LinearGradient>

*/