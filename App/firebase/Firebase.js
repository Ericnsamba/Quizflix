import Firebase from 'react-native-firebase';
var firebaseConfig = {
  apiKey: 'AIzaSyDRTdFHmnjnEN0tc9r1vUXATddWX1muS-s',
  authDomain: 'quizandclock.firebaseapp.com',
  databaseURL: 'https://quizandclock.firebaseio.com',
  projectId: 'quizandclock',
  storageBucket: 'quizandclock.appspot.com',
  messagingSenderId: '289483445762',
  appId: '1:289483445762:web:ae37f3cfb180ca5287391b',
  measurementId: 'G-YB71X2KJFP',
};

// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
