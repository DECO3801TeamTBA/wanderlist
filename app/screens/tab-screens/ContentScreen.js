import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux'
import CONFIG from '../../config'
import axios from 'axios'


/*
    Note from JP
    for now, I'm just testing image request + retrieval + display
    I'll be hooking in global state/actions, axios and image rendering
    the layout is NOT indicative of the final look!
    also it doesn't represent final screen logic, just some of the pieces
    needed for functionality
*/
export default function ContentScreen({ route, navigation }) {


    //assume we're passing a contentID?
    //so nothing here is finalised
    //database/API isn't set up for this yet
    useEffect(() => {
        async function contentScreenOnLoad() {
            const { contentId } = route.params
            var imageList = null; //
            const token = useSelector(state => state.userReducer.user.token)
            //assuming the following, the first axios call gets a list of ids
            //we then set urls for images??
            await axios.get(`${CONFIG.API_URL}content/${contentId}/resource`,
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(async (res) => {
                    imageList = res.data
                })
                .catch((res) => {
                    console.log("why though? " + res)
                });
            //we'll just take the first element for testing purposes
            await axios.get(`${CONFIG.API_URL}resource/${imageList[0]}`,
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(async (res) => {
                    //now we have to set image url or what? not sure yet!
                })
                .catch(async (res) => {
                    console.log("why though? " + res)
                })
        }
        contentScreenOnLoad()
    })


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Content Screen</Text>
            <Image></Image>
        </View>
    );
}
