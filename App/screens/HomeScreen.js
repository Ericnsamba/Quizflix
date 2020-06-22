import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {
  watchQuestionsData,
  watchPersonData,
  watchPointsData,
} from '../redux/AppRedux';

import * as Theme from '../theme/Theme';
import ScoreHeader from '../components/ScoreHeader';
import { Button } from '../components/UI/Button';
const { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
  return {
    questionsData: state.questionsData,
    pointsData: state.pointsData,
    // personData: state.personData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchQuestionsData: () => {
      dispatch(watchQuestionsData());
    },
    watchPersonData: () => {
      dispatch(watchPersonData());
    },
    watchPointsData: () => {
      dispatch(watchPointsData());
    },
  };
};

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.props.watchQuestionsData();
    this.props.watchPointsData();
    this.props.watchPersonData();
  }

  render() {

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Theme.primaryColors.white }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <ScoreHeader />
          </View>

          <View
            style={{
              height: 170,
              borderRadius: 12,
              width: width - 50,
              marginVertical: 48,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: Theme.primaryColors.gray,
            }}>
            <View>
              <Text style={{ textAlign: 'center' }}>Any Graphic</Text>
            </View>
          </View>

          <View style={styles.rankingContainer}>
            <View style={styles.ranking}>
              <Feather
                name="award"
                color={Theme.primaryColors.pink}
                size={24}
              />
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Word Rank</Text>
              <Text style={{ textAlign: 'center', color: Theme.primaryColors.pink, fontSize: 16, fontWeight: 'bold', paddingTop: 5 }}>12/ 2000</Text>
            </View>
            <View style={[styles.ranking, { marginHorizontal: 8, backgroundColor: Theme.secondaryColors.blue }]}>
              <Feather
                name="award"
                color={Theme.primaryColors.blue}
                size={24}
              />
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Local Rank</Text>
              <Text style={{ textAlign: 'center', color: Theme.primaryColors.blue, fontSize: 16, fontWeight: 'bold', paddingTop: 5 }}>9/500</Text>
            </View>
            <View style={[styles.ranking, { backgroundColor: Theme.secondaryColors.orange }]}>
              <Feather
                name="award"
                color={Theme.primaryColors.orange}
                size={24}
              />
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Points</Text>
              <Text style={{ textAlign: 'center', color: Theme.primaryColors.orange, fontSize: 16, fontWeight: 'bold', paddingTop: 5 }}>200</Text>
            </View>
          </View>

          <View style={styles.startQuizButton}>
            <Button
              text="Start"
              // onPress={() => this.answer(answer.correct)}
              onPress={() => this.props.navigation.navigate('QuizIndex')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  headerContainer: {
    top: 20,
    width: width,
    height: 124,
    marginBottom: 24,
    justifyContent: 'center',
    borderBottomColor: Theme.primaryColors.black,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },

  startQuizButton: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  rankingContainer: {
    alignSelf: 'center',
    // justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: width - 50,

  },
  ranking: {
    flex: 1,
    height: 90,
    // width: 104,–
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.secondaryColors.pink,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
