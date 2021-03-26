/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'react-native-firebase';
import reducer from './reducers/reducer';
import { watchTop3Users, setTop3Users} from './Actions/top3users';
import {
  watchScrollableRanking,
  setScrollableRanking,
} from './Actions/rankingData';


//
// Store...
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export {store};

//
// questionsData Action Creators...
//

const setQuestionsData = questionsData => {
  return {
    type: 'setQuestionsData',
    value: questionsData,
  };
};

const watchQuestionsData = () => {
  return function(dispatch) {
    // let questionsData;
    // if (questionsData) {
    firebase
      .database()
      .ref('/questions')
      .on(
        'value',
        function(snapshot) {
          var questionsData = snapshot.val();
          dispatch(setQuestionsData(questionsData));
        },
        function(error) {
          console.log('firebase error', error);
        },
      );
    // };
  };
};

//
// leader_board Action Creators...
//
const setLeaderBoardData = leaderBoardData => {
  return {
    type: 'setLeaderBoardData',
    value: leaderBoardData,
  };
};

const watchLeaderBoardData = () => {
  return function(dispatch) {
    firebase
      .database()
      .ref('/leader_board')
      .on(
        'value',
        function(snapshot) {
          var leaderBoardData = snapshot.val();
          // console.log("🚀 ~ file: AppRedux.js ~ line 98 ~ returnfunction ~ leaderBoardData", leaderBoardData)
          if (leaderBoardData !== null) {
            const sortedLeaderBoardData = Object.values(leaderBoardData).sort(
              (a, b) => b.totalPoints - a.totalPoints,
            );
             const top3 = [];
             const RankingData = [...sortedLeaderBoardData];
             for (let i = 0; i < 3; i++) {
               //immutable - you can't mutate the data
               top3.push(RankingData.shift());
              }
              if (top3.length > 0) {
                dispatch(setTop3Users(top3));
                dispatch(setScrollableRanking(RankingData));
                // console.log("🚀 ~ file: AppRedux.js ~ line 85 ~ returnfunction ~ RankingData", RankingData)
             }
            dispatch(setLeaderBoardData(sortedLeaderBoardData));
            // dispatch(setLeaderBoardData(sortedLeaderBoardData));
            // console.log("watchLeaderBoardData -> sortedLeaderBoardData", sortedLeaderBoardData)
          }
        },
        function(error) {
          console.log('firebase error', error);
        },
      );
  };
};

//
// pointsData Action Creators...
//
const setPointsData = pointsData => {
  return {
    type: 'setPointsData',
    value: pointsData,
  };
};

const watchPointsData = () => {
  return function(dispatch) {
    let currentUser = firebase.auth().currentUser || null;
    let UserId;
    if (currentUser) {
      UserId = firebase.auth().currentUser.uid;
    }
    firebase
      .database()
      .ref(`/scores/${UserId}`)
      .on(
        'value',
        function(snapshot) {
          var pointsData = snapshot.val();
          dispatch(setPointsData(pointsData));
          // console.log("watchPointsData -> pointsData", pointsData)
        },
        function(error) {
          console.log('firebase error', error);
        },
      );
  };
};

//
// Action Creators for PersonData...
//

const setPersonData = personData => {
  return {
    type: 'setPersonData',
    value: personData,
  };
};

const watchPersonData = () => {
  return function(dispatch) {
    const db = firebase.firestore();
    if (firebase.auth().currentUser) {
      const currentUser = firebase.auth().currentUser;
      const docRef = db.collection('users').doc(currentUser.uid);
      docRef.onSnapshot(function(doc) {
        if (doc.exists) {
          const personData = doc.data();
          dispatch(setPersonData(personData));
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
        const onError = error => {
          console.error(error);
        };
      });
    }
  };
};

export {
  // question data
  setQuestionsData,
  watchQuestionsData,
  // users data
  setLeaderBoardData,
  watchLeaderBoardData,
  // Person data
  setPersonData,
  watchPersonData,
  // Points data
  setPointsData,
  watchPointsData,
  //top3Users
  setTop3Users,
  watchTop3Users,
  // users
  watchScrollableRanking,
  setScrollableRanking,
};
