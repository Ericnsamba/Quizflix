/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';
import * as Theme from '../theme/Theme';
import {connect} from 'react-redux';
import {
  watchPersonData,
  watchPointsData,
  watchLeaderBoardData,
} from '../redux/AppRedux';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

const mapStateToProps = state => {
  return {
    pointsData: state.pointsData,
    personData: state.personData,
    leaderBoardData: state.leaderBoardData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchPersonData: () => {
      dispatch(watchPersonData());
    },
    watchPointsData: () => {
      dispatch(watchPointsData());
    },
    watchLeaderBoardData: () => {
      dispatch(watchLeaderBoardData());
    },
  };
};

class ScoreHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      profileImage: '',
      username: '',
      points: 0,
    };

    this.props.watchPointsData();
    this.props.watchPersonData();
    this.props.watchLeaderBoardData();
  }
  renderPoints = data => {
    let points = 0;
    const quizPlayed = this.props.pointsData || undefined;
    const userID = firebase.auth().currentUser.uid;
    if (firebase.auth().currentUser.isAnonymous && quizPlayed === undefined) {
      points = 0;
    } else if (
      userID &&
      Object.keys(data).length > 0 &&
      !firebase.auth().currentUser.isAnonymous
    ) {
      const rank = data.find(userScore => userScore.uid === userID);
      if (rank === undefined) {
        points =  0;
      } else {
        points = rank.totalPoints;
        console.log(
          '=======>',
          data.find(userScore => userScore.uid === userID),
        );
      }
      // console.log("points ====>", points);
    } else if (
      firebase.auth().currentUser.isAnonymous &&
      Object.keys(quizPlayed).length > 0
    ) {
      Object.values(quizPlayed).map(game => (points += game.points));
    }
    return points;
  };

  componentDidMount = () => {};

  render() {
    const br = '\n';
    const {username, profileImage} = this.props.personData;
    const avatar = require('../assets/images/profileAvatar.jpg');
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{width: 160, flexDirection: 'row'}}>
            <FastImage
              source={
                profileImage
                  ? {
                      uri: profileImage,
                      priority: FastImage.priority.high,
                    }
                  : avatar
              }
              style={styles.Image}
            />
            <View style={{marginLeft: 10}}>
              <Text style={[styles.userName, Theme.paragraph]}>Hi!</Text>
              <Text
                style={[
                  Theme.paragraph,
                  styles.userName,
                  {fontWeight: Theme.fontWeight.bold},
                ]}>
                {`${username ? username : 'anonymous'}`}
              </Text>
            </View>
          </View>
          <View style={styles.rewardsAndIcon}>
            <Icon
              name="trophy"
              color={Theme.primaryColors.blue}
              size={32}
              style={styles.Icon}
            />
            <Text style={[Theme.title, styles.reward]}>
              {this.renderPoints(this.props.leaderBoardData)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 40,
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    top: 0,
    width: width,
    marginBottom: 24,
    backgroundColor: 'tomato',
    justifyContent: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.primaryColors.white,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 30,
    borderRadius: 20,
  },
  Image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderColor: Theme.primaryColors.blue,
    borderWidth: 1,
    resizeMode: 'cover',
  },
  userName: {
    // fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    color: Theme.primaryColors.black,
  },
  rewardsAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.secondaryColors.blue,
    padding: 10,
    borderRadius: 10,
	justifyContent: 'center',
  },
  reward: {
    textAlign: 'center',
    color: Theme.primaryColors.black,
    fontSize: Theme.sizes.title ,
    marginLeft: 10,
  },
  Icon: {
    bottom: 0,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreHeader);
