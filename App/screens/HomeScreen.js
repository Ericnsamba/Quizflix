/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	StatusBar,
	SafeAreaView,
	Dimensions,
	Image,
	ImageBackground,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
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
const { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
	return {
		questionsData: state.questionsData,
		pointsData: state.pointsData,
		leaderBoardData: state.leaderBoardData,
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
		};

		this.props.watchQuestionsData();
		this.props.watchPointsData();
		this.props.watchPersonData();
		this.props.watchLeaderBoardData();
	}

	componentDidMount() {
		if (firebase.auth().currentUser.uid) {
			// this.setState({ uid: firebase.auth().currentUser.uid });
		}
		// console.log("HomeScreen -> componentDidMount -> irebase.auth().currentUser.uid;", firebase.auth().currentUser.uid)
	}

	render() {
		const RankingData = this.props.leaderBoardData;

		let userData;
		if (RankingData) {
			// userData = RankingData.find(obj => obj.uid === firebase.auth().currentUser.uid)
			// console.log("userData======> ", userData.username);
		}

		if (!userData) {
			userData = {
				// username: 'test'
			};
		}

		return (
			<ImageBackground
				resizeMode="cover"
				source={require('../assets/images/app-bg.jpg')}
				blurRadius={1}
				style={styles.appBackGround}>
				<SafeAreaView
					style={{
						flex: 1,
						// backgroundColor: Theme.primaryColors.blue,
					}}>
					<StatusBar barStyle="dark-content" />
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<ScoreHeader />
						</View>
						<View style={[styles.flex, styles.row, styles.header]}>
							<View style={{ flexDirection: 'row' }}>
								<Icon
									name="md-trophy"
									size={30}
									color={Theme.primaryColors.orange}
								/>
								<Text
									style={{
										color: Theme.primaryColors.white,
										lineHeight: 30,
										paddingLeft: 10,
									}}>
									Ranking
								</Text>
								{/* <Text style={{ fontSize: 24, color: Theme.secondaryColors.blue }}>Destination</Text> */}
							</View>
							<View>
								<Feather
									name="star"
									color={Theme.primaryColors.orange}
									size={24}
								/>
							</View>
							<View>
								<Image
									style={styles.avatar}
									source={{
										uri:
											'https://randomuser.me/api/portraits/women/32.jpg',
									}}
								/>
							</View>
						</View>

						<View style={styles.buttonsView}>
							<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('QuizIndex')
								}
								style={styles.buttonContainer}>
								<LinearGradient
									colors={[
										'#FF9F88',
										Theme.primaryColors.orange,
									]}
									style={styles.button}>
									<Text style={[styles.buttonTitle]}>
										Start
									</Text>
									<Icon
										name="md-play-circle"
										size={30}
										style={styles.buttonIcon}
									/>
								</LinearGradient>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('QuizIndex')
								}
								style={styles.buttonContainer}>
								<LinearGradient
									colors={[
										'#F56BA5',
										Theme.primaryColors.pink,
									]}
									style={styles.button}>
									<Text style={[styles.buttonTitle]}>
										More
									</Text>
									<Icon
										name="md-play-circle"
										size={30}
										style={styles.buttonIcon}
									/>
								</LinearGradient>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('QuizIndex')
								}
								style={styles.buttonContainer}>
								<LinearGradient
									colors={[
										'#6BF4FF',
										Theme.primaryColors.lightBlue,
									]}
									style={styles.button}>
									<Text style={[styles.buttonTitle]}>
										Options
									</Text>
									<Icon
										name="ios-settings"
										size={30}
										style={styles.buttonIcon}
									/>
								</LinearGradient>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			</ImageBackground>
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
	},
	headerContainer: {
		top: 20,
		width: width,
		height: 100,
		marginBottom: 24,
		justifyContent: 'center',
		borderBottomColor: Theme.primaryColors.black,
	},

	startQuizButton: {
		position: 'absolute',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 60,
	},
	rankingContainer: {
		alignSelf: 'center',
		flexDirection: 'row',
		width: width - 50,
	},
	ranking: {
		flex: 1,
		height: 90,
		borderRadius: 8,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Theme.secondaryColors.pink,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	button: {
		height: 60,
		width: 260,
		alignSelf: 'center',
		borderRadius: 12,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
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
	buttonsView: {
		top: 100,
		backgroundColor: Theme.primaryColors.white,
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen);
