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
import CONFIG from '../config';
import axios from 'axios';

const styles = StyleSheet.create({
  cityBackground: {
    height: 150,
    width: 350,
  },
});

export default function CityScreen({route, navigation}) {
  const token = useSelector((state) => state.userReducer.authToken);
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {cityId} = route.params;

  useEffect(() => {
    //gather content list.
    // TODO: have API return 2 lists, one for destinations
    // and the other for activity?
    async function onCityLoad() {
      await axios
        .get(`${CONFIG.API_URL}city/${cityId}/content`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(async (res) => {
          //expecting 2 lists
          setActivities(res.data.activities);
          setDestinations(res.data.destinations);
        })
        .catch((res) => {
          console.log('City failed cause: ' + res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    onCityLoad();
  }, []);

  /* this styling is completely placeholder and only for testing page logic */
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={activities}
            keyExtractor={(item, index) => item.id}
            extraData={{activities}}
            renderItem={({item}) => {
              return (
                <ImageBackground
                  source={{
                    uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                    headers: {Authorization: `Bearer ${token}`},
                  }}
                  style={styles.cityBackground}
                  resizeMode="cover">
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Content', {
                        contentId: item.id,
                        type: 'Activity',
                      });
                    }}>
                    <Text>{item.name}</Text>
                  </Pressable>
                </ImageBackground>
              );
            }}
          />
          <FlatList
            data={destinations}
            keyExtractor={(item, index) => item.id}
            extraData={{destinations}}
            renderItem={({item}) => {
              return (
                <ImageBackground
                  source={{
                    uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                    headers: {Authorization: `Bearer ${token}`},
                  }}
                  style={styles.cityBackground}
                  resizeMode="cover">
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Content', {
                        contentId: item.id,
                        type: 'Destination',
                      });
                    }}>
                    <Text>{item.name}</Text>
                  </Pressable>
                </ImageBackground>
              );
            }}
          />
        </>
      )}
    </View>
  );
}
