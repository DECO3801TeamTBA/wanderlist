import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import CONFIG from '../../config';
import axios from 'axios';
import {useSelector} from 'react-redux';

export default function RewardsScreen({navigation}) {
  const token = useSelector((state) => state.userReducer.authToken);
  const user = useSelector((state) => state.userReducer.user);
  const [isLoading, setIsLoading] = useState(true);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    async function onRewardLoad() {
      await axios
        .all([
          axios.get(`${CONFIG.API_URL}reward`, {
            headers: {Authorization: `Bearer ${token}`},
          }),
          axios.get(`${CONFIG.API_URL}user/${user.id}/reward`, {
            headers: {Authorization: `Bearer ${token}`},
          }),
        ])
        .then(
          axios.spread((resReward, resUserReward) => {
            //we must process each list and foreach item in reward that appears in
            //userreward, give it different style? also put it at the top of the list
            let redeemed = resReward.data
              .filter((r) =>
                resUserReward.data.some((x) => x.rewardId == r.rewardId),
              )
              .map((r) => {
                return {
                  name: r.name,
                  description: r.description,
                  value: r.value,
                  redeemed: true,
                  expiryDate: r.expiryDate,
                  id: r.rewardId,
                };
              });
            let unredeemed = resReward.data
              .filter(
                (r) =>
                  !resUserReward.data.some((x) => x.rewardId == r.rewardId),
              )
              .map((r) => {
                return {
                  name: r.name,
                  description: r.description,
                  value: r.value,
                  redeemed: false,
                  expiryDate: r.expiryDate,
                  id: r.rewardId,
                };
              });
            console.log(redeemed);
            console.log(unredeemed);
            setRewards(redeemed.concat(unredeemed));
          }),
        )
        .catch((res) => {
          console.log('reward failed cause: ' + res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    onRewardLoad();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={rewards}
            keyExtractor={(item, index) => item.id}
            extraData={{rewards}}
            renderItem={({item}) => {
              return (
                <View style={styles.container}>
                  <View style={styles.cardsWrapper}>
                    <View style={styles.card}>
                      <View style={styles.cardImgWrapper}>
                        <Image
                          source={require('../../../assets/media1.jpg')}
                          resizeMode="cover"
                          style={styles.cardImg}
                        />
                      </View>
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>
                          {item.name} {item.value}
                        </Text>
                        <Text style={styles.cardDetails}>{item.description}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
}

// <View style={{borderStyle: 'solid'}}>
//   {item.redeemed ? (
//     <Text>{`${item.name} and ${item.value} YO BEEN HERE`}</Text>
//   ) : (
//     <Text>{`${item.name} and ${item.value} YO AINT BEEN HERE`}</Text>
//   )}
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 150,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
