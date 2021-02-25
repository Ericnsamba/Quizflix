/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import * as RNLocalize from 'react-native-localize';
import Feather from 'react-native-vector-icons/Feather';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import * as Theme from '../theme/Theme';

const updateLeaderBoard = (totalPointsData, uid) => {
  const adaNameRef = firebase.database().ref(`/leader_board/${uid}/`);
  if (adaNameRef) {
    adaNameRef.update(totalPointsData);
  } else {
    adaNameRef.push(totalPointsData);
  }
};

const ConvertAnonymousToUsers = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [scoresData, setScoresData] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [check_textInputChange, setCheck_textInputChange] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  useEffect(() => {
    setCountryCode(RNLocalize.getCountry());
    const userID = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/scores/${userID}`)
      .once('value')
      .then(snapshot => {
        setScoresData(
          Object.values(snapshot.val())
            .map(game => game.points)
            .reduce((a, b) => a + b),
        );
      });
  }, []);

  const handleCreateUser = () => {
    let currentUser = firebase.auth().currentUser;
    console.log(' ~ setTotalPoints', scoresData);
    console.log(' ~ username', username);
    console.log(' ~ email', email);
    console.log(' ~ password', password);
    console.log(' ~ password', currentUser.uid);
    console.log(' ~ password', currentUser.uid);
    //   my uid y1LruFNV8JXJf23gF7Avfh6RIeQ2

    // 1. Create the email and password credential, to upgrade the anonymous user.
    var credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password,
    );

    // 2. Links the credential to the currently signed in user (the anonymous user).
    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then(
        function(user) {
          const timeStamp = new Date();
          const fbRootRef = firebase.firestore();
          const userID = firebase.auth().currentUser.uid;
          const userRef = fbRootRef.collection('users').doc(userID);
          userRef.set({
            email,
            password,
            username,
            countryCode,
          });

          const totalPointsData = {
            totalPoints: scoresData,
            timeStamp: `${timeStamp}`,
            username: username,
            uid: currentUser.uid,
          };

          updateLeaderBoard(totalPointsData, currentUser.uid);
        },
        function(error) {
          setErrorMessage(error.message);
          console.log('Error upgrading anonymous account', error);
        },
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={{top: 0}}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
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
              onChangeText={username => setUserName(username)}
              value={username}
            />
            {check_textInputChange ? (
              <View>
                <Feather
                  name="check-circle"
                  color={Theme.primaryColors.blue}
                  size={20}
                />
              </View>
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
              onChangeText={email => setEmail(email)}
              value={email}
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
              onChangeText={password => setPassword(password)}
              value={password}
              secureTextEntry={secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? (
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
              onPress={handleCreateUser}>
              <Icon
                name="ios-arrow-forward"
                size={26}
                color={Theme.primaryColors.blue}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '60%',
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
    borderRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: Theme.primaryColors.white,
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

export default ConvertAnonymousToUsers;
