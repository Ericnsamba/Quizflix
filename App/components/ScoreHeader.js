/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';
import * as Theme from '../theme/Theme';
import { connect } from 'react-redux';
import { watchPersonData, watchPointsData } from '../redux/AppRedux';
import Icon from 'react-native-vector-icons/Ionicons';

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
			points: 0,
		};

		this.props.watchPointsData();
		this.props.watchPersonData();
	}
	renderPoints = () => {
		let points = 0;
		const currentUser = firebase.auth().currentUser;
		const quizPlayed = this.props.pointsData;

		if (currentUser && quizPlayed) {
			Object.values(quizPlayed).map(game => (points += game.points));
		} else if (!currentUser) {
			return (points = '');
		}
		return points;
	};

	componentDidMount = () => {

	}

	render() {
		const br = `\n`;
		const { username, email, profileImage } = this.props.personData;
		const avatar = require('../assets/images/profileAvatar.jpg');
		return (
			<View style={styles.container} >
				<View style={styles.innerContainer}>
					<View style={{ width: 60, justifyContent: 'center' }}>
						<Image
							resizeMode={'center'}
							source={profileImage ? { uri: profileImage } : avatar}
							style={styles.Image}
						/>
					</View>

					<View style={styles.rewardsAndIcon}>
						<View>
							<Icon name="ios-podium" color={Theme.primaryColors.blue} size={50} style={styles.Icon}/>
						</View>
						<Text style={styles.reward}>{this.renderPoints()}</Text>
					</View>
				</View>
				<View style={{
					marginLeft: 5,
				}}>
					<Text style={styles.userName}>
						{`Hi! ${br}${username ? username : 'anonymous'}`}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: width - 60,
		borderRadius: 12,
		alignSelf: 'center',
		justifyContent: 'space-between',
	},
	headerContainer: {
		top: 0,
		width: width,
		marginBottom: 24,
		backgroundColor: 'tomato',
		justifyContent: 'center',
	},
	headerTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		color: Theme.primaryColors.white,
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 60,
	},
	Image: {
		width: 60,
		height: 60,
		borderRadius: 10,
		borderColor: Theme.primaryColors.blue,
		borderWidth: 1
	},
	userName: {
		fontSize: 32,
		fontWeight: '800',
		textAlign: 'left',
		color: Theme.primaryColors.black,
		width: width - 30,
	},
	rewardsAndIcon: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	reward: {
		textAlign: 'center',
		color: Theme.primaryColors.black,
		fontSize: 32,
		fontWeight: '800',
		marginLeft: 10,
		bottom: -7,
	},
	Icon:{
		alignSelf: 'flex-end',
		bottom: -14,
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScoreHeader);
