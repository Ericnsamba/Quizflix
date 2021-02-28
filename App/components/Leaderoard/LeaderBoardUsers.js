/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {Flag} from 'react-native-svg-flagkit';
import UserAvatar from 'react-native-user-avatar';
import FastImage from 'react-native-fast-image';
import * as Theme from '../../theme/Theme';
const {width, height} = Dimensions.get('window');

const avatar = require('../../assets/images/avatars/avatarAnonymous.png');

export const LeaderBoardUsers = ({
  onPress = () => {},
  username,
  image,
  rankNumber,
  time,
  totalPoints,
  countryCodeId,
}) => (
  <View style={styles.container}>
    <View style={styles.rankNumber}>
      <Text style={styles.rankNumberText}>{rankNumber}</Text>
    </View>

    <View style={{width: 60}}>
      <View style={styles.ReactCountryFlag}>
        <Flag id={countryCodeId} width={28} height={28} />
      </View>
      <FastImage
        resizeMode={'cover'}
        source={
          image
            ? {
                uri: image,
                priority: FastImage.priority.high,
              }
            : avatar
        }
        style={{
          width: 50,
          height: 50,
          backgroundColor: Theme.secondaryColors.blue,
          borderRadius: 50 / 2,
        }}
      />
    </View>
    <Text style={[Theme.paragraph, styles.usernameText]}>{username}</Text>
    <Text style={styles.totalPoints}>{totalPoints ? totalPoints : 0} pts</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: Theme.primaryColors.blue2,
    height: 73,
    alignItems: 'center',
    borderRadius: 10,
  },
  rankNumber: {
    width: 60,
    height: 73,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rankNumberText: {
    fontSize: 24,
    textAlign: 'center',
    color: Theme.secondaryColors.white,
    fontFamily: Theme.fontFamily.bold,
  },
  ReactCountryFlag: {
    width: 26,
    height: 26,
    backgroundColor: Theme.primaryColors.green,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 2,
    top: -5,
    overflow: 'hidden',
    borderColor: Theme.primaryColors.blue2,
    borderWidth: 3,
  },
  usernameText: {
    fontSize: 16,
    textAlign: 'left',
    color: Theme.secondaryColors.white,
    left: 8,
    alignSelf: 'center',
    minWidth: 100,
    maxWidth: 140,
  },
  totalPoints: {
    fontSize: 18,
    textAlign: 'left',
    color: Theme.secondaryColors.white,
    alignSelf: 'center',
    right: 20,
    position: 'absolute',
    fontFamily: Theme.fontFamily.semiBold,
  },
});
