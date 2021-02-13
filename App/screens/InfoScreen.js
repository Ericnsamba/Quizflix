/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  watchPersonData,
  watchPointsData,
  watchUsersData,
  watchLeaderBoardData,
} from '../redux/AppRedux';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Theme from '../theme/Theme';
var Sound = require('react-native-sound');

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

class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnonymous: firebase.auth().currentUser._user.isAnonymous,
      user: {},
      Categories: 0,
      data: {},
    };
  }

  componentDidMount() {
   this.getDevInfo();
  }

  getDevInfo = () => {
    firebase
      .database()
      .ref('/information/developer')
      .on('value', snapshot => {
        const devInfo = snapshot.val();
        this.setState({user: devInfo});
      });
  };

  render() {

	  const userID = firebase.auth().currentUser.uid;
	  const {name, lastname, bio, profileImage} = this.state.user;
       const {
         username,
         email,
       } = this.props.personData;
    const avatar = require('../assets/images/profileAvatar.jpg');
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.drawerContent}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={Theme.primaryColors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerSection}>
          <View style={styles.userNameView}>
            <Text style={styles.userName}>{name} {'\n'}{lastname}</Text>
            <Text style={styles._email}>Developer | Designer</Text>
          </View>
          <View style={styles.avatarContainer}>
            <FastImage
              resizeMode={'cover'}
              source={
                   profileImage
                     ? {
                         uri: profileImage,
                         priority:
                           FastImage.priority.high,
                       }
                     : avatar
              }
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.quizzesPlayed}>
            <Text style={styles.quizzesPlayedTitle}>Hi {username ? username : 'There'}</Text>
            <Text style={[styles.paragrathText, {marginBottom: 20}]}>
              Thank you for downloading and playing QuizFlix.
            </Text>
            <Text style={[styles.paragrathText, {marginBottom: 20}]}>{bio}.</Text>
            <Text style={styles.paragrathText}>Connect with me via:</Text>
            <View>
              <View style={styles.socialHandles}>
                <Ionicons
                  name="logo-instagram"
                  size={24}
                  color={Theme.primaryColors.black}
                  style={styles.socialIcon}
                />
                <Ionicons
                  name="logo-twitter"
                  size={24}
                  color={Theme.primaryColors.black}
                  style={styles.socialIcon}
                />
                <Ionicons
                  name="logo-linkedin"
                  size={24}
                  color={Theme.primaryColors.black}
                  style={styles.socialIcon}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primaryColors.orange,
  },
  headerSection: {
    alignItems: 'center',
    flexDirection: 'row',
    width: Theme.sizes.container,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 40,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Theme.primaryColors.white,
  },
  profile: {
    alignItems: 'center',
  },
  avatarContainer: {
    borderColor: Theme.primaryColors.black,
    borderWidth: 2,
    borderRadius: 15,
    overflow: 'hidden',
  },
  avatar: {
    width: 98,
    height: 98,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  userNameView: {
    // marginVertical: 20,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: width - 60,
  },
  userName: {
    fontSize: 52,
    fontWeight: '800',
    marginBottom: 5,
    color: Theme.primaryColors.black,
    textTransform: 'capitalize',
  },
  _email: {
    fontSize: 14,
    color: Theme.primaryColors.black,
    fontWeight: Theme.fontWeight.medium,
  },
  paragrathText: {
    fontSize: 16,
    lineHeight: 24,
  },
  socialHandles: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: '40%',
    justifyContent: 'space-between',
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
    fontWeight: '300',
  },
  statTitle: {
    color: Theme.primaryColors.black,
    fontSize: 12,
    fontWeight: Theme.fontWeight.medium,
    marginTop: 4,
  },
  ScoresInCategory: {
    marginHorizontal: 10,
  },
  quizzesPlayed: {
    width: width - 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  quizzesPlayedTitle: {
    textAlign: 'left',
    fontSize: 20,
    color: Theme.primaryColors.orange,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  socialIcon: {
    paddingRight: 10,
  },
  drawerContent: {
    width: width,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoScreen);
