import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import CONFIG from '../../config';
import axios from 'axios';

const styles = StyleSheet.create({
  cityBackground: {
    height: 150,
    width: 350,
  },
});

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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
                  uri: `${CONFIG.API_URL}resource/${item.item.coverImageId}`,
                  headers: {Authorization: `Bearer ${token}`},
                }}
                style={styles.cityBackground}
                resizeMode="cover">
                <Pressable
                  onPress={() => {
                    navigation.navigate('CityScreen', {
                      cityId: item.cityId,
                    });
                  }}>
                  <Text>{item.item.name}</Text>
                </Pressable>
              </ImageBackground>
            );
          }}
        />
      )}
    </View>
  );
}
