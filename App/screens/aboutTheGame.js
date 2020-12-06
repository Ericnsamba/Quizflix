import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Theme from '../theme/Theme';
import firebase from 'react-native-firebase';

const Anonymous = () => {
  const isAnonymous = firebase.auth().currentUser._user.isAnonymous;
  if (isAnonymous) {
    return (
      <View style={styles.isAnonymous}>
        <Text style={[styles.bodyText, {lineHeight: 22, marginBottom: 10}]}>
          Please note, as an Anonymous user your score will not be added to the
          leaderboard. This means you will not be ranked.
        </Text>
      </View>
    );
  }
};

const AboutInfo = ({params}) => {
  return (
    <View style={styles.container}>
      <View>
        <LottieView
          source={require('../assets/Animated/info.json')}
          autoPlay
          loop
          style={{width: 200, marginBottom: 40}}
        />
      </View>
      <Text style={styles.headerText}>Thank you for playing Quizflix!</Text>
      <Text style={styles.bodyText}>
        Quizflix tests your knowledge on some of the most popular TV series.
        Ideal for family fun and trivia nights with friends. Compete with others
        all around the world and get your name on top of the leaderboard!
      </Text>
      {Anonymous()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Theme.sizes.container,
    flex: 1,
    backgroundColor: Theme.primaryColors.white,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  isAnonymous: {
    backgroundColor: '#d8dae4',
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
  },
  bodyText: {
    fontSize: Theme.sizes.body + 2,
    lineHeight: Theme.sizes.body + 20,
    color: Theme.primaryColors.black,
    marginBottom: 30,
    fontWeight: Theme.fontWeight.medium,
  },
  headerText: {
    fontSize: Theme.sizes.body + 15,
    lineHeight: Theme.sizes.body + 25,
    marginBottom: 30,
    color: Theme.primaryColors.black,
    fontWeight: Theme.fontWeight.bold,
  },
});

export default AboutInfo;
