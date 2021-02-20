import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';

export default class Loading extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          console.log(
            'AUTH STATE CHANGED CALLED , user logged in',
            firebase.auth().currentUser,
          );
          this.props.navigation.navigate('ButtonNavigation');
        } else {
          this.props.navigation.navigate('WelcomeScreen');
        }
      }.bind(this),
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
