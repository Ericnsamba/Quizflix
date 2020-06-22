import React from 'react';
import * as firebase from 'react-native-firebase';

const initialState = {
  questionsData: [],
  userData: [],
  // AgencyData: {},
  // tourAgenciesData: [],
  // destinationData: [],
};

//
// Context...
//

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  stateUpdater = (key, value) => {
    `${key}`;
    this.setState({[key]: value});
  };

  watchQuestionsData = () => {
    if (
      Array.isArray(this.state.questionsData) &&
      this.state.questionsData.length === 0
    ) {
      firebase
        .database()
        .ref('/questions')
        .on(
          'value',
          function(snapshot) {
            let questionsData = snapshot.val();

            this.setState({questionsData});
          }.bind(this),
          function(error) {},
        );
    }
  };

  watchUserData = () => {
    let points;
    let currentUser = firebase.auth().currentUser;
    if (
      Array.isArray(this.state.userData) &&
      this.state.userData.length === 0
    ) {
      firebase
        .database()
        .ref(`/scores/${currentUser.uid}`)
        .on(
          'value',
          function(snapshot) {
            var userData = snapshot.val();
            Object.values(userData).map(game => (points += game.points));
            this.setState({userData});
          }.bind(this),
          function(error) {},
        );
    }
    console.log('==========> state userData from context', points);
    return points;
  };

  render() {
    this.watchQuestionsData();
    this.watchUserData();
    // this.watchDestinationData();
    // this.watchTravelTipsData();
    return (
      <AppContext.Provider
        value={{
          questionsData: this.state.questionsData,
          userData: this.state.userData,
          //   destinationData: this.state.destinationData,
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
