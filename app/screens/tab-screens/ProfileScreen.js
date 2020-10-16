// import React from 'react';
// import {Button, StyleSheet, Text, View} from 'react-native';

// export default function ProfileScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Profile Screen</Text>
//       <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
//       <Button
//         title="Wander Screen"
//         onPress={() => navigation.navigate('Wander')}
//       />
//       <Button
//         title="Rewards Screen"
//         onPress={() => navigation.navigate('Rewards')}
//       />
//     </View>
//   );
// }

import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";

export default function ProfileScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
                
                <View style={{ paddingHorizontal: 15, paddingTop: 20}}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../../assets/logo.png")} style={styles.image} resizeMode="center"></Image>
                        
                    </View>
                    <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 30 }]}>Thanh</Text>
                            <Text style={[styles.text, { color: "#000000", fontSize: 15 }]}>Enjoy you trip</Text>
                    </View>     
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, styles.subText]}>Ranking</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>ICON</Text>
                        <Text style={[styles.text, styles.subText]}>Rewards</Text>
                    </View>
                    
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>275</Text>
                        <Text style={[styles.text, styles.subText]}>Points</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>6</Text>
                        <Text style={[styles.text, styles.subText]}>Level</Text>
                    </View>
                    
                </View>

                
                <Text style={{ paddingHorizontal: 20, paddingTop: 20, fontSize: 28, color: '#000000'}}>Contact Us</Text>
                
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C0C0C0"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#000000"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 100,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        // alignSelf: "center",
        // alignItems: "center",
        top: -100,
        left: 150,
        right: 0,
        bottom: 0,
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
        top: -80,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffff",
        borderRadius: 20,
        width:window.width, height:100, marginHorizontal: 20,
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});
