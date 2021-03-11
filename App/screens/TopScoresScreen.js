/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import * as firebase from 'react-native-firebase';
import {Flag} from 'react-native-svg-flagkit';
import * as Theme from '../theme/Theme';
import {LeaderBoardUsers} from '../components/Leaderoard/LeaderBoardUsers';

const avatar = require('../assets/images/profileAvatar.jpg');

//Redux
import {connect} from 'react-redux';
import {
  watchPersonData,
  watchPointsData,
  watchLeaderBoardData,
} from '../redux/AppRedux';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScrollRanking from '../components/Leaderoard/ScrollRanking';
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
    watchLeaderBoardData: () => {
      console.log('watchLeaderBoardData', watchLeaderBoardData);
      dispatch(watchLeaderBoardData());
    },
    watchPersonData: () => {
      dispatch(watchPersonData());
    },
    watchPointsData: () => {
      dispatch(watchPointsData());
    },
  };
};
class TopScoresScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      visible: false,
      userData: [],
      top3Users: [],
      remainingUsers: [],
    };
    this.props.watchLeaderBoardData();
    this.props.watchPersonData();
  }

  componentDidMount() {
    this.top3function();
    // const db = firebase.firestore();
    // retrieve a collection
    // db.collection('users')
    //   .get()
    //   .then(querySnapshot => {
    //     const documents = querySnapshot.docs.map(doc => doc.data());
    //     this.setState({FirestoreUserInfo: documents});
    //   });
  }

  getData = () => {
    const {data} = this.state;
    let userRankings;
    firebase
      .database()
      .ref('/scores')
      .on('value', snapshot => {
        const firebaseData = snapshot.val();
        userRankings = firebaseData;
        this.setState({data: firebaseData});
      });

    console.log(' -> getData -> userRankings', userRankings);
    return userRankings;
  };

  top3function = () => {
    const {leaderBoardData} = this.props;
    const top3 = [];
    const RankingData = [...leaderBoardData];
    for (let i = 0; i < 3; i++) {
      //immutable - you can't mutate the data
      top3.push(RankingData.shift());
    }
    this.setState({
      top3Users: top3,
      remainingUsers: RankingData,
    });
  };

  renderTop3 = () => {
    const top3 = this.state.top3Users;
    return (
      <View
        style={{
          width: width,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
        }}>
        <View style={styles.topUserInfoView}>
          <Text style={styles.rankingNumber}>2</Text>
          <View style={{}}>
            <View style={styles.ReactCountryFlag}>
              <Flag
                id={top3[1].countryCode ? top3[1].countryCode : ''}
                width={30}
                height={28}
              />
            </View>
            <UserAvatar
              size={65}
              name={top3[1].username ? top3[1].username : 'name'}
              src={top3[1].photoURL ? top3[1].photoURL : null}
              bgColors={[Theme.primaryColors.blue]}
              borderRadius={40}
              style={{
                width: 70,
                height: 70,
              }}
            />
          </View>
          <View>
            <Text style={styles.top3UsersName}>
              {top3[1].username ? top3[1].username : 'User'}
            </Text>
            <Text style={styles.top3UsersPoint}>
              {top3[1].totalPoints ? top3[1].totalPoints : '0'}
              pts
            </Text>
          </View>
        </View>

        <View style={styles.topUserInfoView}>
          <Text style={styles.rankingNumber}>1</Text>
          <View>
            <View style={[styles.ReactCountryFlag, {width: 30, height: 30}]}>
              <Flag
                id={top3[0].countryCode ? top3[0].countryCode : ''}
                width={34}
                height={34}
              />
            </View>
            <UserAvatar
              size={95}
              name={top3[0].username}
              src={top3[0].photoURL ? top3[0].photoURL : null}
              bgColors={[Theme.primaryColors.blue]}
              borderRadius={50}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <View>
            <Text style={styles.top3UsersName}>{top3[0].username}</Text>
            <Text style={styles.top3UsersPoint}>{top3[0].totalPoints} pts</Text>
          </View>
        </View>

        <View style={styles.topUserInfoView}>
          <Text style={styles.rankingNumber}>3</Text>
          <View>
            <View style={styles.ReactCountryFlag}>
              <Flag
                id={top3[2].countryCode ? top3[2].countryCode : ''}
                width={30}
                height={28}
              />
            </View>
            <UserAvatar
              size={65}
              name={top3[2].username}
              src={top3[2].photoURL ? top3[2].photoURL : null}
              bgColors={[Theme.primaryColors.blue]}
              borderRadius={50}
              style={{
                width: 70,
                height: 70,
              }}
            />
          </View>
          <View>
            <Text style={styles.top3UsersName}>{top3[2].username}</Text>
            <Text style={styles.top3UsersPoint}>{top3[2].totalPoints} pts</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Theme.secondaryColors.blue,
        }}>
        <StatusBar isVisible barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.renderTop3Container}>
            {this.state.top3Users.length === 3 && this.renderTop3()}
          </View>
          <View style={styles.scrollView}>
            <ScrollRanking
              DATA={[this.state.remainingUsers, this.props.personData]}
              style={{marginBottom: 60,}}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.secondaryColors.blue,
  },
  header: {
    backgroundColor: Theme.primaryColors.white,
    shadowColor: Theme.primaryColors.black,
    paddingTop: 30,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  renderTop3Container: {
    justifyContent: 'center',
    width: width,
    height: 200,
  },
  rankingNumber: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    color: Theme.primaryColors.blue,
    width: '100%',
    marginBottom: 5,
  },
  topUserInfoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  top3UsersName: {
    fontSize: 14,
    textAlign: 'center',
    color: Theme.primaryColors.black,
    alignSelf: 'center',
    width: 100,
    paddingTop: 5,
  },
  top3UsersPoint: {
    fontSize: 16,
    textAlign: 'center',
    color: Theme.primaryColors.black,
    alignSelf: 'center',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Theme.primaryColors.white,
    height: height,
    zIndex: 2,
    bottom: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    position: 'relative',
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
    borderColor: Theme.secondaryColors.blue,
    borderWidth: 2,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopScoresScreen);
