import React, { useEffect, Component } from 'react';
import firebase from 'react-native-firebase';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	SafeAreaView,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { watchPersonData, watchPointsData, watchUsersData } from '../redux/AppRedux';
import * as Theme from '../theme/Theme';
import ScoreHeader from '../components/ScoreHeader';
import { ScoresInCategory } from '../components/ScoresInCategory.js';
import { ScrollView } from 'react-native-gesture-handler';
import { Themed } from 'react-navigation';

const { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
	return {
		pointsData: state.pointsData,
		personData: state.personData,
		usersData: state.usersData,
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
		watchUsersData: () => {
			dispatch(watchUsersData());
		},
	};
};


class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAnonymous: firebase.auth().currentUser._user.isAnonymous,
		};
		this.props.watchPointsData();
		this.props.watchPersonData();
	}

	renderScoresInCategory = (pointsData) => {
		const userPoints = this.props.pointsData;
		if (userPoints) {
			const scoreInfo = Object.keys(userPoints).map(key => {
				const obj = userPoints[key]
				return (
					<View key={key}>
						<ScoresInCategory
							image={obj.image}
							key={key}
							name={key}
							time={obj.timeStamp}
							points={obj.points}
						// onPress={() =>
						// 	this.props.navigation.navigate('Quiz', {
						// 		arrayData,
						// 	})
						// }
						/>
					</View>
				);
			})
			return scoreInfo
		}
	}

	Item = ({ name }) => {
		return (
			<View style={styles.item}>
				<Text style={styles.name}>{name}</Text>
			</View>
		);
	}

	render() {
		const { isAnonymous } = this.state;
		// console.log("render -> isAnonymous", this.props)

		const pointsData = this.props.pointsData;
		if (isAnonymous) {
			return (
				<SafeAreaView style={{ flex: 1, height: height, backgroundColor: Theme.primaryColors.white }}>
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<ScoreHeader />
						</View>

						<View >
							<View style={{ width: width - 60, justifyContent: 'center', alignSelf: 'center', marginTop: 40 }}>
								<Text style={{ textAlign: 'left', fontSize: 20, color: Theme.primaryColors.blue, fontWeight: 'bold', }}>Your Scores</Text>
							</View>

							<ScrollView>
								<View>
									{this.renderScoresInCategory(pointsData)}
								</View>
							</ScrollView>
						</View>
						<View style={{
							position: 'absolute',
							bottom: 20,
							padding: 20,
							backgroundColor: Theme.primaryColors.lightBlue,
							width: 300,
							alignItems: 'center',
							alignSelf: 'center'
						}}>
							<TouchableOpacity onPress={() => firebase.auth().signOut()}>
								<Text
									style={{
										color: Theme.primaryColors.blue,
										textTransform: 'uppercase',
										fontWeight: '500',
										fontSize: 12,
									}}>Logout</Text>
							</TouchableOpacity>

						</View>

					</View>
				</SafeAreaView>
			)
		}
		else {
			return (
				<SafeAreaView style={{ flex: 1, height: height, backgroundColor: Theme.primaryColors.white }}>
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<ScoreHeader />
						</View>

						<View >
							<View style={{ width: width - 60, justifyContent: 'center', alignSelf: 'center', marginTop: 40 }}>
								<Text style={{ textAlign: 'left', fontSize: 20, color: Theme.primaryColors.blue, fontWeight: 'bold', }}>Your Scores</Text>
							</View>

							<ScrollView>
								<View>
									{this.renderScoresInCategory(pointsData)}
								</View>
							</ScrollView>
						</View>
						<View style={{
							position: 'absolute',
							bottom: 20,
							padding: 20,
							backgroundColor: Theme.primaryColors.lightBlue,
							width: 300,
							alignItems: 'center',
							alignSelf: 'center'
						}}>
							<TouchableOpacity onPress={() => firebase.auth().signOut()}>
								<Text
									style={{
										color: Theme.primaryColors.blue,
										textTransform: 'uppercase',
										fontWeight: '500',
										fontSize: 12,
									}}>Logout</Text>
							</TouchableOpacity>

						</View>

					</View>
				</SafeAreaView>
			);
		}
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primaryColors.white
	},
	shadow: {
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	},
	headerContainer: {
		top: 20,
		width: width,
		height: 124,
		marginBottom: 24,
		justifyContent: 'center',
		borderBottomColor: Theme.primaryColors.black,
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProfileScreen);
