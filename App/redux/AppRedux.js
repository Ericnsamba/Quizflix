/* eslint-disable prettier/prettier */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'react-native-firebase';

//
// Initial State...
//

const initialState = {
	leaderBoardData: {},
	questionsData: {},
	personData: {},
	pointsData: {},
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'setQuestionsData':
			return { ...state, questionsData: action.value };

		case 'setPersonData':
			return { ...state, personData: action.value };

		case 'setPointsData':
			return { ...state, pointsData: action.value };

		case 'setLeaderBoardData':
			return { ...state, leaderBoardData: action.value };

		default:
			return state;
	}
};

//
// Store...
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

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
	return function (dispatch) {
		// let questionsData;
		// if (questionsData) {
		firebase
			.database()
			.ref('/questions')
			.on(
				'value',
				function (snapshot) {
					var questionsData = snapshot.val();
					dispatch(setQuestionsData(questionsData));
				},
				function (error) {
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
	return function (dispatch) {
		firebase
			.database()
			.ref('/leader_board')
			.on(
				'value',
				function (snapshot) {
					var leaderBoardData = snapshot.val();
					const sortedLeaderBoardData =  Object.values(leaderBoardData).sort((a, b) => b.totalPoints - a.totalPoints);
                    // console.log("watchLeaderBoardData -> sortedLeaderBoardData", sortedLeaderBoardData)
					dispatch(setLeaderBoardData(sortedLeaderBoardData));
				},
				function (error) {
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
	return function (dispatch) {
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
				function (snapshot) {
					var pointsData = snapshot.val();
					dispatch(setPointsData(pointsData));
					// console.log("watchPointsData -> pointsData", pointsData)
				},
				function (error) {
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
	return function (dispatch) {
		const db = firebase.firestore();
		if (firebase.auth().currentUser) {
			const currentUser = firebase.auth().currentUser;
			const docRef = db.collection('users').doc(currentUser.uid);
			docRef.onSnapshot(function(doc) {
				if (doc.exists) {
					const personData = doc.data();
					dispatch(setPersonData(personData));
					// console.log('watchPersonData -> personData', personData);
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
				}
				const onError = (error) => {
					console.error(error);
				};
			});
				// .then(function (doc) {
				// 	if (doc.exists) {
				// 		const personData = doc.data();
				// 		dispatch(setPersonData(personData));
				// 		// console.log('watchPersonData -> personData', personData);
				// 	} else {
				// 		// doc.data() will be undefined in this case
				// 		console.log('No such document!');
				// 	}
				// })
				// .catch(function (error) {
				// 	console.log('Error getting document:', error);
				// });
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
};
