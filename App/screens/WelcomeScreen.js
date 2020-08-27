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
			<View style={styles.container}>
				<StatusBar isVisible barStyle="dark-content" />
				<View style={styles.header}>
					<Animatable.View style={styles.appLogo} animation="bounce">
						<Image
							source={require('../assets/images/logo.png')}
							resizeMode={'contain'}
							style={{ width: 220 }}
						/>
					</Animatable.View>
				</View>

				<LinearGradient
					colors={[Theme.primaryColors.orange, Theme.primaryColors.orange]}
					style={[styles.footer, styles.bottomContainer]}>
					<Animatable.View animation="fadeInDownBig">
						<Text style={[styles.title]}>Welcome!</Text>
						<Text style={styles.text}>
							Please note: Sign in to get your name on the
							leaderBoard chart. Guest users will not appear on
							the chart.
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
													Theme.primaryColors.white,
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
		flex: 0.7,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingVertical: 30,
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
		color: Theme.primaryColors.white,
		marginTop: 10,
		marginBottom: 10,
		fontSize: 15,
	},
	buttons: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	playAsguestBtn: {
		borderColor: Theme.primaryColors.white,
		height: 50,
		borderWidth: 1,
		borderRadius: 50,
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
