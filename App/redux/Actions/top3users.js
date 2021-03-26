import * as firebase from 'react-native-firebase';

//
// leader_board Action Creators...
//
export const setTop3Users = top3Users => {
  return {
    type: 'setTop3Users',
    value: top3Users,
  };
};

export const watchTop3Users = () => {
  return function(dispatch) {
    // firebase
    //   .database()
    //   .ref('/leader_board')
    //   .on(
    //     'value',
    //     function(snapshot) {
    //       var leaderBoardData = snapshot.val();
    //       // console.log("🚀 ~ file: AppRedux.js ~ line 98 ~ returnfunction ~ leaderBoardData", leaderBoardData)
    //       if (leaderBoardData !== null) {
    //       console.log("🚀 ~ file: top3users.js ~ line 24 ~ returnfunction ~ snapshot.val()", snapshot.val())
    //         const sortedLeaderBoardData = Object.values(leaderBoardData).sort(
    //           (a, b) => b.totalPoints - a.totalPoints,
    //         );
    //         const top3 = [];
    //         const RankingData = [...sortedLeaderBoardData];
    //         for (let i = 0; i < 3; i++) {
    //           //immutable - you can't mutate the data
    //           top3.push(RankingData.shift());
    //         }
    //         if (top3.length > 0) {
    //           console.log("🚀 ~ file: top3users.js ~ line 34 ~ returnfunction ~ top3", top3)
    //           dispatch(setTop3Users(top3));
    //         }
    //         console.log("watchLeaderBoardData -> sortedLeaderBoardData", sortedLeaderBoardData)
    //       }
    //     },
    //     function(error) {
    //       console.log('firebase error', error);
    //     },
    //   );
  };
};
