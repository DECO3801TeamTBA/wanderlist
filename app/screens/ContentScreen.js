import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import CONFIG from '../config';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import QRScanner from '../components/QRComponents';
import Icon from 'react-native-vector-icons/Ionicons';

/*
    Note from JP
    for now, I'm just testing image request + retrieval + display
    I'll be hooking in global state/actions, axios and image rendering
    the layout is NOT indicative of the final look!
    also it doesn't represent final screen logic, just some of the pieces
    needed for functionality
*/

const StarReview = ({rate}) => {
  let i;
  const starComponents = [];
  const fullStar = Math.floor(rate);
  const noStar = Math.floor(5 - rate);
  const halfStar = 5 - fullStar - noStar;

  for (i = 0; i < fullStar; i++) {
    starComponents.push(
      <Image
        key={`full-${i}`}
        source={require('../../assets/star_full.png')}
        resizeMode="cover"
        style={styles.star}
      />,
    );
  }

  for (i = 0; i < halfStar; i++) {
    starComponents.push(
      <Image
        key={`half-${i}`}
        source={require('../../assets/star_half.png')}
        resizeMode="cover"
        style={styles.star}
      />,
    );
  }

  for (i = 0; i < noStar; i++) {
    starComponents.push(
      <Image
        key={`empty-${i}`}
        source={require('../../assets/star_empty.png')}
        resizeMode="cover"
        style={styles.star}
      />,
    );
  }

  return (
    <View style={styles.starComponent}>
      {starComponents}
      <Text style={styles.starRating}>{rate}</Text>
    </View>
  );
};

export default function ContentScreen({route, navigation}) {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const token = useSelector((state) => state.userReducer.authToken);
  const {contentId, type} = route.params;
  //assume we're passing a contentID?
  //so nothing here is finalised
  //database/API isn't set up for this yet
  useEffect(() => {
    async function contentScreenOnLoad() {
      //assuming the following, the first axios call gets a list of ids
      //we then set urls for images??
      await axios
        .all([
          axios.get(`${CONFIG.API_URL}content/${contentId}`, {
            headers: {Authorization: `Bearer ${token}`},
          }),
          axios.get(`${CONFIG.API_URL}content/${contentId}/resource`, {
            headers: {Authorization: `Bearer ${token}`},
          }),
        ])
        .then(
          axios.spread((resContent, resImages) => {
            setImages(resImages.data);
            setContent(resContent.data);
          }),
        )
        .catch((res) => {
          console.log('why though? ' + res);
        })
        .finally(() => {
          setLoading(false);
        });
      //we'll just take the first element for testing purposes
    }
    contentScreenOnLoad();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.image}>
            <FlatList
              data={images}
              keyExtractor={(item, index) => item.resourceId}
              extraData={{images}}
              renderItem={({item}) => {
                return (
                  <ImageBackground
                    source={{
                      uri: `${CONFIG.API_URL}resource/${item.resourceId}`,
                      headers: {Authorization: `Bearer ${token}`},
                    }}
                    style={styles.image}
                    imageStyle={styles.imageStyle}>
                    <Text style={styles.name}>
                      {/*{type} name: {content.name}*/}
                      {content.name}
                    </Text>
                    <Text style={styles.description}>
                      {/*{type} description: {content.description}*/}
                      {content.description}
                    </Text>
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => {
                        navigation.navigate('Home');
                      }}>
                      <Icon name="chevron-back" color="#fff" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.collectButton}
                      onPress={() => {
                        // TODO: Add to collections
                      }}>
                      <Icon name="heart" color="#fff" size={24} />
                    </TouchableOpacity>
                  </ImageBackground>
                );
              }}
            />
          </View>
          <View style={styles.ratings}>
            <Text>
              {/*{type} ratings: {content.socialRating}, {content.economicRating},{' '}*/}
              {/*{content.environmentalRating}*/}
              <View style={styles.ratingRow}>
                <Text>Social Rating</Text>
                <View style={{marginLeft: 80}}>
                  <StarReview rate={content.socialRating} />
                </View>
              </View>
              <View style={styles.ratingRow}>
                <Text>Economic Rating</Text>
                <View style={{marginLeft: 55}}>
                  <StarReview rate={content.economicRating} />
                </View>
              </View>
              <View style={styles.ratingRow}>
                <Text>Environmental Rating</Text>
                <View style={{marginLeft: 27}}>
                  <StarReview rate={content.environmentalRating} />
                </View>
              </View>
            </Text>
          </View>

          <QRScanner />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 400,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  description: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#388e3c',
  },
  collectButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#f44336',
  },
  star: {
    width: 20,
    height: 20,
  },
  starComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRating: {
    marginLeft: 5,
    color: '#666666',
  },
  ratings: {
    borderRadius: 15,
    margin: 20,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 30,
    backgroundColor: '#fff',
  },
  ratingRow: {
    flexDirection: 'row',
  },
});
