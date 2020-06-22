var {
    QUESTIONS_DATA,
    PERSON_DATA,
    USER_POINTS,
} = require('./types');

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'QUESTIONS_DATA':
            return { ...state, questionsData: action.value };

        case 'PERSON_DATA':
            return { ...state, personData: action.value };

        case 'USER_POINTS':
            return { ...state, pointsData: action.value };

        default:
            return state;
    }
};

// var reducers = {

// 	requestMovies: function(key) {
// 		return {
// 			type: REQUEST_MOVIES,
// 			key
// 		};
// 	},

// 	receiveMovies: function(movies) {
// 		return {
// 			type: RECEIVE_MOVIES,
// 			movies
// 		};
// 	},

// 	fetchMovies: function(key) {
// 		return dispatch =>
// 			fetch('http://www.omdbapi.com/?s=' + key)
// 				.then(response => {
// 					response.json().then(function(data) {  
// 						dispatch(reducers.receiveMovies(data.Search))
// 					});
// 				})
// 				.catch(error => { console.log('request failed', error); });
// 	}

// };

module.exports = reducer;