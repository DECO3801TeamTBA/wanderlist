import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { userReducer } from '../reducers/userReducer'
import CONFIG from '../config';
import axios from 'axios';
import { ActivityIndicator, Modal } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


/**
 * Not sure how useful this component will be, but the bottom should be more useful (or at least copyable)
 * @param {*} param0 
 */
export function QRButton({ }) {


    return (

        <Pressable />
    )
}

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });
  

/**
 * Modal i.e foreground view on top of screen view that only appears when trying to scan qrs!
 * @param {*} param0 
 */
export function QRScannerModal({ }) {

    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    onSuccess = e => {
        axios.post(`${CONFIG.API_URL}QR/${e}`,
            `${user.id}`,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                //expecting a list of cities
                // const shortlists = res.data;

                this.setState({ shortlists: res.data })
                console.log(res.data)
            })
            .catch((res) => {
                console.log('Wander failed cause: ' + res)
            })
            .finally(() => {
                this.setState({ isLoading: false })
            })
    }
    return (
        <Modal>
        <QRCodeScanner
            onRead={this.onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
                <Text style={styles.centerText}>
                    Uhh just testing folks
          </Text>
            }
            bottomContent={
                <Pressable style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>Verify visit</Text>
                </Pressable>
            }
        />
        </Modal>
    )
}