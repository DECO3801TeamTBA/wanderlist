import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function ListScreen({ route, navigation}) {
    const { shortlistId } = route.params;
    const { otherParam } = route.params;
    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>ListScreen, be there soon</Text>
        <Text>shortlistId: {JSON.stringify(shortlistId)}</Text>

    </View>
    );
}
