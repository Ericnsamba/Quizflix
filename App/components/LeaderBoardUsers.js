/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import LinearGradient from 'react-native-linear-gradient';
import * as Theme from '../theme/Theme';
import {Themed} from 'react-navigation';
const {width, height} = Dimensions.get('window');

export const LeaderBoardUsers = ({
  onPress = () => {},
  username,
  image,
  rankNumber,
  time,
  totalPoints,
}) => (
  <View
    colors={[Theme.secondaryColors.pink, '#FF93AD']}
    style={{
      width: '100%',
      flexGrow: 1,
      flexDirection: 'row',
      marginVertical: 5,
      backgroundColor: Theme.primaryColors.blue2,
      height: 73,
      alignItems: 'center',
      borderRadius: 10,
    }}>
    <View
      style={{
        width: 60,
        height: 73,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '800',
          textAlign: 'center',
          color: Theme.secondaryColors.white,
        }}>
        {rankNumber}
      </Text>
    </View>

    <View style={{width: 60}}>
      <UserAvatar
        size={50}
        name={username}
        src={image ? image : null}
        bgColors={[
          Theme.primaryColors.pink,
          // Theme.secondaryColors.blue,
          // Theme.primaryColors.blue2,
          Theme.primaryColors.blue,
        ]}
        borderRadius={40}
        style={{
          width: 50,
          height: 50,
        }}
      />
    </View>
    <View
      style={{
        paddingTop: 5,
        flexGrow: 1,
        marginLeft: 20,
        minWidth: 100,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          color: Theme.secondaryColors.white,
          width: 100,
          left: -20,
        }}>
        {username}
      </Text>
    </View>
    <View
      style={{
        paddingTop: 5,
        flexGrow: 1,
        marginLeft: 20,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'left',
          color: Theme.secondaryColors.white,
        }}>
        {totalPoints ? totalPoints : 0} pts
      </Text>
    </View>
  </View>
  // </TouchableOpacity>
);

const styles = StyleSheet.create({});
