/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import firebase from 'react-native-firebase';
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
	Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import * as Theme from '../theme/Theme';

export default class SignUpScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			secureTextEntry: true,
			email: '',
			photo: '',
			profileImage: '',
			password: '',
			errorMessage: null,
			isLoading: false,
			userInfo: {},
			check_textInputChange: false,
		};
	}

	handleSignUp = () => {
		const { username, email, password } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				const fbRootRef = firebase.firestore();
				const userID = firebase.auth().currentUser.uid;
				console.log('fbRootRef', fbRootRef);
				const userRef = fbRootRef.collection('users').doc(userID);
				userRef.set({
					email,
					password,
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
			.catch(error =>
				this.setState({errorMessage: error.message }),
			);
	};


	updateSecureTextEntry = () => {
		this.setState({
			secureTextEntry: !this.state.secureTextEntry,
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					backgroundColor={Theme.primaryColors.blue}
					barStyle="light-content"
				/>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('LoginScreen')
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
					<Animatable.View
						animation="fadeInUpBig"
						style={{ top: 60 }}>
						<ScrollView showsVerticalScrollIndicator={false}>
							<Text style={styles.errorMessage}>
								{this.state.errorMessage}
							</Text>
							<Text style={[styles.text_footer]}>Username</Text>
							<View style={styles.action}>
								<FontAwesome
									name="user-o"
									color={Theme.primaryColors.white}
									size={20}
								/>
								<TextInput
									placeholder="Your Username"
									placeholderTextColor={
										Theme.primaryColors.white
									}
									style={styles.textInput}
									autoCapitalize="none"
									onChangeText={username =>
										this.setState({ username })
									}
									value={this.state.username}
								/>
								{this.state.check_textInputChange ? (
									<Animatable.View animation="bounceIn">
										<Feather
											name="check-circle"
											color={Theme.primaryColors.blue}
											size={20}
										/>
									</Animatable.View>
								) : null}
							</View>

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
										this.setState({ email })
									}
									value={this.state.email}
									style={styles.textInput}
									autoCapitalize="none"
								/>
							</View>

							<Text style={[styles.text_footer]}>Password</Text>
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
									onPress={() => this.handleSignUp()}>
									<Icon
										name="ios-arrow-forward"
										size={26}
										color={Theme.primaryColors.blue}
									/>
								</TouchableOpacity>
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
		paddingBottom: 30,
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
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30,
	},
	text_footer: {
		color: Theme.primaryColors.white,
		fontSize: 15,
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: Theme.secondaryColors.white,
		paddingBottom: 5,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: Theme.primaryColors.white,
		height: 40,
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
		flexWrap: 'wrap',
		marginTop: 0,
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
		color: Theme.primaryColors.blue,
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
	termsConditions: {
		justifyContent: 'center',
	},
});
