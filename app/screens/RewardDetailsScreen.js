import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    Image,
    Dimensions,
    ImageBackground,
    useWindowDimensions
} from 'react-native';
import CONFIG from '../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-generator';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { TextShadow } from 'text-shadow-component';


const window = Dimensions.get('window');

export default function RewardsDetailsScreen({ route, navigation }) {
    const token = useSelector((state) => state.userReducer.authToken);
    const user = useSelector((state) => state.userReducer.user);
    const [isLoading, setIsLoading] = useState(true);
    const [reward, setReward] = useState(null);
    const { rewardId } = route.params
    useEffect(() => {
        async function onRewardDetailsLoad() {
            await axios.get(`${CONFIG.API_URL}reward/${rewardId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(async (res) => {
                    setReward(res.data)
                    //make QR code?

                })
                .catch((res) => {
                    console.log('reward failed cause: ' + res);
                })
                .finally(() => {
                    console.log(reward)
                    setIsLoading(false);
                });
        }
        onRewardDetailsLoad();
    }, []);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                    <View style={styles.mainContainer}>
                        <ImageBackground
                            source={{
                                uri: `${CONFIG.API_URL}resource/${reward.coverImageId}`,
                                headers: { Authorization: `Bearer ${token}` },
                            }}
                            resizeMode="cover"
                            style={styles.imageBGStyle}
                            imageStyle={styles.coverImage}
                        >
                            <TextShadow title={reward.name}
                                titleStyle={styles.nameStyle}
                                textShadow={'2px 1px 0 #000000'}
                            />
                        </ImageBackground>

                        <Text style={styles.valueStyle}>{reward.value}</Text>
                        {reward.description ? <View style={styles.descriptionHolder}>
                            <Text style={styles.descriptionStyle}>{reward.description}</Text>
                        </View> : <></>}

                        <View style={styles.qrStyle}>
                            <Text style={styles.qrTitle}>Scan QR Code</Text>
                            <QRCode
                                value={rewardId}
                                size={150}
                                bgColor='black'
                                fgColor='white'
                            />
                        </View>
                    </View>
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
    mainContainer: {
        flexDirection: 'column',
        backgroundColor:'#f4f4f4'
    },
    coverImageContainer: {

        marginHorizontal: 5,
    },
    coverImage: {
        margin:5,
        height: 300,
        borderRadius: 10
    },
    qrStyle: {
        flex:1,
        alignItems:'center',
        marginTop: 10
    },
    nameStyle: {
        paddingTop: 100,
        color: '#FFFFFF',
        fontSize: 28,
        alignSelf: 'center'
    },
    imageBGStyle: {

    },
    valueStyle: {
        marginTop: 175,
        fontWeight: '500',
        fontSize: 24,
        color: '#fe7662',
        alignSelf: 'flex-end',
        marginRight: 10
    },
    descriptionHolder: {
        margin:10,
        backgroundColor:'#FFFFFF',
        borderRadius:2
    },
    descriptionStyle:{
        padding:5,
        fontSize:16,
        fontWeight:'600'
    },
    qrTitle:{
        alignSelf:'flex-start',
        marginLeft:10,
        marginBottom:10,
        fontSize:20,
        fontWeight:'bold'
    }
});
