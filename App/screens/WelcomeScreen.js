/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import firebase from 'react-native-firebase';
import * as Theme from '../theme/Theme';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      pressed: false,
      activeBorder: 0,
      isUser: false,
      isAnonymous: false,
    };
  }

  activateButton = buttonToActivate => {
    const newState = Object.assign(
      {},
      {
        isUser: false,
        isAnonymous: false,
      },
      {[buttonToActivate]: true},
    );

    this.setState(newState);

    if (newState.isUser) {
      this.setState({
        selectedOption: 'Create Account',
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    } else if (newState.isAnonymous) {
      this.setState({
        selectedOption: 'Login Anonymously',
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  };

  handleQAnonnymousLogin = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
  };

  handleSelected = () => {
    const {isUser, isAnonymous} = this.state;
    if (isUser) {
      return this.props.navigation.navigate('LoginScreen');
    } else if (isAnonymous) {
      this.handleQAnonnymousLogin();
    }
  };

  render() {
    const {isUser, isAnonymous} = this.state;
    // console.log('🚀 ~  isUser', isUser);
    // console.log('🚀 ~ isAnonymous', isAnonymous);
    const dynamicButtonText = this.state.selectedOption;
    const avatarAnonymous = require('../assets/images/avatars/avatarAnonymous.png');
    const avatarLogin = require('../assets/images/avatars/avatarLogin.png');

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar isVisible barStyle="dark-content" />
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo.png')}
            resizeMode={'contain'}
            style={{width: 220}}
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <View>
            <Text style={[styles.subTitle, Theme.title]}>
              Please select your login option
            </Text>
          </View>
          <View style={styles.pickContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.activateButton('isUser');
              }}
              style={{}}>
              <View style={styles.pickWrapper}>
                <View style={[styles.pickBox, isUser && styles.selectedBox]}>
                  <Image source={avatarLogin} style={styles.image} />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                this.activateButton('isAnonymous');
              }}
              style={{}}>
              <View style={styles.pickWrapper}>
                <View
                  style={[styles.pickBox, isAnonymous && styles.selectedBox]}>
                  <Image source={avatarAnonymous} style={styles.image} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {this.state.selectedOption === 'Login Anonymously' ? (
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={[styles.noticeBoard, Theme.paragraph]}>
                Please note: to avoid multi anonymous name on the leaderboard,
                we have decided to not add the user on the leaderboard.
              </Text>
            </View>
          ) : null}
        </View>
        {this.state.selectedOption !== '' ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={this.handleSelected}>
              <Text style={[styles.dynamicButtonText, Theme.title]}>
                {dynamicButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primaryColors.white,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: Theme.primaryColors.black,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  subTitle: {
    alignItems: 'center',
    width: 300,
    textAlign: 'center',
  },
  noticeBoard: {
    alignItems: 'center',
    width: width - 40,
    textAlign: 'center',
    color: Theme.primaryColors.black,
    opacity: 0.3,
    fontSize: 14,
  },
  pickContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 60,
    marginVertical: 40,
    // backgroundColor: Theme.secondaryColors.pink,
  },
  pickWrapper: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  pickBox: {
    backgroundColor: Theme.primaryColors.white,
    paddingHorizontal: 10,
    paddingTop: 20,
    borderRadius: 10,
    width: 140,
    height: 218,
    shadowColor: Theme.primaryColors.black,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  selectedBox: {
    borderColor: Theme.primaryColors.black,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardButton: {
    borderColor: Theme.primaryColors.black,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 42,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dynamicButtonText: {
    fontSize: 18,
  },
});

export default WelcomeScreen;
