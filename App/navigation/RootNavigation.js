/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import firebase from 'react-native-firebase';
import { View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {Ionicons ,Octicons} from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TopScoresScreen from '../screens/TopScoresScreen';
import InfoScreen from '../screens/InfoScreen';
import QuizIndex from '../screens/QuizIndex';
import Quiz from '../screens/Quiz';
import * as Theme from '../theme/Theme';
import Score from '../components/Score';

//icon images
const QuizIcon = require('../assets/Icons/Quiz.png');
const LeaderboardIcon = require('../assets/Icons/Leaderboard.png');
const SettingsIcon = require('../assets/Icons/Settings.png');

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		// User is signed in.
		console.log('User is signed in.');
		profilePhoto = firebase.auth().currentUser.photoURL;
	} else {
		// No user is signed in.
	}
});

const Stack = createStackNavigator();
function QuizHomeStack({ navigation, route }) {
	if (route.state && route.state.index >= 1) {
		navigation.setOptions({ tabBarVisible: false });
	} else {
		navigation.setOptions({ tabBarVisible: true });
	}
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={({ navigation }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="QuizIndex"
				component={QuizIndex}
				options={({ navigation }) => ({
					tabBarVisible: false,
					headerShown: false,
				})}
			/>
			<Stack.Screen name="Score" component={Score} />
			<Stack.Screen
				name="Quiz"
				component={Quiz}
				options={{
					title: 'My home',
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerShown: false,
					tabBarVisible: false,
				}}
			/>
			<Stack.Screen
				name="Info"
				component={InfoScreen}
				options={{
					title: 'My home',
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerShown: false,
					tabBarVisible: false,
				}}
			/>
		</Stack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

export default (ButtonNavigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabStyle: {
						paddingTop: 15,
						backgroundColor: Theme.primaryColors.lightBlue,
					},
					tabBarIcon: ({
						focused,
						color,
						size,
						iconAnimation,
						iconIteration,
					}) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = focused ? 'ios-home' : 'ios-home';
							size = focused ? 40 : 34;
							iconAnimation = focused ? 'pulse' : 'rubberBand';
							iconIteration = focused ? 'infinite' : 1;
						} else if (route.name === 'Score') {
							iconName = focused ? 'ios-trophy' : 'ios-trophy';
							size = focused ? 40 : 34;
							iconAnimation = focused ? 'pulse' : 'rubberBand';
							iconIteration = focused ? 'infinite' : 1;
						} else if (route.name === 'Info') {
							iconName = focused
								? 'ios-information-circle'
								: 'ios-information-circle-outline';
							size = focused ? 40 : 34;
							iconAnimation = focused ? 'pulse' : 'rubberBand';
							iconIteration = focused ? 'infinite' : 1;
						} else if (route.name === 'Profile') {
							iconName = focused ? 'ios-person' : 'ios-person';
							size = focused ? 40 : 34;
							iconAnimation = focused ? 'pulse' : 'rubberBand';
							iconIteration = focused ? 'infinite' : 1;
						}

						return (
							<View
								style={{
									backgroundColor: 'transparent',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Animatable.View
									animation={iconAnimation}
									iterationCount={iconIteration}
									delay={500}
									style={styles.icons}>
									<Icon
										name={iconName}
										size={size}
										color={color}
										style={{
											justifyContent: 'center',
											alignSelf: 'center',
											bottom: -10,
										}}
									/>
								</Animatable.View>
							</View>
						);
					},
				})}
				tabBarOptions={{
					showLabel: false,
					activeTintColor: Theme.primaryColors.blue,
					inactiveTintColor: Theme.secondaryColors.blue,
					style: {
						backgroundColor: Theme.primaryColors.white,
					},
				}}>
				<Tab.Screen name="Home" component={QuizHomeStack} />
				<Tab.Screen name="Score" component={TopScoresScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
});

const styles = StyleSheet.create({
	container: {
		// paddingTop: 50,
	},
	icons: {
		// top: 8,
	},
	logo: {
		width: 66,
		height: 58,
	},
});
