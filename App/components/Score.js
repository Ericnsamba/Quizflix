import React from 'react';
import {
	View,
	StyleSheet,
	StatusBar,
	Text,
	Dimensions,
	Modal,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
import firebase from 'react-native-firebase';
import Feather from 'react-native-vector-icons/Feather';
import { db } from '../firebase/Firebase';
import LottieView from 'lottie-react-native';
import * as Theme from '../theme/Theme';
import ShareButton from './Share';
import ScoreTrophy from './Animated/ScoreTrophyAnim';
import { connect } from 'react-redux';
import { watchPersonData, watchPointsData } from '../redux/AppRedux';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');


const mapStateToProps = state => {
	return {
		pointsData: state.pointsData,
		personData: state.personData,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		watchPersonData: () => {
			dispatch(watchPersonData());
		},
		watchPointsData: () => {
			dispatch(watchPointsData());
		},
	};
};

let addItem = (data, quizCategory, uid, correctCount) => {
	const adaNameRef = firebase.database().ref(`/scores/${uid}/${quizCategory}/`);
	if (adaNameRef) {
		adaNameRef.update(data);
		// adaNameRef.update({points: correctCount});
	} else {
		adaNameRef.push(data);
	}
};



let updateLeaderBoard = (totalPointsData, uid) => {
	console.log("updateLeaderBoard -> totalPointsData, uid", totalPointsData, uid)

	const adaNameRef = firebase.database().ref(`/leader_board/${uid}/`);
	if (adaNameRef) {
		adaNameRef.update(totalPointsData);
	} else {
		adaNameRef.push(totalPointsData);
	}
};





class Score extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			photoURL: '',
			totalPoints: 0,
			currentUser: firebase.auth().currentUser,
		};
		this.props.watchPointsData();
		this.props.watchPersonData();
	}
	componentDidMount() {
		const { currentUser } = firebase.auth();
		this.setState({ currentUser });
		this.renderPoints()
	}


	renderPoints = () => {
		let points = 0;
		currentUser = firebase.auth().currentUser;
		const quizPlayed = this.props.pointsData;

		if (currentUser && quizPlayed) {
			Object.values(quizPlayed).map(game => (points += game.points));
			this.setState({ totalPoints: points })
		}
		console.log("Score -> renderPoints -> points", points)
		return points;
	};


	handleScores = () => {
		const {
			modalVisible,
			correctCount,
			inCorrectCount,
			totalCount,
			quizImage,
			username,
		} = this.props.parentState;
		const { currentUser, totalPoints } = this.state;

		const updatedTotalPoints = totalPoints + correctCount


		if (!currentUser) {

			console.log('anonymous user');
		}
		else if (correctCount + inCorrectCount === totalCount && modalVisible) {
			const timeStamp = new Date();
			const data = {
				timeStamp: `${timeStamp}`,
				points: correctCount,
				image: quizImage,
				username: username
			};

			const totalPointsData = {
				totalPoints: updatedTotalPoints, // key and value are the same name(eg. totalPoints: totalPoints)
				timeStamp: `${timeStamp}`,
				username: username ? username : 'Anonymous',
				uid: currentUser.uid,
			};

			addItem(
				data,
				this.props.parentState.quizCategory,
				currentUser.uid,
				correctCount,
			);

			updateLeaderBoard(
				totalPointsData,
				currentUser.uid,
			);

			console.log('submited the score 🎉🎉🎉🎉🎉');
		}



	};

	render() {
		const { modalVisible, correctCount, inCorrectCount } = this.props.parentState;
		return (
			<View style={[styles.container]}>
				<StatusBar
					barStyle="dark-content"
					hidden={false}
					backgroundColor="#00BCD4"
					translucent={true}
				/>
				<Modal
					animationType="fade"
					transparent={false}
					visible={modalVisible}
					onRequestClose={() => { }}>
					<View style={styles.centeredView}>
						<View style={styles.headerContainer}>
							<Text style={styles.headerTitle}>Quiz Results</Text>
							<ShareButton parentState={this.props.parentState} />
						</View>

						<View style={{ top: -40 }}>
							<Text
								style={{ color: Theme.primaryColors.blue }}
							>Nice try <Text style={{ fontWeight: 'bold' }} >Eric Manasse!</Text>
							</Text>

						</View>
						<View style={styles.resultsContainer}>
							<View style={styles.results}>
								<Text style={styles.resultText}>
									{correctCount} / {correctCount + inCorrectCount} </Text>
							</View>
							<Text style={{ color: Theme.primaryColors.blue, textTransform: 'uppercase', fontSize: 14, }} >correct answers</Text>
						</View>
						<View>
							<LottieView source={require('../assets/Animated/trophy-animation.json')}
								autoPlay loop
								style={{
									width: 300,
								}} />
						</View>
						<View>

						</View>

						<TouchableOpacity
							style={styles.playAgainButton}
							onPress={() => this.props.hideModal()}>
							<Text style={styles.closeButtonText}>Play Again</Text>
						</TouchableOpacity>
					</View>
					{this.handleScores()}
				</Modal>
			</View>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Score);

const styles = StyleSheet.create({
	centeredView: {
		// keeping everything centered
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		// backgroundColor: Theme.primaryColors.white,
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		height: height,
	},
	headerContainer: {
		position: 'absolute',
		top: 0,
		width: width,
		height: 124,
		paddingHorizontal: 30,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		borderBottomColor: Theme.primaryColors.blue,
		borderBottomWidth: 1,
	},
	headerTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: Theme.fontWeight.bold,
		color: Theme.primaryColors.blue,
	},
	resultsContainer: {
		top: 0,
		justifyContent: 'center',
	},
	results: {
		marginBottom: 12,
		justifyContent: 'center',
	},
	resultText: {
		color: Theme.primaryColors.pink,
		fontSize: 44,
		fontWeight: Theme.fontWeight.bold,
		textAlign: 'center',
		// letterSpacing: -0.02,
	},
	rewardsContainer: {
		width: 160,
		height: 110,
		borderRadius: 6,
		justifyContent: 'center',
		backgroundColor: Theme.primaryColors.gray,
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 48,
	},
	RewardsTitle: {
		textAlign: 'center',
		fontSize: 14,
		marginBottom: 12,
	},
	rewardsAndIcon: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 12,
	},
	reward: {
		textAlign: 'center',
		fontSize: 24,
		height: 39,
		paddingTop: 5,
	},
	playAgainButton: {
		justifyContent: 'center',
		position: 'absolute',
		alignItems: 'center',
		bottom: 60,
		width: 160,
		height: 60,
		borderRadius: 12,
		backgroundColor: Theme.primaryColors.blue,
	},
	closeButtonText: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: Theme.primaryColors.white,
	},
	safearea: {
		flex: 1,
		justifyContent: 'space-between',
	},
});
