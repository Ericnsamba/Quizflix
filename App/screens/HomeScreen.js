/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from 'react';
import firebase from 'react-native-firebase';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	SafeAreaView,
	Dimensions,
	Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';



import {
	watchQuestionsData,
	watchPersonData,
	watchPointsData,
	watchLeaderBoardData,
} from '../redux/AppRedux';
import * as Theme from '../theme/Theme';
import ScoreHeader from '../components/ScoreHeader';
import AboutInfo from './aboutTheGame';
const { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
	return {
		questionsData: state.questionsData,
		pointsData: state.pointsData,
		leaderBoardData: state.leaderBoardData,
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
		watchLeaderBoardData: () => {
			dispatch(watchLeaderBoardData());
		},
	};
};

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
      uid: '',
      isModalVisible: false,
    };

		this.props.watchQuestionsData();
		this.props.watchPointsData();
		this.props.watchPersonData();
		this.props.watchLeaderBoardData();
	}

	componentDidMount() {
		if (firebase.auth().currentUser.uid) {
		}

	}

	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

	toggleModal = () => {
	 this.setState({isModalVisible: !this.state.isModalVisible});
	};

	render() {
		const RankingData = this.props.leaderBoardData;
		const br = `\n`;


		return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: Theme.primaryColors.white}}>
        <StatusBar isVisible barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <ScoreHeader />
          </View>

          <View
            style={{
              width: Theme.sizes.container,
              marginBottom: 20,
            }}>
            <Text style={[Theme.title, styles.introText]}>
              {`Go ahead! ${br}${'Start playing'}`}
            </Text>
          </View>

          <View style={styles.buttonsView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('QuizIndex')}
              style={styles.buttonContainer}>
              <LinearGradient
                colors={['#4569e1', Theme.primaryColors.blue]}
                style={styles.button}>
                <Text style={[styles.buttonTitle]}>Start</Text>
                <Icon
                  name="play-outline"
                  size={40}
                  style={styles.buttonIcon}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.toggleModal}
              style={styles.buttonContainer}>
              <LinearGradient
                colors={[
                  Theme.primaryColors.orange2,
                  Theme.primaryColors.orange,
                ]}
                style={styles.button}>
                <Text style={[styles.buttonTitle]}>Information</Text>
                <Icon
                  name="information-circle-outline"
                  size={40}
                  style={styles.buttonIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Modal isVisible={this.state.isModalVisible}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{zIndex: 10, marginVertical: 20}}
                title="Hide modal"
                onPress={this.toggleModal}>
                <Icon name="close" size={40} style={styles.buttonIcon} />
              </TouchableOpacity>
              <AboutInfo />
            </View>
          </Modal>

          <View style={styles.bottomLogo}>
            <Image
              source={require('../assets/images/logo.png')}
              resizeMode={'contain'}
              style={{width: 130}}
            />
          </View>
        </View>
      </SafeAreaView>
    );
	}
}

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: height,
    borderBottomColor: Theme.primaryColors.blue,
  },
  appBackGround: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: Theme.primaryColors.white,
  },
  headerContainer: {
    marginTop: 30,
    width: width,
    height: 100,
    marginBottom: 20,
    borderBottomColor: Theme.primaryColors.black,
  },
  button: {
    height: 80,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 0,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  buttonTitle: {
    color: Theme.primaryColors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '800',
  },
  buttonIcon: {
    color: Theme.primaryColors.white,
    paddingLeft: 20,
    paddingTop: 2,
  },
  introText: {
    color: Theme.primaryColors.blue,
    paddingLeft: 20,
    fontSize: Theme.sizes.title + 15,
  },
  buttonsView: {
    backgroundColor: Theme.secondaryColors.blue,
    paddingVertical: 30,
    paddingHorizontal: 30,
    width: Theme.sizes.container,
    alignSelf: 'center',
    borderRadius: 12,
    zIndex: 10,
  },
  bottomLogo: {
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -10,
  },
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen);
