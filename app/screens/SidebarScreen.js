import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Caption, Paragraph} from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';

export function SidebarScreen(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.userContent}>
            <View>
              <View>
                <Title style={styles.title}>Team TBA</Title>
                <Caption style={styles.caption}>@TBA</Caption>
              </View>
            </View>

            <View>
              <View>
                <Paragraph>123</Paragraph>
                <Caption>Trips</Caption>
              </View>
              <View>
                <Paragraph>456</Paragraph>
                <Caption>Coupons</Caption>
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
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
  title: {
    fontSize: 20,
    marginTop: 2,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 16,
    lineHeight: 16,
  },
});
