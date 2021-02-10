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
import * as Animatable from 'react-native-animatable';
import * as Theme from '../theme/Theme';
import Animated from 'react-native-reanimated';

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

  handleSelected = () => {
    const {isUser, isAnonymous} = this.state;
    if (isUser) {
      return this.props.navigation.navigate('LoginScreen');
    } else if (isAnonymous) {
      // return this.handleQAnonnymousLogin;
    }
  };

  render() {
    const {isUser, isAnonymous} = this.state;
    console.log('🚀 ~  isUser', isUser);
    console.log('🚀 ~ isAnonymous', isAnonymous);
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
            <Text style={styles.subTitle}>Please select your login option</Text>
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
              <Text style={styles.noticeBoard}>
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
              <Text style={styles.dynamicButtonText}>{dynamicButtonText}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
const {height, width} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e1e1e1',
    // justifyContent: 'center'
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333333',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Theme.secondaryColors.pink,
    height: '20%',
  },
  subTitle: {
    alignItems: 'center',
    fontSize: 24,
    width: 200,
    textAlign: 'center',
  },
  noticeBoard: {
    alignItems: 'center',
    fontSize: 16,
    lineHeight: 20,
    width: width - 80,
    textAlign: 'center',
    color: Theme.primaryColors.gray,
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
    width: 160,
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
    // backgroundColor: 'red',
    borderColor: Theme.primaryColors.black,
    borderWidth: 1,
    // shadowColor: Theme.primaryColors.black,
    // shadowOffset: {
    //   width: 1,
    //   height: 10,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardButton: {
    // bottom: 20,
    // top: 40,
    // alignSelf: 'center',
    borderColor: Theme.primaryColors.black,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 34,
    paddingHorizontal: 58,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dynamicButtonText: {
    fontSize: 18,
  },
});

export default WelcomeScreen;
