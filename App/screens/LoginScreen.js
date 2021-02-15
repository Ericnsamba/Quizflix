/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import * as Theme from '../theme/Theme';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';
import * as RNLocalize from 'react-native-localize';
// import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {SocialLoginButton} from '../components/UI/SocialLoginButton';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      email: '',
      profileImage: '',
      password: '',
      errorMessage: '',
      isLoading: false,
      userInfo: {},
      countryCode: RNLocalize.getCountry(),
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '289483445762-rtovvpn68uoskd7lk01aq4idpiu5l1tn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }
  createUser = async () => {
    const currentUser = await this.state.userInfo;
    if (currentUser) {
      const {username, email, photo, profileImage, countryCode} = this.state;
      const password = this.state.userInfo.id;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, username, photo)
        .then(user => {
          const fbRootRef = firebase.firestore();
          const userID = firebase.auth().currentUser.uid;
          const userRef = fbRootRef.collection('users').doc(userID);
          userRef.set({
            email,
            profileImage,
            username,
            countryCode,
          });
        })
        .then(() => {
          if (firebase.auth().currentUser.email) {
            this.props.navigation.navigate('Root');
          } else {
            console.log(':( did not login');
          }
        })
        .catch(error => {
          console.log('catch error, line 27', error.message);
          this.setState({errorMessage: error.message});
        });
    }
  };

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo});
      // creating credentials
      const credentials = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );

      if (userInfo) {
        const {name, email, photo, countryCode} = this.state.userInfo.user;
        return firebase
          .auth()
          .signInWithCredential(credentials)
          .then(user => {
            const fbRootRef = firebase.firestore();
            const userID = firebase.auth().currentUser.uid;
            const userRef = fbRootRef.collection('users').doc(userID);
            userRef.set({
              email: email,
              username: name,
              profileImage: photo.replace('s120', 's300', true),
              countryCode,
            });
          });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string:
          'id, name, first_name, middle_name, last_name, picture.type(large), short_name, email',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      {
        token,
        parameters: PROFILE_REQUEST_PARAMS,
      },
      (error, result) => {
        if (error) {
          console.log('LoginScreen -> error', error);
        }
        if (result) {
          this.setState({
            userInfo: result,
          });
          console.log('LoginScreen ---> result', this.state.userInfo);
          if (result) {
            const {name, email, picture, countryCode} = this.state.userInfo;
            return firebase
              .auth()
              .signInWithCredential(token)
              .then(user => {
                const fbRootRef = firebase.firestore();
                const userID = firebase.auth().currentUser.uid;
                const userRef = fbRootRef.collection('users').doc(userID);
                userRef.set({
                  email: email,
                  username: name,
                  profileImage: picture.data.url,
                  countryCode,
                });
              });
          }
        } else {
        }
      },
    );
    if (this.state.userInfo) {
      this.createUser();
    }
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginWithFacebook = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          console.log('Whoops!', 'You cancelled the sign in.');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken,
            );
            this.getInfoFromToken(credential);
            console.log(credential);
          });
        }
      },
      error => {
        console.log('Sign in error', error);
      },
    );
  };

  logoutWithFacebook = () => {
    LoginManager.logOut();
    this.setState({userInfo: {}});
  };

  onFacebookButtonPress = async () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
            console.log(
              'LoginScreen -> onFacebookButtonPress -> accessToken',
              accessToken,
            );
          });
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
            result,
          );
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  handleLogin = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (firebase.auth().currentUser.email) {
          this.props.navigation.navigate('Root');
        } else {
          console.log(':( did not login');
        }
      })
      .catch(error =>
        this.setState({
          errorMessage: error.message,
        }),
      );
  };

  onAppleButtonPress = () => {
    return appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      .then(appleAuthRequestResponse => {
        let {email} = appleAuthRequestResponse;
        console.log('🚀 ~ onAppleButtonPress= ~ email', email);
      });
  };

  render() {
    const isLogin = this.state.userInfo.name;
    const dynamicButtonText = isLogin
      ? 'Logout With Facebook'
      : 'Login With Facebook';
    const onPressButton = isLogin
      ? this.logoutWithFacebook
      : this.loginWithFacebook;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Theme.primaryColors.blue}
          barStyle="light-content"
        />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('WelcomeScreen')}>
            <Text style={styles.text_header}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

          <View
            style={[
              styles.action,
              {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
            ]}>
            <Icon
              name="mail-outline"
              color={Theme.primaryColors.black}
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor={Theme.secondaryColors.black}
              onChangeText={email =>
                this.setState({
                  email,
                })
              }
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
                  color={Theme.secondaryColors.black}
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
              onPress={this.handleLogin}>
              <Icon
                name="ios-arrow-forward"
                size={26}
                color={Theme.primaryColors.blue}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <View style={styles.viewBorder} />
              <Text style={styles.orText}> or </Text>
              <View style={styles.viewBorder} />
            </View>
            <SocialLoginButton
              onPress={() => this.props.navigation.navigate('SignUpScreen')}
              title="Create Account With Email"
              iconName="mail-outline"
            />
            <SocialLoginButton
              onPress={this.signInWithGoogleAsync}
              title="Login With Google"
              iconName="logo-google"
            />
            <SocialLoginButton
              title={dynamicButtonText}
              iconName="logo-facebook"
              onPress={onPressButton}
            />
            <SocialLoginButton
              title={'Login With Apple'}
              iconName="logo-apple"
              onPress={this.onAppleButtonPress}
            />

            <View
              style={{
                alignSelf: 'center',
                marginVertical: 30,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ResetPassword')}>
                <Text style={styles.resetPassword}>reset password</Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 10,
                }}
              />
            </View>
          </View>
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
    color: Theme.primaryColors.white,
    fontWeight: Theme.fontWeight.bold,
    fontSize: 30,
    paddingBottom: 10,
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
    fontSize: 15,
  },

  SignInButtonSection: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonsContainer: {
    marginTop: 20,
  },

  signInButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: Theme.primaryColors.black,
    fontWeight: Theme.fontWeight.bold,
  },
  errorMessage: {
    color: Theme.primaryColors.blue,
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
  viewBorder: {
    backgroundColor: Theme.primaryColors.black,
    height: 1,
    width: '40%',
    alignSelf: 'center',
  },
  orText: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: Theme.primaryColors.black,
  },
  resetPassword: {
    color: Theme.primaryColors.black,
    fontWeight: Theme.fontWeight.medium,
    fontSize: 14,
  },
});
