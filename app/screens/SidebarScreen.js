import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

export function SidebarScreen(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.userContent}>
            <View style={styles.profile}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.profileAvatar}
              />
              <View style={styles.profileContent}>
                <Title style={styles.profileTitle}>Team TBA</Title>
                <Caption style={styles.profileCaption}>@TBA</Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section>
          <DrawerItem
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            label="Settings"
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
          />
          <DrawerItem
            label="Support"
            onPress={() => {
              props.navigation.navigate('Support');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="log-in" color={color} size={size} />
          )}
          label="Log In"
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContent: {
    paddingLeft: 18,
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20,
  },
  profileAvatar: {
    width: 100,
    height: 100,
  },
  profileContent: {
    marginLeft: 5,
    flexDirection: 'column',
  },
  profileTitle: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
  },
  profileCaption: {
    fontSize: 16,
    lineHeight: 16,
  },
  bottomSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
