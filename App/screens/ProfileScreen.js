import React from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  watchPersonData,
  watchPointsData,
  watchUsersData,
  watchLeaderBoardData,
} from '../redux/AppRedux';
import * as Theme from '../theme/Theme';
import {ScoresInCategory} from '../components/ScoresInCategory.js';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const mapStateToProps = state => {
  return {
    pointsData: state.pointsData,
    personData: state.personData,
    usersData: state.usersData,
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
    watchUsersData: () => {
      dispatch(watchUsersData());
    },
    watchLeaderBoardData: () => {
      dispatch(watchLeaderBoardData());
    },
  };
};

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnonymous: firebase.auth().currentUser._user.isAnonymous,
      user: {},
      Categories: 0,
    };
    this.props.watchPointsData();
    this.props.watchPersonData();
    this.props.watchLeaderBoardData();
  }

  renderScoresInCategory = pointsData => {
    const userPoints = this.props.pointsData;
    if (userPoints) {
      const scoreInfo = Object.keys(userPoints).map(key => {
        const obj = userPoints[key];
        return (
          <View key={key} style={styles.ScoresInCategory}>
            <ScoresInCategory
              image={obj.image}
              key={key}
              name={key}
              time={obj.timeStamp}
              points={obj.points}
            />
          </View>
        );
      });
      return scoreInfo;
    }
  };

  renderPoints = () => {
    let points = 0;
    const isAnonymous = firebase.auth().currentUser.isAnonymous;

    const quizPlayed = this.props.pointsData ? this.props.pointsData : 0;
    const userID = firebase.auth().currentUser.uid;
    if (isAnonymous && quizPlayed === undefined) {
      points = 0;
    } else if (userID && !isAnonymous && quizPlayed !== undefined) {
      const rank = this.props.leaderBoardData.find(
        userScore => userScore.uid === userID,
      );
      if (rank === undefined) {
        points = 0;
      } else {
        points = rank.totalPoints;
      }
    } else if (isAnonymous && Object.keys(quizPlayed).length > 0) {
      Object.values(quizPlayed).map(game => (points += game.points));
    }
    return points;
  };

  renderCategoryCount = () => {
    let Categories = 0;
    const currentUser = firebase.auth().currentUser;
    const quizPlayed = this.props.pointsData;
    if (currentUser && quizPlayed) {
      const obj = Object.keys(quizPlayed).length;
      Categories = obj;
    }
    return Categories;
  };

  render() {
    const userID = firebase.auth().currentUser.uid;
    const userRanking = this.props.leaderBoardData
      .map(rank => rank.uid)
      .indexOf(userID);
    const {isAnonymous} = this.state;
    const pointsData = this.props.pointsData;
    const {username, email, profileImage} = this.props.personData;
    const avatar = require('../assets/images/profileAvatar.jpg');
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.openDrawer}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={Theme.primaryColors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={styles.avatarContainer}>
            <FastImage
              resizeMode={'cover'}
              source={
                profileImage
                  ? {
                      uri: profileImage,
                      priority: FastImage.priority.high,
                    }
                  : avatar
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.userNameView}>
            <Text style={styles.userName}>{username}</Text>
            <Text style={styles._email}>{email}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{this.renderPoints()}</Text>
            <Text style={styles.statTitle}>Points</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{this.renderCategoryCount()}</Text>
            <Text style={styles.statTitle}>Categories</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{userRanking + 1}</Text>
            <Text style={styles.statTitle}>Rank</Text>
          </View>
        </View>

        <LinearGradient
          colors={[
            Theme.primaryColors.orange,
            Theme.primaryColors.orange2,
            Theme.primaryColors.white,
          ]}
          style={styles.innerContainer}>
          <View>
            <View style={styles.quizzesPlayed}>
              <Text style={[Theme.title, styles.quizzesPlayedTitle]}>Quizzes Played</Text>
            </View>

            <ScrollView
              contentOffset={{x: -20, y: 0}}
              bouncesZoom={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}>
              {this.renderScoresInCategory(pointsData)}
            </ScrollView>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Theme.primaryColors.blue,
  },
  profile: {
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 1,
  },
  avatarContainer: {
    borderColor: Theme.primaryColors.blue,
    borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: 116,
    height: 116,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  userNameView: {
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 60,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 5,
    color: Theme.primaryColors.blue,
  },
  _email: {
    fontSize: 14,
    color: '#939393',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    color: Theme.primaryColors.blue,
    fontSize: 18,
    fontFamily: Theme.fontFamily.medium,
  },
  statTitle: {
    fontFamily: Theme.fontFamily.medium,
    color: Theme.primaryColors.black,
    fontSize: 14,
    marginTop: 4,
  },
  ScoresInCategory: {
    marginHorizontal: 10,
  },
  quizzesPlayed: {
    width: width - 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  quizzesPlayedTitle: {
    textAlign: 'left',
    fontSize: 20,
    color: Theme.primaryColors.white,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  openDrawer: {
    // backgroundColor: Theme.secondaryColors.blue,
    width: width,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
