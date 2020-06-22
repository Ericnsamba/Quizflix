import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class Loading extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log('AUTH STATE CHANGED CALLED , you are logged in')
        if (user) {
          this.props.navigation.navigate('Root');
        } else {
          this.props.navigation.navigate('WelcomeScreen');
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
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
