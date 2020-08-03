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
// import Icon from 'react-native-vector-icons/Ionicons';
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
		};

		this.props.watchLeaderBoardData();
	}

	componentDidMount() {
		let rankUsers;
		let currentUser = firebase.auth().currentUser;
	}

	renderLeaderBoardUsers = RankingData => {
		if (RankingData && RankingData.length) {
			return RankingData.map((rank, index) => {
				if (!rank.totalPoints) {
				}
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

	renderTop3 = RankingData => {
		const top3 = [];
		let user;
		if (!top3.length && RankingData.length) {
			for (let i = 0; i < 3; i++) {
				top3.push(RankingData.shift());
			}
			if (top3.length) {
				user = top3;
				console.log('TopScoresScreen -> top3', top3);
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
									user[1].username ? user[1].username : 'name'
								}
								src={user[1].photoURL ? user[1].photoURL : null}
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
									{user[1].username
										? user[1].username
										: 'User'}
								</Text>
								<Text style={styles.top3UsersPoint}>
									{user[1].totalPoints
										? user[1].totalPoints
										: '0'}
									pts
								</Text>
							</View>
						</View>
						<View style={styles.topUserInfoView}>
							<Text style={styles.rankingNumber}>1</Text>
							<UserAvatar
								size={95}
								name={user[0].username}
								src={user[0].photoURL ? user[0].photoURL : null}
								bgColors={[
									'#fafafa',
									'#ccaabb',
									Theme.primaryColors.orange,
								]}
								borderRadius={50}
								style={{
									width: 100,
									height: 100,
								}}
							/>
							<View>
								<Text style={styles.top3UsersName}>
									{user[0].username}
								</Text>
								<Text style={styles.top3UsersPoint}>
									{user[0].totalPoints} pts
							</Text>
							</View>
						</View>

						<View style={styles.topUserInfoView}>
							<Text style={styles.rankingNumber}>3</Text>
							<UserAvatar
								size={65}
								name={user[2].username}
								src={user[2].photoURL ? user[2].photoURL : null}
								bgColors={[
									Theme.primaryColors.orange,
									Theme.primaryColors.lightBlue,
									Theme.primaryColors.pink,
									// '#fafafa',
									// '#ccaabb',
								]}
								borderRadius={50}
								style={{
									width: 70,
									height: 70,
								}}
							/>
							<View>
								<Text style={styles.top3UsersName}>
									{user[2].username}
								</Text>
								<Text style={styles.top3UsersPoint}>
									{user[2].totalPoints} pts
							</Text>
							</View>
						</View>
					</View>
				);
			}
		}

		// return <Text>test</Text>;
	};

	render() {
		const RankingData = this.props.leaderBoardData
			? this.props.leaderBoardData
			: [];
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: Theme.primaryColors.blue,
				}}>
				<StatusBar
					barStyle="light-content"
					hidden={false}
					backgroundColor="#00BCD4"
				/>

				<View style={styles.container}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							top: 20,
						}}>
						{/* <Text style={{ textAlign: 'center', fontSize: 24, top: 20 }}>Top 3 HighScore</Text> */}
						{this.renderTop3(RankingData)}
					</View>

					<LinearGradient
						colors={['#F56BA5', Theme.primaryColors.pink]}
						style={{
							flex: Platform.OS === 'ios' ? 3 : 5,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: Theme.primaryColors.blue,
							bottom: -40,
							borderTopLeftRadius: 30,
							borderTopRightRadius: 30,
						}}>
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentOffset={{ x: 0, y: -60 }}
							style={{
								// bottom: -10,
								width: width - 40,
								// marginTop: 15,
								marginBottom: 5,
							}}>
							{this.renderLeaderBoardUsers(RankingData)}
						</ScrollView>
					</LinearGradient>
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
		backgroundColor: Theme.primaryColors.blue,
		height: height,
	},
	header: {
		backgroundColor: '#fff',
		// backgroundColor: '#f7f5eee8',
		shadowColor: '#000000',
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
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
