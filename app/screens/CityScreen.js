import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import CONFIG from '../config';
import axios from 'axios';
import YouTube from 'react-native-youtube';

const window = Dimensions.get('window');

export default function CityScreen({route, navigation}) {
  const token = useSelector((state) => state.userReducer.authToken);
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [video, setVideo] = useState('');
  const [isLoading, setLoading] = useState(true);
  const {cityId} = route.params;

  useEffect(() => {
    // gather content list.
    // TODO: have API return 2 lists, one for destinations
    // and the other for activity
    async function onCityLoad() {
      await axios.all([
          axios.get(`${CONFIG.API_URL}city/${cityId}`, {
            headers: {Authorization: `Bearer ${token}`},
          }),
          axios.get(`${CONFIG.API_URL}city/${cityId}/content`, {
            headers: {Authorization: `Bearer ${token}`},
          }),
        ])
        .then(
          // expecting 2 lists
          // setActivities(res.data.activities);
          // setDestinations(res.data.destinations);
          axios.spread((resCity, resContent) => {
            setActivities(resContent.data.activities);
            setDestinations(resContent.data.destinations);
            setVideo(resCity.data.video);
            navigation.setOptions({title:resCity.data.name})
          })
        )
        .catch((res) => {
          console.log('City failed cause: ' + res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    onCityLoad();
  }, []);

  return (
    <View>
      <YouTube
        apiKey="AIzaSyAJHQRNfY2BNIn7P6TN2Maza0GQVhIdYUc"
        videoId={video} // The YouTube video ID
        play={false}
        style={styles.videoPlayer}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View>
            <Text style={styles.heading}>Activities</Text>
          </View>
          <SafeAreaView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <FlatList
              style={styles.scrollView}
              data={activities}
              keyExtractor={(item, index) => item.id}
              extraData={{activities}}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <View style={styles.swipeItem}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Content', {
                          contentId: item.id,
                          type: 'Activity',
                        });
                      }}>
                      <Image
                        style={styles.swipeImage}
                        source={{
                          uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                          headers: {Authorization: `Bearer ${token}`},
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.caption}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
          </SafeAreaView>
          <View>
            <Text style={styles.heading}>Destinations</Text>
          </View>
          <SafeAreaView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <FlatList
              style={styles.scrollView}
              data={destinations}
              keyExtractor={(item, index) => item.id}
              extraData={{destinations}}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <View style={styles.swipeItem}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Content', {
                          contentId: item.id,
                          type: 'Destination',
                        });
                      }}>
                      <Image
                        style={styles.swipeImage}
                        source={{
                          uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                          headers: {Authorization: `Bearer ${token}`},
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.caption}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
          </SafeAreaView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  videoPlayer: {
    alignSelf: 'stretch',
    height: 300,
  },
  cityBackground: {
    height: 150,
    width: window.width,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollView: {
    paddingLeft: 5,
  },
  swipeItem: {
    marginLeft: 10,
  },
  swipeImage: {
    height: 100,
    width: 120,
    borderRadius: 5,
  },
  caption: {
    width: 115,
    marginTop: 5,
    marginLeft: 2,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
