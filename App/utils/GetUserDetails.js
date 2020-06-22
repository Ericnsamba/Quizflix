import firebase from 'react-native-firebase';

export const getUserDetails = () => {
  const db = firebase.firestore();
  let user = firebase.auth().currentUser;
  const docRef = db.collection('users').doc('userDetails');
  let userData;

  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        userData = doc.data();
        //   this.setSate({userName: userData.username, email: userData.email});
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });

  return userData;
};

export const getUserPoints = async () => {
  const {uid} = await firebase.auth().currentUser;
  let points = 0;

  await firebase
    .database()
    .ref(`/scores/${uid}/`)
    .on(
      'value',
      function(snapshot) {
        const data = snapshot.val();
        Object.values(data).map(game => (points += game.points));
        // console.log(
        //   'new data',
        //   Object.values(data).map(game => (points += game.points)),
        // );
      },
      function(errorObject) {
        console.log('The read failed: ' + errorObject.code);
      },
    );
  console.log('points==============>>>>', points);
  return points;

  //   const dbRef = await firebase.database().ref(`/scores/${uid}/`);
  //   console.log(dbRef);

  //   await dbRef.on('value', snapshot => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     Object.values(data).map(game => (points += game.points));
  //   });

  //   console.log('points==============>>>>', points);
  //   return points;
};
