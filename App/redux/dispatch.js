import {
  watchPersonData,
  watchPointsData,
  watchLeaderBoardData,
  watchTop3Users,
  watchScrollableRanking,
  watchQuestionsData,
} from '../redux/AppRedux';

export const mapStateToProps = state => {
  return {
    questionsData: state.questionsData,
    pointsData: state.pointsData,
    personData: state.personData,
    leaderBoardData: state.leaderBoardData,
    top3Users: state.top3Users,
    scrollableRanking: state.scrollableRanking,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    watchQuestionsData: () => {
      dispatch(watchQuestionsData());
    },
    watchLeaderBoardData: () => {
      dispatch(watchLeaderBoardData());
    },
    watchPersonData: () => {
      dispatch(watchPersonData());
    },
    watchPointsData: () => {
      dispatch(watchPointsData());
    },
    watchTop3Users: () => {
      dispatch(watchTop3Users());
    },
    watchScrollableRanking: () => {
      dispatch(watchScrollableRanking());
    },
  };
};
