import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Theme from '../theme/Theme';
import { connect } from 'react-redux';
import { watchPersonData, watchPointsData } from '../redux/AppRedux';

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

class ScoreHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			profileImage: '',
			username: '',
			points: 0
		};

		this.props.watchPointsData();
		this.props.watchPersonData();
	}
	renderPoints = () => {
		let points = 0;
		currentUser = firebase.auth().currentUser;
		const quizPlayed = this.props.pointsData;

		if (currentUser && quizPlayed) {
			Object.values(quizPlayed).map(game => (points += game.points));
		} else if (!currentUser) {
			return (points = '');
		}
		// this.setState({ points: points })
		return points;
	};

	componentDidMount = () => {

	}

	render() {
		const { username, email, profileImage } = this.props.personData;
		const avatar = require('../assets/images/profileAvatar.jpg');
		return (
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<View style={{ width: 60, justifyContent: 'center' }}>
						<Image
							resizeMode={'center'}
							source={profileImage ? { uri: profileImage } : avatar}
							style={{ width: 60, height: 60, borderRadius: 30 }}
						/>
					</View>
					<View
						style={{
							flexGrow: 1,
							marginLeft: 20,
							display: 'flex',
							justifyContent: 'center',
						}}>
						<Text style={styles.userName}>
							{username ? username : 'anonymous'}
						</Text>
					</View>

					{/* Icon and Reward*/}
					<View style={{ justifyContent: 'center' }}>
						<View style={styles.rewardsAndIcon}>
							<Feather
								name="award"
								color={Theme.primaryColors.white}
								size={24}
							/>
							<Text style={styles.reward}>{this.renderPoints()}</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 80,
		width: width - 50,
		backgroundColor: Theme.primaryColors.pink,
		borderRadius: 12,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	headerContainer: {
		top: 0,
		width: width,
		height: 124,
		marginBottom: 24,
		backgroundColor: 'tomato',
		justifyContent: 'center',
		// borderBottomColor: Theme.primaryColors.black,
		// borderBottomWidth: StyleSheet.hairlineWidth,
	},
	headerTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		color: Theme.primaryColors.white,
	},
	innerContainer: {
		// borderBottomColor: Theme.primaryColors.gray,
		// borderBottomWidth: StyleSheet.hairlineWidth,
		flexGrow: 1,
		flexDirection: 'row',
		padding: 20,
	},
	userName: {
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'left',
		color: Theme.primaryColors.white,
	},
	rewardsAndIcon: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	reward: {
		textAlign: 'center',
		fontSize: 18,
		color: Theme.primaryColors.white,
	},
	playAgainButton: {
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 20,
		width: 160,
		height: 60,
		borderRadius: 12,
		backgroundColor: Theme.primaryColors.gray,
	},
	closeButtonText: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: Theme.primaryColors.black,
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScoreHeader);
