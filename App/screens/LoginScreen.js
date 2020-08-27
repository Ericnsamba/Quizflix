/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Platform,
	StyleSheet,
	ScrollView,
	StatusBar,
	Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import * as Theme from '../theme/Theme';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import {
	AccessToken,
	LoginManager,
	GraphRequest,
	GraphRequestManager,
} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			secureTextEntry: true,
			email: '',
			profileImage: '',
			password: '',
			errorMessage: '',
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
	createUser = async () => {
		const currentUser = await this.state.userInfo;
		if (currentUser) {
			const { username, email, photo, profileImage } = this.state;
			const password = this.state.userInfo.id;
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, username, photo)
				.then(user => {
					const fbRootRef = firebase.firestore();
					const userID = firebase.auth().currentUser.uid;
					const userRef = fbRootRef.collection('users').doc(userID);
					userRef.set({
						email,
						profileImage,
						username,
					});
				})
				.then(() => {
					if (firebase.auth().currentUser.email) {
						this.props.navigation.navigate('Root');
					} else {
						console.log(':( did not login');
					}
				})
				.catch(error => {
					console.log('catch error, line 27', error.message);
					this.setState({ errorMessage: error.message, })
				});
		}
	};




	updateSecureTextEntry = () => {
		this.setState({
			secureTextEntry: !this.state.secureTextEntry,
		});
	};

	signInWithGoogleAsync = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			this.setState({ userInfo });
			// creating credentials
			const credentials = firebase.auth.GoogleAuthProvider.credential(
				userInfo.idToken,
				userInfo.accessToken,
			);

			if (userInfo) {
				const { name, email, photo } = this.state.userInfo.user;
				return firebase
					.auth()
					.signInWithCredential(credentials)
					.then(user => {
						const fbRootRef = firebase.firestore();
						// const userID = user.uid;
						const userID = firebase.auth().currentUser.uid;
						console.log(' ====> fbRootRef', fbRootRef);
						console.log(' =====> userID:', userID);
						const userRef = fbRootRef
							.collection('users')
							.doc(userID);
						userRef.set({
							email: email,
							username: name,
							profileImage: photo.replace('s120', 's300', true),
						});
					});
			}
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
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
					'id, name, first_name, middle_name, last_name, picture.type(large), short_name, email',
			},
		};

		const profileRequest = new GraphRequest(
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
					this.setState({
						userInfo: result,
					});
					console.log('LoginScreen ---> result', this.state.userInfo);
					if (result) {
						const { name, email, picture } = this.state.userInfo;
						return firebase
							.auth()
							.signInWithCredential(token)
							.then(user => {
								const fbRootRef = firebase.firestore();
								const userID = firebase.auth().currentUser.uid;
								const userRef = fbRootRef
									.collection('users')
									.doc(userID);
								userRef.set({
									email: email,
									username: name,
									profileImage: picture.data.url,
								});
							});
					}
				} else {
				}
			},
		);
		if (this.state.userInfo) {
			this.createUser();
		}
		new GraphRequestManager().addRequest(profileRequest).start();
	};

	loginWithFacebook = async () => {
		LoginManager.logInWithPermissions(['public_profile', 'email']).then(
			result => {
				if (result.isCancelled) {
					console.log('Whoops!', 'You cancelled the sign in.');
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						const credential = firebase.auth.FacebookAuthProvider.credential(
							data.accessToken,
						);
						this.getInfoFromToken(credential);
						console.log(credential);
					});
				}
			},
			error => {
				console.log('Sign in error', error);
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
						console.log(
							'LoginScreen -> onFacebookButtonPress -> accessToken',
							accessToken,
						);
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
			? 'Logout With Facebook'
			: 'Login With Facebook';
		const onPressButton = isLogin
			? this.logoutWithFacebook
			: this.loginWithFacebook;

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
					colors={[
						Theme.primaryColors.orange,
						Theme.primaryColors.orange2,
					]}
					style={styles.footer}>
					<View>
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
									secureTextEntry={this.state.secureTextEntry ? true : false}
									style={styles.textInput}
									autoCapitalize="none"
								/>
								<TouchableOpacity
									onPress={this.updateSecureTextEntry}>
									{this.state.secureTextEntry ? (
										<Feather name="eye-off" color={Theme.secondaryColors.white} size={20} />
									) : (
											<Feather name="eye" color={Theme.secondaryColors.white} size={20} />
										)}
								</TouchableOpacity>
							</View>

							<View style={[styles.textPrivate]}>
								<View style={styles.termsConditions}>
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
										T&Cs and Code of Conduct
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
								<TouchableOpacity
									onPress={onPressButton}
									style={[styles.signIn, styles.signInWith]}>
									<Text style={styles.buttonText}>
										{dynamicButtonText}
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={this.signInWithGoogleAsync}
									style={[styles.signIn, styles.signInWith]}>
									<Text style={styles.buttonText}>
										Login With Google
									</Text>
								</TouchableOpacity>

								<View
									style={{
										justifyContent: 'space-between',
										flexDirection: 'row',
										marginVertical: 20,
									}}>
									<View style={styles.viewBorder} />
									<Text style={styles.orText}> or </Text>
									<View style={styles.viewBorder} />
								</View>

								<TouchableOpacity
									onPress={() =>
										this.props.navigation.navigate(
											'SignUpScreen',
										)
									}
									style={[
										styles.signIn,
										styles.createAccountButton,
									]}>
									<Text
										style={[
											styles.buttonText,
											{
												color:
													Theme.primaryColors.white,
											},
										]}>
										Create Account With Email
									</Text>
								</TouchableOpacity>
								<View
									style={{
										alignSelf: 'center',
										marginVertical: 30,
									}}>
									<Text
										style={{
											color: Theme.primaryColors.white,
											fontWeight: Theme.fontWeight.normal,
										}}>
										reset password
									</Text>
									<View
										style={{
											marginTop: 10,
										}}
									/>
								</View>
							</View>
						</ScrollView>
					</View>
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
		backgroundColor: Theme.primaryColors.white,
		marginTop: 15,
	},
	textSign: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	textPrivate: {
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'space-between',
	},
	termsConditions: {
		justifyContent: 'center',
	},
	color_textPrivate: {
		color: Theme.primaryColors.white,
	},
	createAccountButton: {
		backgroundColor: Theme.primaryColors.blue,
		// marginTop: 15,
	},
	buttonText: {
		color: Theme.primaryColors.blue,
		fontWeight: '500',
		textAlign: 'center',
	},
	errorMessage: {
		color: Theme.primaryColors.blue,
		marginBottom: 10,
	},
	signInButton: {
		width: 80,
		height: 50,
		backgroundColor: Theme.primaryColors.white,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
	viewBorder: {
		backgroundColor: Theme.primaryColors.white,
		height: 1,
		width: 60,
		alignSelf: 'center',
	},
	orText: {
		fontSize: 16,
		paddingHorizontal: 10,
		color: Theme.primaryColors.white,
	},
});
