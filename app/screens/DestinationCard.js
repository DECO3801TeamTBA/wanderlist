import React, {Component} from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';


export default class DestinationCard extends Component {

	render() {
		return (
			<View style={{ paddingHorizontal: 15, paddingTop: 20}}> 
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('City', {
                      cityId: this.props.detail.cityId,
                    });
                  }}>
                    <Image style={{width:window.width, height:200, marginBottom: 10, borderRadius: 20}} source={
                        this.props.source
                        } />
                    <Text style={styles.cityName}>
                        
                        {this.props.location}
                        
                    </Text>
                    
                </TouchableOpacity>
            </View>        
		);
	}
}

const styles = StyleSheet.create({
	cityName: {
        position: 'absolute',
        top: 80,
        left: 150,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    }
});