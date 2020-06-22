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
	StatusBar
} from 'react-native';
import firebase from 'react-native-firebase';
import * as Theme from '../theme/Theme';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from 'react-native-google-signin';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			secureTextEntry: true,
			email: '',
			password: '',
			errorMessage: null,
			isLoading: false,
			userInfo: {}
		};
	}

	componentDidMount() {
		GoogleSignin.configure({
			webClientId: '289483445762-rtovvpn68uoskd7lk01aq4idpiu5l1tn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
			// offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		});
	}

	updateSecureTextEntry = () => {
		this.setState({
			secureTextEntry: !this.state.secureTextEntry
		})
	}


	getCurrentUser = async () => {
		const currentUser = await GoogleSignin.getCurrentUser();
		this.setState({ currentUser });
	};

	loginUserFromGoogle = async () => {
		const currentUser = await (await GoogleSignin.getCurrentUser()).user;
		const { email, password } = this.state;
		if (currentUser && email === currentUser.email) {
			console.log("LoginScreen -> loginUserFromGoogle -> currentUser", email, password)
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
				.catch(error => this.setState({ errorMessage: error.message }));
		}

	};

	signInWithGoogleAsync = async () => {
		const { username, email, photo } = this.state;
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
			this.loginUserFromGoogle()
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
			.catch(error => this.setState({ errorMessage: error.message }));
	};


	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor={Theme.primaryColors.blue} barStyle="light-content" />
				<View style={styles.header}>
					<Text style={styles.text_header}>Sign in</Text>
				</View>
				<Animatable.View
					animation="fadeInUpBig"
					style={styles.footer}
				>
					<ScrollView>
						<Text style={[styles.text_footer, {
							marginTop: 20
						}]}>Email</Text>
						<View style={styles.action}>
							<Feather
								name="mail"
								color={Theme.primaryColors.blue}
								size={20}
							/>
							<TextInput
								placeholder="Your Password"
								placeholderTextColor={Theme.secondaryColors.blue}
								onChangeText={email => this.setState({ email })}
								value={this.state.email}
								style={styles.textInput}
								autoCapitalize="none"
							/>
						</View>


						<Text style={[styles.text_footer, {
							marginTop: 35
						}]}>Password</Text>
						<View style={styles.action}>
							<Feather
								name="lock"
								color={Theme.primaryColors.blue}
								size={20}
							/>
							<TextInput
								placeholder="Password"
								placeholderTextColor={Theme.secondaryColors.blue}
								onChangeText={password => this.setState({ password })}
								value={this.state.password}
								secureTextEntry={this.state.secureTextEntry ? true : false}
								style={styles.textInput}
								autoCapitalize="none"
							/>
							<TouchableOpacity
								onPress={this.updateSecureTextEntry}
							>
								{this.state.secureTextEntry ?
									<Feather
										name="eye-off"
										color={Theme.secondaryColors.blue}
										size={20}
									/>
									:
									<Feather
										name="eye"
										color={Theme.secondaryColors.blue}
										size={20}
									/>
								}
							</TouchableOpacity>
						</View>

						<View style={styles.textPrivate}>
							<Text style={styles.color_textPrivate}>
								By signing up you agree to our </Text>
							<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>Terms of service</Text>
							<Text style={styles.color_textPrivate}>and</Text>
							<Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>Privacy policy</Text>
						</View>
						<View style={styles.button}>
							<TouchableOpacity
								style={styles.signIn}
								onPress={this.handleLogin}>
								<LinearGradient
									colors={[Theme.primaryColors.blue, Theme.primaryColors.blue]}
									style={styles.signIn}>
									<Text style={[styles.textSign, {
										color: Theme.primaryColors.white
									}]}>Sign In</Text>
								</LinearGradient>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('SignUpScreen')}
								style={[styles.signIn, {
									borderColor: Theme.primaryColors.blue,
									borderWidth: 1,
									marginTop: 15
								}]}
							>
								<Text style={[styles.textSign, {
									color: Theme.primaryColors.blue
								}]}>Sign Up</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={this.signInWithGoogleAsync}
								style={[styles.signIn, {
									borderColor: Theme.primaryColors.blue,
									borderWidth: 1,
									marginTop: 15
								}]}>
								<Text
									style={{
										color: Theme.primaryColors.blue,
										fontWeight: '500',
										textAlign: 'center',
									}}>
									Login With google</Text>
							</TouchableOpacity>

							<View style={{ alignSelf: 'center', marginVertical: 30 }}>
								<Text
									style={{
										color: Theme.primaryColors.blue,
										fontWeight: Theme.fontWeight.normal,
									}}>
									Can't remember your password?</Text>
								<View style={{ marginTop: 10 }} />
							</View>
						</View>
					</ScrollView>
				</Animatable.View>
			</View>
		);
	}
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primaryColors.blue,
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 50
	},
	footer: {
		flex: Platform.OS === 'ios' ? 3 : 5,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30
	},
	text_header: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30
	},
	text_footer: {
		color: Theme.primaryColors.blue,
		fontSize: 14
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: Theme.primaryColors.blue,
	},
	button: {
		alignItems: 'center',
		marginTop: 50
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	textSign: {
		fontSize: 14,
		fontWeight: 'bold'
	},
	textPrivate: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20
	},
	color_textPrivate: {
		color: 'grey'
	}
});
