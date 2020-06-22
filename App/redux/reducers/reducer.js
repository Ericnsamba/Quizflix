var {
    QUESTIONS_DATA,
    PERSON_DATA,
    USER_POINTS,
} = require('../Actions/types');


//
// Initial State...
//

const initialState = {
    questionsData: {},
    personData: {},
    pointsData: {},
};

module.exports = {

    reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'setQuestionsData':
                return { ...state, questionsData: action.value };

            case 'setPersonData':
                return { ...state, personData: action.value };

            case 'setPointsData':
                return { ...state, pointsData: action.value };

            default:
                return state;
        }
    }

};