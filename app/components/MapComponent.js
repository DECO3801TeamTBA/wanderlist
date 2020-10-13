import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { userReducer } from '../reducers/userReducer'
import CONFIG from '../config';
import axios from 'axios';
import { ActivityIndicator, Modal } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


export default function HeatMap() {

    const styles = StyleSheet.create({
        container: {
          ...StyleSheet.absoluteFillObject,
          height: 400,
          width: 400,
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        },
       });
       

    return (
        <View style={styles.container}>
        <MapView
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        />
        </View>
    )
}

