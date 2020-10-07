import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import CONFIG from '../config';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';

/*
    Note from JP
    for now, I'm just testing image request + retrieval + display
    I'll be hooking in global state/actions, axios and image rendering
    the layout is NOT indicative of the final look!
    also it doesn't represent final screen logic, just some of the pieces
    needed for functionality
*/

const styles = StyleSheet.create({
  test: {
    width: 100,
    height: 100,
  },
});

export default function ContentScreen({ route, navigation }) {
  const [images, setImages] = useState([])
  const [content, setContent] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const token = useSelector((state) => state.userReducer.authToken);
  const { contentId, type } = route.params;
  //assume we're passing a contentID?
  //so nothing here is finalised
  //database/API isn't set up for this yet
  useEffect(() => {
    async function contentScreenOnLoad() {
      //assuming the following, the first axios call gets a list of ids
      //we then set urls for images??
      await axios.all([
        axios.get(`${CONFIG.API_URL}content/${contentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${CONFIG.API_URL}content/${contentId}/resource`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ])
        .then(axios.spread((resContent, resImages) => {
          console.log(resImages)
          console.log(resContent)
          setImages(resImages.data)
          setContent(resContent.data)
        }))
        .catch((res) => {
          console.log('why though? ' + res);
        })
        .finally(() => {
          setLoading(false)
        })
      //we'll just take the first element for testing purposes
    }
    contentScreenOnLoad();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      { isLoading ? <ActivityIndicator /> : (
        <>
          <Text>{type} name: {content.name}</Text>
          <Text>{type} description: {content.description}</Text>
          <Text>{type} ratings: {content.socialRating}, {content.economicRating}, {content.environmentalRating}</Text>
          <Text>Image Gallery y'all</Text>
          <FlatList
            data={images}
            keyExtractor={(item, index) => item.resourceId}
            extraData={{ images }}
            renderItem={({ item }) => {
              return (
                <Image
                  source={{
                    uri: `${CONFIG.API_URL}resource/${item.resourceId}`,
                    headers: { Authorization: `Bearer ${token}` }
                  }}
                  style={styles.test}
                />
              );
            }}
          />
        </>
      )}
    </View>
  );
}
