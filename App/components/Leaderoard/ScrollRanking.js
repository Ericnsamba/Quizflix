/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {LeaderBoardUsers} from './LeaderBoardUsers';
import * as Theme from '../../theme/Theme';
import LinearGradient from 'react-native-linear-gradient';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const ScrollRanking = ({DATA}) => {
  // console.log('🚀 ~ file: ScrollRanking.js =======> DATA', DATA);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const onScrollFade = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0)']}
        pointerEvents={'none'}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={
          (onScrollFade,
          Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: true,
          }))
        }
        keyExtractor={item => item.uid}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
          paddingTop: 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={[{transform: [{scale}]}, styles.animatedContainer]}>
              <LeaderBoardUsers
                image={item.image}
                rankNumber={index + 4}
                username={item.username}
                totalPoints={item.totalPoints}
                time={item.timeStamp}
                countryCodeId={item.countryCode ? item.countryCode : ''}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primaryColors.white,
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    width: width,
    height: 60,
    zIndex: 4,
  },
});

export default ScrollRanking;
