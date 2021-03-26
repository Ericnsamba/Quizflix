//
// Initial State...
//

const initialState = {
  leaderBoardData: {},
  questionsData: {},
  personData: {},
  pointsData: {},
  top3Users: {},
  scrollableRanking: {},
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setQuestionsData':
      return {...state, questionsData: action.value};

    case 'setPersonData':
      return {...state, personData: action.value};

    case 'setPointsData':
      return {...state, pointsData: action.value};

    case 'setLeaderBoardData':
      return {...state, leaderBoardData: action.value};

    case 'setTop3Users':
      return {...state, top3Users: action.value};

    case 'setScrollableRanking':
      return {...state, scrollableRanking: action.value};

    default:
      return state;
  }
};

export default reducer;
