import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import CONFIG from '../../config';
import axios from 'axios';

const window = Dimensions.get('window');

export default function HomeScreen({navigation}) {
  const token = useSelector((state) => state.userReducer.authToken);
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //gather cities
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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item, index) => item.cityId}
          extraData={{cities}}
          renderItem={({item}) => {
            return (
              <ImageBackground
                source={{
                  uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                  headers: {Authorization: `Bearer ${token}`}
                }}
                style={styles.cityBackground}>
                <Text
                  style={styles.cityText}
                  onPress={() => {
                    navigation.navigate('City', {
                      cityId: item.cityId,
                    });
                  }}>
                  {item.name}
                </Text>
              </ImageBackground>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cityBackground: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    resizeMode: 'stretch',
    height: window.height / 3,
    width: window.width,
  },
  cityText: {
    fontSize: 21,
    color: '#fff',
  },
});
