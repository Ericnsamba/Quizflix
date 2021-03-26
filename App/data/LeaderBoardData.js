import React from 'react';
import {Text, View} from 'react-native';
import firebase from 'react-native-firebase';

const leaderBoardData = () => {
  console.log('line 6 ~ leaderBoardData ~ data');
  var sortedLeaderBoardData = [];
  var firebaseRef = firebase.database().ref('/leader_board');
  firebaseRef.once('value').then(dataSnapshot => {
    const _leaderBoard = dataSnapshot.val();
    sortedLeaderBoardData = Object.values(_leaderBoard).sort(
      (a, b) => b.totalPoints - a.totalPoints,
    );
    // console.log('sortedLeaderBoardData', sortedLeaderBoardData);
    // self.setState({
    //   data: _leaderBoard,
    // });
  });
  console.log('sortedLeaderBoardData', sortedLeaderBoardData);
};

export default leaderBoardData;
