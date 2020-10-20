import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import CONFIG from '../config';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function RewardsScreen({ navigation }) {
  const token = useSelector((state) => state.userReducer.authToken);
  const user = useSelector((state) => state.userReducer.user);
  const [isLoading, setIsLoading] = useState(true)
  const [rewards, setRewards] = useState([])

  useEffect(() => {
    async function onRewardLoad() {
      await axios.all([
        axios.get(`${CONFIG.API_URL}reward`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${CONFIG.API_URL}user/${user.id}/reward`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
        .then(
          axios.spread((resReward, resUserReward) => {
            //we must process each list and foreach item in reward that appears in 
            //userreward, give it different style? also put it at the top of the list
            let redeemed = resReward.data
              .filter(r => resUserReward.data.some(x => x.rewardId == r.rewardId))
              .map(r => {
                return {
                  name: r.name, description: r.description, value: r.value,
                  redeemed: true, expiryDate: r.expiryDate, id: r.rewardId
                }
              })
            let unredeemed = resReward.data
              .filter(r => !resUserReward.data.some(x => x.rewardId == r.rewardId))
              .map(r => {
                return {
                  name: r.name, description: r.description, value: r.value,
                  redeemed: false, expiryDate: r.expiryDate, id: r.rewardId
                }
              })
            console.log(redeemed)
            console.log(unredeemed)
            setRewards(redeemed.concat(unredeemed))
          })
        )
        .catch((res) => {
          console.log("reward failed cause: " + res)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    onRewardLoad()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? <ActivityIndicator /> : (
        <>
          <FlatList
            data={rewards}
            keyExtractor={(item, index) => item.id}
            extraData={{ rewards }}
            renderItem={({ item }) => {
              return (
                <View style={{ borderStyle:'solid' }}>
                  { item.redeemed ? (
                    <Text>{`${item.name} and ${item.value} YO BEEN HERE`}</Text>
                  ) : (
                      <Text>{`${item.name} and ${item.value} YO AINT BEEN HERE`}</Text>
                    )
                  }
                </View>
              );
            }}
          />
        </>
      )}

    </View>
  );
}
