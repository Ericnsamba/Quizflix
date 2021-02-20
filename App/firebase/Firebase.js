import Firebase from 'react-native-firebase';
var firebaseConfig = {
  apiKey: 'AIzaSyDd9jfxS7NpcsIdwvwicHnSn6D5oYHUKnk',
  authDomain: 'quizflix-2021.firebaseapp.com',
  databaseURL: 'https://quizflix-2021-default-rtdb.firebaseio.com',
  projectId: 'quizflix-2021',
  storageBucket: 'quizflix-2021.appspot.com',
  messagingSenderId: '255436054103',
  appId: '1:255436054103:web:9e79f56c49206061ad8d12',
  measurementId: 'G-B828LPT9HX',
};

// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
