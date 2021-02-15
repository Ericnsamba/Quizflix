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
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  StatusBarIOS,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {LeaderBoardUsers} from './LeaderBoardUsers';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const ScrollRanking = ({DATA}) => {
  console.log('🚀 ~ file: ScrollRanking.js =======> DATA', DATA);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // console.log('======>', DATA);
  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
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
            <Animated.View style={[{transform: [{scale}]}, styles.container]}>
              <LeaderBoardUsers
                image={item.image}
                rankNumber={index + 4}
                username={item.username}
                totalPoints={item.totalPoints}
                time={item.timeStamp}
                countryCodeId={item.countryCode}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  img: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    backgroundColor: 'pink',
    marginRight: SPACING,
  },
});

export default ScrollRanking;
