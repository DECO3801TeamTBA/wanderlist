import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Pressable, Image, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'
import CONFIG from '../../config'
import axios from 'axios'

export default function HomeScreen({ navigation }) {

  const token = useSelector(state => state.userReducer.authToken)
  const [cities, setCities] = useState(0)


  useEffect(() => {
    async function homeScreenLogic() {
      //gather cities
      await axios.get(`${CONFIG.API_URL}city/${contentId}`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(async (res) => {
          //expecting a list of cities
          setCities(res.data)
        })
        .catch(async (res) => {
          console.log('reason: ' + res)
        })
    }
    homeScreenLogic()
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={cities}
        keyExtractor={(city) => city.cityId}
        renderItem={({ city, index, separators }) => {
          <ImageBackground
            source={{
              uri: `${CONFIG.API_URL}resource/${city.coverImageId}`,
              headers: { "Authorization": `Bearer ${token}` }
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate('CityScreen', {
                  cityId: city.item.cityId
                })
              }}>
              <Text>{city.item.name}</Text>
            </Pressable>
          </ImageBackground>
        }}
      />
    </View>
  );
}
