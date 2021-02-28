/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import * as Theme from '../theme/Theme';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      secureTextEntry: true,
      email: '',
      photo: '',
      profileImage: '',
      password: '',
      errorMessage: null,
      isLoading: false,
      userInfo: {},
      check_textInputChange: false,
    };
  }

  handleSignUp = () => {
    const {username, email, password} = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const fbRootRef = firebase.firestore();
        const userID = firebase.auth().currentUser.uid;
        console.log('fbRootRef', fbRootRef);
        const userRef = fbRootRef.collection('users').doc(userID);
        userRef.set({
          email,
          username,
        });
      })
      .then(() => {
        if (firebase.auth().currentUser.email) {
          this.props.navigation.navigate('Root');
        } else {
          console.log(':( did not login');
        }
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Theme.primaryColors.blue}
          barStyle="light-content"
        />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.text_header}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Animatable.View animation="fadeInUpBig" style={{top: 0}}>
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            <View
              style={[
                styles.action,
                {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
              ]}>
              <Icon
                name="person-outline"
                color={Theme.primaryColors.black}
                size={20}
              />
              <TextInput
                placeholder="Your Username"
                placeholderTextColor={Theme.primaryColors.black}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={username => this.setState({username})}
                value={this.state.username}
              />
              {this.state.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather
                    name="check-circle"
                    color={Theme.primaryColors.blue}
                    size={20}
                  />
                </Animatable.View>
              ) : null}
            </View>

            <View style={[styles.action, {borderRadius: 0, borderTopWidth: 0}]}>
              <Icon
                name="mail-outline"
                color={Theme.primaryColors.black}
                size={20}
              />
              <TextInput
                placeholder="Your Email"
                placeholderTextColor={Theme.secondaryColors.black}
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            <View
              style={[
                styles.action,
                {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderTopWidth: 0,
                },
              ]}>
              <Icon
                name="lock-closed-outline"
                color={Theme.primaryColors.black}
                size={20}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={Theme.secondaryColors.black}
                onChangeText={password =>
                  this.setState({
                    password,
                  })
                }
                value={this.state.password}
                secureTextEntry={this.state.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={this.updateSecureTextEntry}>
                {this.state.secureTextEntry ? (
                  <Feather
                    name="eye-off"
                    color={Theme.primaryColors.black}
                    size={20}
                  />
                ) : (
                  <Feather
                    name="eye"
                    color={Theme.secondaryColors.black}
                    size={20}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={[styles.SignInButtonSection]}>
              <View style={styles.termsConditions}>
                <Text style={styles.signInButtonText}>Sign In</Text>
              </View>

              <TouchableOpacity
                style={[styles.signInButton]}
                onPress={() => this.handleSignUp()}>
                <Icon
                  name="ios-arrow-forward"
                  size={26}
                  color={Theme.primaryColors.blue}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primaryColors.blue,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 5 : 5,
    backgroundColor: Theme.primaryColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: Theme.primaryColors.black,
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    borderWidth: 1,
    paddingBottom: 5,
    borderColor: Theme.secondaryColors.black,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: Theme.primaryColors.black,
    height: 40,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    justifyContent: 'space-between',
  },
  color_textPrivate: {
    color: Theme.primaryColors.white,
  },
  signInWith: {
    borderColor: Theme.primaryColors.white,
    borderWidth: 1,
    marginTop: 15,
  },
  buttonText: {
    color: Theme.primaryColors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorMessage: {
    color: Theme.primaryColors.pink,
    marginBottom: 10,
  },
  signInButton: {
    width: 60,
    height: 60,
    borderColor: Theme.secondaryColors.blue,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  SignInButtonSection: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  signInButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: Theme.primaryColors.black,
    fontWeight: Theme.fontWeight.bold,
  },
  termsConditions: {
    justifyContent: 'center',
  },
});
