import * as firebase from 'react-native-firebase';
//rankingData

//
// leader_board Action Creators...
//
export const setScrollableRanking = scrollableRanking => {
  return {
    type: 'setScrollableRanking',
    value: scrollableRanking,
  };
};

export const watchScrollableRanking = () => {
  return function(dispatch) {};
};
