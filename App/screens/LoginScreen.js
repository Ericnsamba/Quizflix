/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Platform,
	StyleSheet,
	ScrollView,
	StatusBar,
	alert,
} from 'react-native';
// import auth from 'react-native-firebase/auth';
import firebase from 'react-native-firebase';
import * as Theme from '../theme/Theme';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from 'react-native-google-signin';
import {
	LoginButton,
	AccessToken,
	LoginManager,
	GraphRequest,
	GraphRequestManager,
} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			secureTextEntry: true,
			email: '',
			password: '',
			errorMessage: null,
			isLoading: false,
			userInfo: {},
		};
	}

	componentDidMount() {
		GoogleSignin.configure({
			webClientId:
				'289483445762-rtovvpn68uoskd7lk01aq4idpiu5l1tn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
			// offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		});
	}

	updateSecureTextEntry = () => {
		this.setState({
			secureTextEntry: !this.state.secureTextEntry,
		});
	};

	getCurrentUser = async () => {
		const currentUser = await GoogleSignin.getCurrentUser();
		this.setState({ currentUser });
	};

	loginUserFromGoogle = async () => {
		const currentUser = await (await GoogleSignin.getCurrentUser()).user;
		const { email, password } = this.state;
		if (currentUser && email === currentUser.email) {
			console.log(
				'LoginScreen -> loginUserFromGoogle -> currentUser',
				email,
				password,
			);
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					if (firebase.auth().currentUser.email) {
						this.props.navigation.navigate('Root');
					} else {
						console.log(':( did not login');
					}
				})
				.catch(error =>
					this.setState({
						errorMessage: error.message,
					}),
				);
		}
	};

	signInWithGoogleAsync = async () => {
		// const { username, email, photo } = this.state;
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const user = this.state.userInfo;
			this.setState({
				userInfo,
				username: userInfo.user.name,
				email: userInfo.user.email,
				profileImage: userInfo.user.photo,
			});
			this.loginUserFromGoogle();
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};

	getInfoFromToken = token => {
		const PROFILE_REQUEST_PARAMS = {
			fields: {
				string:
					'id, name, first_name, middle_name, last_name, picture, short_name',
			},
		};

		const profileRequest = GraphRequest(
			'/me',
			{
				token,
				parameters: PROFILE_REQUEST_PARAMS,
			},
			(error, result) => {
				if (error) {
					console.log('LoginScreen -> error', error);
				}
				if (result) {
					this.setState({ userInfo: result });
					console.log('LoginScreen -> result', result);
				} else {
				}
			},
		);
		new GraphRequestManager().addRequest(profileRequest.start());
	};

	loginWithFacebook = () => {
		LoginManager.logInWithPermissions(['public_profile']).then(
			login => {
				if (login.isCancelled) {
					console.log('loginWithFacebook -> isCancelled');
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						const accessToken = data.accessToken.toString();
						this.getInfoFromToken(accessToken);
					});
				}
			},
			error => {
				console.log('Login fail with error: ' + error);
			},
		);
	};
	logoutWithFacebook = () => {
		LoginManager.logOut();
		this.setState({ userInfo: {} });
	};

	onFacebookButtonPress = async () => {
		LoginManager.logInWithPermissions(['public_profile']).then(
			result => {
				if (result.isCancelled) {
					console.log('Login cancelled');
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						const accessToken = data.accessToken.toString();
						this.getInfoFromToken(accessToken);
					});
					console.log(
						'Login success with permissions: ' +
							result.grantedPermissions.toString(),
						result,
					);
				}
			},
			error => {
				console.log('Login fail with error: ' + error);
			},
		);
	};

	handleLogin = () => {
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				if (firebase.auth().currentUser.email) {
					this.props.navigation.navigate('Root');
				} else {
					// this.props.navigation.navigate('Verify');
					console.log(':( did not login');
				}
			})
			.catch(error =>
				this.setState({
					errorMessage: error.message,
				}),
			);
	};

	render() {
		const isLogin = this.state.userInfo.name;
		const dynamicButtonText = isLogin
			? 'Logout with Facebook'
			: 'Login with Facebook';
		const onPressButton = isLogin
			? this.logoutWithFacebook
			: this.loginWithFacebook;

		// this.state.errorMessage;
		console.log('userInfo', this.state.userInfo);
		return (
			<View style={styles.container}>
				<StatusBar
					backgroundColor={Theme.primaryColors.blue}
					barStyle="light-content"
				/>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('WelcomeScreen')
						}>
						<Text style={styles.text_header}>Back</Text>
					</TouchableOpacity>
				</View>
				<LinearGradient
					colors={['#F56BA5', Theme.primaryColors.pink]}
					style={styles.footer}>
					<Animatable.View animation="fadeInUpBig">
						<ScrollView showsVerticalScrollIndicator={false}>
							<Text style={styles.errorMessage}>
								{this.state.errorMessage}
							</Text>
							<Text style={[styles.text_footer]}>Email</Text>
							<View style={styles.action}>
								<Feather
									name="mail"
									color={Theme.primaryColors.white}
									size={20}
								/>
								<TextInput
									placeholder="Your Password"
									placeholderTextColor={
										Theme.secondaryColors.white
									}
									onChangeText={email =>
										this.setState({
											email,
										})
									}
									value={this.state.email}
									style={styles.textInput}
									autoCapitalize="none"
								/>
							</View>

							<Text
								style={[
									styles.text_footer,
									{
										marginTop: 35,
									},
								]}>
								Password
							</Text>
							<View style={styles.action}>
								<Feather
									name="lock"
									color={Theme.primaryColors.white}
									size={20}
								/>
								<TextInput
									placeholder="Password"
									placeholderTextColor={
										Theme.secondaryColors.white
									}
									onChangeText={password =>
										this.setState({
											password,
										})
									}
									value={this.state.password}
									secureTextEntry={
										this.state.secureTextEntry
											? true
											: false
									}
									style={styles.textInput}
									autoCapitalize="none"
								/>
								<TouchableOpacity
									onPress={this.updateSecureTextEntry}>
									{this.state.secureTextEntry ? (
										<Feather
											name="eye-off"
											color={Theme.secondaryColors.white}
											size={20}
										/>
									) : (
										<Feather
											name="eye"
											color={Theme.secondaryColors.white}
											size={20}
										/>
									)}
								</TouchableOpacity>
							</View>

							<View style={[styles.textPrivate]}>
								<View>
									<Text style={styles.color_textPrivate}>
										By signing up you agree to our
									</Text>
									<Text
										style={[
											styles.color_textPrivate,
											{
												fontWeight: 'bold',
											},
										]}>
										Terms of service
									</Text>
									<Text style={styles.color_textPrivate}>
										and
									</Text>
									<Text
										style={[
											styles.color_textPrivate,
											{
												fontWeight: 'bold',
											},
										]}>
										Privacy policy
									</Text>
								</View>

								<TouchableOpacity
									style={[styles.signInButton]}
									onPress={this.handleLogin}>
									<Icon
										name="ios-arrow-forward"
										size={26}
										color={Theme.primaryColors.blue}
									/>
								</TouchableOpacity>
							</View>

							<View style={styles.button}>
								<LoginButton
									publishPermissions={[
										'email',
										'public_profile',
									]}
									onLoginFinished={(error, result) => {
										if (error) {
											console.log(
												'Login failed with error: ' +
													error.message,
											);
										} else if (result.isCancelled) {
											console.log('Login was cancelled');
										} else {
											console.log(
												'Login was successful with permissions: ' +
													result.grantedPermissions,
											);
											console.log(
												'LoginScreen -> render -> result',
												result,
											);
										}
									}}
									onLogoutFinished={() =>
										console.log('User logged out')
									}
								/>
								<TouchableOpacity
									onPress={() =>
										this.props.navigation.navigate(
											'SignUpScreen',
										)
									}
									style={[styles.signIn, styles.signInWith]}>
									<Text style={styles.buttonText}>
										Sign up
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={this.signInWithGoogleAsync}
									style={[styles.signIn, styles.signInWith]}>
									<Text style={styles.buttonText}>
										Login With google
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={this.loginWithFacebook}
									style={[styles.signIn, styles.signInWith]}>
									<Text style={styles.buttonText}>
										{dynamicButtonText}
									</Text>
								</TouchableOpacity>

								<View
									style={{
										alignSelf: 'center',
										marginVertical: 30,
									}}>
									<Text
										style={{
											color: Theme.primaryColors.blue,
											fontWeight: Theme.fontWeight.normal,
										}}>
										Can't remember your password?{' '}
										{this.state.userInfo.name}
									</Text>
									<View
										style={{
											marginTop: 10,
										}}
									/>
								</View>
							</View>
						</ScrollView>
					</Animatable.View>
				</LinearGradient>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primaryColors.blue,
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		// paddingBottom: 50,
	},
	footer: {
		flex: Platform.OS === 'ios' ? 5 : 5,
		backgroundColor: Theme.primaryColors.pink,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	text_header: {
		color: Theme.primaryColors.white,
		fontWeight: 'bold',
		fontSize: 30,
		paddingBottom: 10,
		// top: -60,
	},
	text_footer: {
		color: Theme.primaryColors.white,
		fontSize: 14,
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: Theme.secondaryColors.white,
		paddingBottom: 5,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: Theme.primaryColors.white,
	},
	button: {
		alignItems: 'center',
		marginTop: 50,
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
	textSign: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	textPrivate: {
		flexDirection: 'row',
		// flexWrap: 'wrap',
		marginTop: 20,
		justifyContent: 'space-between',
	},
	color_textPrivate: {
		color: Theme.primaryColors.white,
	},
	signInWith: {
		borderColor: Theme.primaryColors.white,
		borderWidth: 1,
		marginTop: 15,
	},
	buttonText: {
		color: Theme.primaryColors.white,
		fontWeight: '500',
		textAlign: 'center',
	},
	errorMessage: {
		color: Theme.secondaryColors.pink,
		marginBottom: 10,
	},
	signInButton: {
		width: 80,
		height: 60,
		backgroundColor: Theme.primaryColors.white,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
});
