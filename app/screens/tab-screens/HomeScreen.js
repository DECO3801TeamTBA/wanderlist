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
import DestinationCard from '../DestinationCard';


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
      <Text style={styles.heading}>
        Discovery
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item, index) => item.cityId}
          extraData={{cities}}
          renderItem={({item}) => {
            return (
          
              <DestinationCard 
                    detail={item} 
                    location={item.name} 
                    source={{
                      uri: `${CONFIG.API_URL}resource/${item.coverImage.resourceId}`,
                      headers: {Authorization: `Bearer ${token}`}
                    }}
                    navigation = {navigation}
                  />
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
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 20,
  },
  
});
