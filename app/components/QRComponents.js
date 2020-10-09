import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { userReducer } from '../reducers/userReducer'
import CONFIG from '../config';
import axios from 'axios';
import { ActivityIndicator, Modal } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';




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

export default function QRScannerModal() {

    const user = useSelector(state => state.userReducer.user)
    const token = useSelector(state => state.userReducer.token)
    const [modalShow, setModalShow] = useState(false)
    const onSuccess = e => {
        console.log("this worlking?")
        axios.post(`${CONFIG.API_URL}QR/${e}`,
            `${user.id}`,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                //scan succeeded, alert user?
                // show a message then
            })
            .catch((res) => {
                console.log('QR failed cause: ' + res)
                //scan failed, alert user as to reason
            })
            .finally(() => {
                //show message about whether or not QR was successful
                //then close modal
                setModalShow(false)
            })
    }
    return (
        <View>
            <Pressable
                onPress={() => { setModalShow(true) }}
                style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Scan QR Code</Text></Pressable>
            <Modal
                visible={modalShow}>
                <QRCodeScanner
                    onRead={onSuccess}
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
        </View>
    )
}