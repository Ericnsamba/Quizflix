import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as Theme from '../theme/Theme';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

const logout = () => {
  firebase.auth().signOut();
};

export function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{marginTop: 30}}>
              <FastImage
                resizeMode={'cover'}
                source={Theme.logoColor}
                style={styles.avatar}
              />
              <View style={[styles.section, {marginTop: 10}]}>
                <Text style={styles.caption}>By Eric & The Web</Text>
              </View>
            </View>

            <View style={styles.row} />
          </View>

          <View style={styles.drawerSection}>
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Versio 1.0.0"
        inactiveTintColor={Theme.primaryColors.blue}
      />
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              name="exit-outline"
              color={Theme.primaryColors.pink}
              size={size}
            />
          )}
          label="Sign Out"
          inactiveTintColor={Theme.primaryColors.pink}
          onPress={logout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  avatar: {
    height: 50,
    width: '60%',
    // backgroundColor: 'pink',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: Theme.primaryColors.blue,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    // marginBottom: 10,
    borderTopColor: Theme.primaryColors.pink,
    borderTopWidth: 1,
    justifyContent: 'center',
    backgroundColor: Theme.secondaryColors.pink,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
