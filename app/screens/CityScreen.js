import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
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
    <View>
      <YouTube
        apiKey="AIzaSyAJHQRNfY2BNIn7P6TN2Maza0GQVhIdYUc"
        videoId="eW7Twd85m2g" // The YouTube video ID
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}>
            <View>
              <FlatList
                data={activities}
                keyExtractor={(item, index) => item.id}
                extraData={{activities}}
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
                      <Text style={styles.caption}>{item.name}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.swipeItem}>
              <FlatList
                data={activities}
                keyExtractor={(item, index) => item.id}
                extraData={{activities}}
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
                      <Text style={styles.caption}>{item.name}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
          {/*<FlatList*/}
          {/*  data={activities}*/}
          {/*  keyExtractor={(item, index) => item.id}*/}
          {/*  extraData={{activities}}*/}
          {/*  renderItem={({item}) => {*/}
          {/*    return (*/}
          {/*      <ScrollView*/}
          {/*        horizontal={true}*/}
          {/*        showsHorizontalScrollIndicator={false}*/}
          {/*        style={styles.scrollView}>*/}
          {/*        <View>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*      </ScrollView>*/}
          {/*      // <ImageBackground*/}
          {/*      //   source={{*/}
          {/*      //     uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*      //     headers: {Authorization: `Bearer ${token}`},*/}
          {/*      //   }}*/}
          {/*      //   style={styles.cityBackground}*/}
          {/*      //   resizeMode="cover">*/}
          {/*      //   <Pressable*/}
          {/*      //     onPress={() => {*/}
          {/*      //       navigation.navigate('Content', {*/}
          {/*      //         contentId: item.id,*/}
          {/*      //         type: 'Activity',*/}
          {/*      //       });*/}
          {/*      //     }}>*/}
          {/*      //     <Text>{item.name}</Text>*/}
          {/*      //   </Pressable>*/}
          {/*      // </ImageBackground>*/}
          {/*    );*/}
          {/*  }}*/}
          {/*/>*/}
          <View>
            <Text style={styles.heading}>Destinations</Text>
          </View>
          {/*<FlatList*/}
          {/*  data={destinations}*/}
          {/*  keyExtractor={(item, index) => item.id}*/}
          {/*  extraData={{destinations}}*/}
          {/*  renderItem={({item}) => {*/}
          {/*    return (*/}
          {/*      <ScrollView*/}
          {/*        horizontal={true}*/}
          {/*        showsHorizontalScrollIndicator={false}*/}
          {/*        style={styles.scrollView}>*/}
          {/*        <View>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*        <View style={styles.swipeItem}>*/}
          {/*          <Image*/}
          {/*            style={styles.swipeImage}*/}
          {/*            source={{*/}
          {/*              uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*              headers: {Authorization: `Bearer ${token}`},*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </View>*/}
          {/*      </ScrollView>*/}
          {/*    );*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<FlatList*/}
          {/*  data={activities}*/}
          {/*  keyExtractor={(item, index) => item.id}*/}
          {/*  extraData={{activities}}*/}
          {/*  renderItem={({item}) => {*/}
          {/*    return (*/}
          {/*      <ImageBackground*/}
          {/*        source={{*/}
          {/*          uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*          headers: {Authorization: `Bearer ${token}`},*/}
          {/*        }}*/}
          {/*        style={styles.cityBackground}*/}
          {/*        resizeMode="cover">*/}
          {/*        <Pressable*/}
          {/*          onPress={() => {*/}
          {/*            navigation.navigate('Content', {*/}
          {/*              contentId: item.id,*/}
          {/*              type: 'Activity',*/}
          {/*            });*/}
          {/*          }}>*/}
          {/*          <Text>{item.name}</Text>*/}
          {/*        </Pressable>*/}
          {/*      </ImageBackground>*/}
          {/*    );*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<FlatList*/}
          {/*  data={destinations}*/}
          {/*  keyExtractor={(item, index) => item.id}*/}
          {/*  extraData={{activities}}*/}
          {/*  renderItem={({item}) => {*/}
          {/*    return (*/}
          {/*      <ImageBackground*/}
          {/*        source={{*/}
          {/*          uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,*/}
          {/*          headers: {Authorization: `Bearer ${token}`},*/}
          {/*        }}*/}
          {/*        style={styles.cityBackground}*/}
          {/*        resizeMode="cover">*/}
          {/*        <Pressable*/}
          {/*          onPress={() => {*/}
          {/*            navigation.navigate('Content', {*/}
          {/*              contentId: item.id,*/}
          {/*              type: 'Destination',*/}
          {/*            });*/}
          {/*          }}>*/}
          {/*          <Text>{item.name}</Text>*/}
          {/*        </Pressable>*/}
          {/*      </ImageBackground>*/}
          {/*    );*/}
          {/*  }}*/}
          {/*/>*/}
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
    marginTop: 5,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
