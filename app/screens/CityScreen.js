import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Pressable, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux'
import CONFIG from '../config'
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const styles = StyleSheet.create({
  citybackground: {
    height: 150,
    width: 350,
  }
});

export default function CityScreen({ route, navigation }) {

  const token = useSelector(state => state.userReducer.authToken)
  const [activities, setActivities] = useState([])
  const [destinations, setDestinations] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { cityId } = route.params


  useEffect(() => {
    //gather content list.
    // TODO: have API return 2 lists, one for destinations
    // and the other for activity?
    async function onCityLoad() {
      await axios.get(`${CONFIG.API_URL}city/${cityId}/content`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(async (res) => {
          //expecting a list of cities
          setActivities(res.data)
        })
        .catch((res) => {
          console.log('City failed cause: ' + res)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    onCityLoad()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <FlatList
          data={activities}
          keyExtractor={(item, index) => item.contentId}
          extraData={{ activities }}
          renderItem={({ item }) => {
            return (
              <ImageBackground
                source={{
                  uri: `${CONFIG.API_URL}resource/${item.item.coverImageId}`,
                  headers: { "Authorization": `Bearer ${token}` }
                }}
                style={styles.citybackground}
                resizeMode='cover'
              >
                <Pressable
                  onPress={() => {
                    navigation.navigate('ContentScreen', {
                      cityId: item.contentId
                    })
                  }}
                >
                  <Text>{item.item.name}</Text>
                </Pressable>
              </ImageBackground>
            )
          }}
        />
      )}
    </View>
  );
}
