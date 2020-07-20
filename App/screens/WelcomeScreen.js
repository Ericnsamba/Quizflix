import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	StatusBar,
	Image,
	ImageBackground,
} from 'react-native';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Theme from '../theme/Theme';

export default class WelcomeScreen extends React.Component {
	handleQAnonnymousLogin = () => {
		firebase
			.auth()
			.signInAnonymously()
			.then(() => {
				console.log('User signed in anonymously');
			})
			.catch(error => {
				if (error.code === 'auth/operation-not-allowed') {
					console.log('Enable anonymous in your firebase console.');
				}

				console.error(error);
			});
	};

	render() {
		return (
			<ImageBackground
				source={require('../assets/images/app-bg.jpg')}
				style={styles.container}>
				<View style={styles.container}>
					<StatusBar barStyle="light-content" />
					<View style={styles.header}>
						<Animatable.Text
							style={styles.appLogo}
							animation="zoomInUp">
							APP LOGO
						</Animatable.Text>
					</View>

					<LinearGradient
						colors={['#F56BA5', Theme.primaryColors.pink]}
						style={[styles.footer, styles.bottomContainer]}>
						<Animatable.View
							// style={[styles.footer, styles.bottomContainer]}
							animation="fadeInUpBig">
							<Text style={[styles.title]}>
								Stay connected with everyone!
							</Text>
							<Text style={styles.text}>
								Sign in to get your name on the leaderBoard
								chart. Guest users will not appear on the chart.
							</Text>
							<View style={styles.buttons}>
								<TouchableOpacity
									onPress={() =>
										this.props.navigation.navigate(
											'LoginScreen',
										)
									}>
									<LinearGradient
										colors={[
											'#4569e1',
											Theme.primaryColors.blue,
										]}
										style={styles.signIn}>
										<Text style={styles.textSign}>
											Get Started
										</Text>
										<MaterialIcons
											name="navigate-next"
											color="#fff"
											size={20}
										/>
									</LinearGradient>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={this.handleQAnonnymousLogin}
									style={styles.playAsguestBtn}>
									<View style={[styles.signIn]}>
										<Text
											style={[
												styles.textSign,
												{
													color:
														Theme.primaryColors
															.white,
												},
											]}>
											Play as Guest
										</Text>
										<MaterialIcons
											name="navigate-next"
											color={Theme.primaryColors.white}
											size={20}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</Animatable.View>
					</LinearGradient>
				</View>
			</ImageBackground>
		);
	}
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomContainer: {
		backgroundColor: Theme.primaryColors.white,
	},
	header: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	appLogo: {
		fontSize: 35,
		fontWeight: 'bold',
		color: Theme.primaryColors.white,
	},
	footer: {
		flex: 1,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingVertical: 50,
		paddingHorizontal: 30,
	},
	logo: {
		width: height_logo,
		height: height_logo,
	},
	title: {
		color: Theme.secondaryColors.white,
		fontSize: 30,
		fontWeight: 'bold',
	},
	text: {
		color: Theme.secondaryColors.white,
		marginTop: 10,
		marginBottom: 10,
		fontSize: 15,
	},
	buttons: {
		// alignItems: 'flex-end',s
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	playAsguestBtn: {
		borderColor: Theme.primaryColors.white,
		height: 50,
		borderWidth: 1,
		borderRadius: 50,
		// left: -20,
	},
	signIn: {
		width: 150,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		flexDirection: 'row',
	},
	textSign: {
		color: 'white',
		fontWeight: 'bold',
	},
});
