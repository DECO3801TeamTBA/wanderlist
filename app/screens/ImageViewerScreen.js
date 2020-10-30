import React from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import CONFIG from '../config';

export default function ImageViewerScreen({route}) {
  const token = useSelector((state) => state.userReducer.authToken);
  const {imageId} = route.params;
  return (
    <View>
      <Image
        source={{
          uri: `${CONFIG.API_URL}resource/${imageId}`,
          headers: {Authorization: `Bearer ${token}`},
        }}
        style={{
          height: '100%',
        }}
        resizeMode="contain"
      />
    </View>
  );
}
