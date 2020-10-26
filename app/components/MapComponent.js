import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {userReducer} from '../reducers/userReducer';
import CONFIG from '../config';
import axios from 'axios';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

const window = Dimensions.get('window');

const StarReview = ({rate}) => {
  let i;
  const starComponents = [];
  const fullStar = Math.floor(rate);
  const noStar = Math.floor(5 - rate);
  const halfStar = 5 - fullStar - noStar;
  const percentage = ((rate / 5) * 100).toFixed(0) + '%';

  for (i = 0; i < fullStar; i++) {
    starComponents.push(
      <Image
        key={`full-${i}`}
        source={require('../../assets/fire_full.png')}
        resizeMode="cover"
        style={styles.star}
      />,
    );
  }

  for (i = 0; i < halfStar; i++) {
    starComponents.push(
      <Image
        key={`half-${i}`}
        source={require('../../assets/fire_half.png')}
        resizeMode="cover"
        style={styles.star}
      />,
    );
  }

  for (i = 0; i < noStar; i++) {
    starComponents.push(
      <Image
        key={`empty-${i}`}
        source={require('../../assets/fire_empty.png')}
        resizeMode="cover"
        style={styles.star}
      />,
    );
  }

  return (
    <View style={styles.starComponent}>
      {starComponents}
      <Text style={styles.starRating}>{percentage}</Text>
    </View>
  );
};

export default function HeatMap() {
  const token = useSelector((state) => state.userReducer.authToken);
  const user = useSelector((state) => state.userReducer.user);
  //const [contents, setContents] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function mapLoad() {
      // for the testing, i'm just going to load 3 specific
      // places in brisbane and have the map situated so that we start
      // by viewing those places
      await axios
        .get(`${CONFIG.API_URL}mapview`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then((res) => {
          const tmpList = res.data.map((c) => {
            return {
              name: c.name,
              description: c.description,
              latlng: {latitude: c.latitude, longitude: c.longitude},
              capacity: c.capacity,
              type: c.type,
            };
          });
          setMarkers(tmpList);
        })
        .catch((res) => {
          console.log('map thingy failed, cause:' + res);
        });
    }
    mapLoad();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -27.4698,
          longitude: 153.0251,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            image={require('../../assets/map_marker.png')}
            title={marker.name}
            description={marker.description}>
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text
                    style={
                      styles.name
                    }>{`Type: ${marker.type}, Capacity:`}</Text>
                  <StarReview rate={marker.capacity} />
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: window.height,
    width: window.width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 160,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    marginBottom: -15,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
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
  ratingText: {
    marginTop: 4,
  },
  starRatingContent: {
    marginLeft: 30,
  },
});
