import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {
  watchQuestionsData,
  watchPersonData,
  watchPointsData,
} from '../redux/AppRedux';

import quizData from '../data/Data.js';
import { RowItem } from '../components/RowItem';
import { AppConsumer } from '../context/AppContext.js';
import * as Theme from '../theme/Theme';
import { groupBy } from '../utils/Common.js';
import { Button } from '../components/UI/Button';

const { width, height } = Dimensions.get('window');

const mapDispatchToProps = dispatch => {
  return {
    watchQuestionsData: () => {
      dispatch(watchQuestionsData());
    },
    watchPersonData: () => {
      dispatch(watchPersonData());
    },
  };
};

class QuizIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      username: this.props.personData.username
    };

    this.props.watchQuestionsData();
    this.props.watchPersonData();
  }

  componentDidMount() {
    this.setState({ data: quizData });
    console.log("QuizIndex -> componentDidMount -> quizData", this.state.username)

  }

  renderQuizzes(groupedData) {

    const quizInfo = Object.keys(groupedData).map(category => {
      const obj = groupedData[category][0];
      const arrayData = groupedData[category];
      const name = this.state.username;
      return (
        <Animatable.View
          animation="tada"
          delay={500}
          // animation="flipInY"
          easing={t => Math.pow(t, 1.7)}
          // iterationCount={2}
          style={styles.footer}
          useNativeDriver={true}>
          <View key={category}>
            <RowItem
              image={obj.image}
              key={category}
              name={obj.category}
              onPress={() =>
                this.props.navigation.navigate('Quiz', {
                  arrayData, name
                })
              }
            />
          </View>
        </Animatable.View>
      );
    });
    return quizInfo;
  }

  render() {
    const questionsData = this.props;
    const groupedData = groupBy(this.props.questionsData, 'category');

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Theme.primaryColors.white }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Quiz Results</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.quizzesContainer}>
            {this.renderQuizzes(groupedData)}
            <View style={{ height: 40 }} />
          </ScrollView>

          <View style={styles.startQuizButton}>
            <Button
              text="Back Home"
              // onPress={() => this.answer(answer.correct)}
              onPress={() => this.props.navigation.navigate('HomeScreen')}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColors.white,
  },
  headerContainer: {
    width: width,
    height: 124,
    // backgroundColor: 'tomato',
    justifyContent: 'center',
    borderBottomColor: Theme.primaryColors.blue,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.primaryColors.blue,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 60,
    borderRadius: 12,
    backgroundColor: Theme.primaryColors.gray,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Theme.primaryColors.black,
  },
  startQuizButton: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: width,
    height: 100,
  },
  quizzesContainer: {
  },
});

const mapStateToProps = state => {
  return {
    questionsData: state.questionsData,
    personData: state.personData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizIndex);
