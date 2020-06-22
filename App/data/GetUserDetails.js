import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class GetUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      points: '',
    };
  }

  componentDidMount = () => {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    const docRef = db.collection('users').doc('userDetails');

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const userData = doc.data();
          this.setSate({userName: userData.username, email: userData.email});
          console.log({state});
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });
  };

  render() {
    return (
      <View>
        <Text> GetUserDetails </Text>
      </View>
    );
  }
}
