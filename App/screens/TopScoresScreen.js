/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Platform,
	ImageBackground,
	Dimensions,
	ScrollView,
	StatusBar
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import * as firebase from 'react-native-firebase';
import * as Theme from '../theme/Theme';
import { LeaderBoardUsers } from '../components/LeaderBoardUsers';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const avatar = require('../assets/images/profileAvatar.jpg');

//Redux
import { connect } from 'react-redux';
import {
	// watchUsersData
	watchPointsData,
	watchLeaderBoardData,
} from '../redux/AppRedux';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
	return {
		pointsData: state.pointsData,
		personData: state.personData,
		leaderBoardData: state.leaderBoardData,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		watchLeaderBoardData: () => {
			console.log("watchLeaderBoardData", watchLeaderBoardData)
			dispatch(watchLeaderBoardData());
		},
		watchPointsData: () => {
			dispatch(watchPointsData());
		},
	};
};
class TopScoresScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			visible: false,
			userData: [],
			top3Users: [],
			remainingUsers: [],
		};
		this.props.watchLeaderBoardData();
	}

	componentWillReceiveProps() {

		this.top3function()
	}

	componentDidMount() {
		let rankUsers;
		let currentUser = firebase.auth().currentUser;
		this.top3function();
	}

	renderLeaderBoardUsers = () => {
		const RankingData = this.state.remainingUsers;
		if (RankingData && RankingData.length) {
			return RankingData.map((rank, index) => {
				return (
					<View
						key={rank.uid}
						style={{
							justifyContent: 'center',
							flex: 1,
							alignItems: 'center',
						}}>
						<LeaderBoardUsers
							image={rank.image}
							rankNumber={index + 4}
							username={rank.username}
							totalPoints={rank.totalPoints}
							time={rank.timeStamp}
						/>
					</View>
				);
			});
		}
	};

	getData = () => {
		const { data } = this.state;
		let userRankings;
		firebase
			.database()
			.ref('/scores')
			.on('value', snapshot => {
				const firebaseData = snapshot.val();
				userRankings = firebaseData;
				this.setState({ data: firebaseData });
			});

		console.log(' -> getData -> userRankings', userRankings);
		return userRankings;
	};

	top3function = () => {
		const { leaderBoardData } = this.props;
		const top3 = [];
		const RankingData = [...leaderBoardData]
		for (let i = 0; i < 3; i++) { //immutable - you can't mutate the data
			top3.push(RankingData.shift());
		}
		this.setState({
			top3Users: top3,
			remainingUsers: RankingData
		})
	}

	renderTop3 = () => {
		const top3 = this.state.top3Users;
		return (
			<View
				style={{
					width: width,
					justifyContent: 'space-evenly',
					alignItems: 'center',
					flex: 1,
					flexDirection: 'row',
				}}>
				<View style={styles.topUserInfoView}>
					<Text style={styles.rankingNumber}>2</Text>
					<UserAvatar
						size={65}
						name={
							top3[1].username ? top3[1].username : 'name'
						}
						src={top3[1].photoURL ? top3[1].photoURL : null}
						bgColors={[
							Theme.primaryColors.lightBlue,
							'#ccaabb',
							Theme.primaryColors.orange,
						]}
						borderRadius={40}
						style={{
							width: 70,
							height: 70,
						}}
					/>
					<View>
						<Text style={styles.top3UsersName}>
							{top3[1].username
								? top3[1].username
								: 'User'}
						</Text>
						<Text style={styles.top3UsersPoint}>
							{top3[1].totalPoints
								? top3[1].totalPoints
								: '0'}
									pts
								</Text>
					</View>
				</View>
				<View style={styles.topUserInfoView}>
					<Text style={styles.rankingNumber}>1</Text>
					<UserAvatar
						size={95}
						name={top3[0].username}
						src={top3[0].photoURL ? top3[0].photoURL : null}
						bgColors={[
							Theme.primaryColors.lightBlue,
							Theme.primaryColors.pink,
						]}
						borderRadius={50}
						style={{
							width: 100,
							height: 100,
						}}
					/>
					<View>
						<Text style={styles.top3UsersName}>
							{top3[0].username}
						</Text>
						<Text style={styles.top3UsersPoint}>
							{top3[0].totalPoints} pts
								</Text>
					</View>
				</View>

				<View style={styles.topUserInfoView}>
					<Text style={styles.rankingNumber}>3</Text>
					<UserAvatar
						size={65}
						name={top3[2].username}
						src={top3[2].photoURL ? top3[2].photoURL : null}
						bgColors={[
							Theme.primaryColors.lightBlue,
							Theme.primaryColors.pink,
						]}
						borderRadius={50}
						style={{
							width: 70,
							height: 70,
						}}
					/>
					<View>
						<Text style={styles.top3UsersName}>
							{top3[2].username}
						</Text>
						<Text style={styles.top3UsersPoint}>
							{top3[2].totalPoints} pts
								</Text>
					</View>
				</View>
			</View>
		);
	};

	render() {

		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: Theme.primaryColors.blue2,
				}}>
				<StatusBar isVisible barStyle="light-content" />
				<View style={styles.container}>
					<View style={{ flex: 1, justifyContent: 'center', top: 20 }}>
						{this.state.top3Users.length === 3 && this.renderTop3()}
					</View>

					<View
						style={{
							flex: Platform.OS === 'ios' ? 3 : 5,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: Theme.primaryColors.white,
							bottom: -40,
							borderTopLeftRadius: 30,
							borderTopRightRadius: 30,
						}}>
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentOffset={{ x: 0, y: -60 }}
							style={{
								width: width - 40,
								marginBottom: 5,
							}}>
							{this.renderLeaderBoardUsers()}
						</ScrollView>
					</View>
				</View>
			</SafeAreaView>
		);
		// }
	}
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.secondaryColors.blue2,
		height: height,
	},
	header: {
		backgroundColor: Theme.primaryColors.white,
		shadowColor: '#000000',
		paddingTop: 30,
		borderTopLeftRadius: 60,
		borderTopRightRadius: 60,
	},
	rankingNumber: {
		fontSize: 24,
		fontWeight: '900',
		textAlign: 'center',
		color: Theme.primaryColors.white,
		width: '100%',
	},
	topUserInfoView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	top3UsersName: {
		fontSize: 14,
		textAlign: 'center',
		color: Theme.primaryColors.white,
		alignSelf: 'center',
		width: 100,
		paddingTop: 5,
	},
	top3UsersPoint: {
		fontSize: 16,
		textAlign: 'center',
		color: Theme.primaryColors.white,
		alignSelf: 'center',
		fontWeight: '700',
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TopScoresScreen);
