import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	StatusBar,
	Image
} from 'react-native';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Theme from '../theme/Theme';


export default class WelcomeScreen extends React.Component {
	// const { colors } = useTheme();


	handleQAnonnymousLogin = () => {
		firebase.auth()
			.signInAnonymously()
			.then(() => {
				console.log('User signed in anonymously');
				// this.props.navigation.navigate('LoginScreen')
			})
			.catch(error => {
				if (error.code === 'auth/operation-not-allowed') {
					console.log('Enable anonymous in your firebase console.');
				}

				console.error(error);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor={Theme.primaryColors.blue} barStyle="light-content" />
				<View style={styles.header}>
					{/* <Animatable.Image
						animation="bounceIn"
						duraton="1500"
						source={{ uri: 'https://lh3.googleusercontent.com/proxy/DHnUDKqe8-JA4nd9lRxOvNkyVK6d-ZR7k7G88VYWkyNE4bXp6STOn-U79MpJbvPpl-mMK8YROFewg4_Zj5KcyqQdwT5Q-U7roS6hyYh4YCNuEZzpafz4embT1g' }}
						// source={require('../assets/logo.png')}
						style={styles.logo}
						resizeMode="stretch"
					/> */}
					<Animatable.Text style={{ fontSize: 35, fontWeight: 'bold', color: Theme.primaryColors.white }} animation="zoomInUp">APP LOGO</Animatable.Text>
				</View>
				<Animatable.View
					style={[styles.footer, {
						backgroundColor: Theme.primaryColors.white
					}]}
					animation="fadeInUpBig"
				>
					<Text style={[styles.title, {
						// color: colors.text
					}]}>Stay connected with everyone!</Text>
					<Text style={styles.text}>Sign in with account</Text>
					<View style={styles.button}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
							<LinearGradient
								colors={[Theme.primaryColors.blue, Theme.primaryColors.blue]}
								style={styles.signIn}
							>
								<Text style={styles.textSign}>Get Started</Text>
								<MaterialIcons
									name="navigate-next"
									color="#fff"
									size={20}
								/>
							</LinearGradient>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.handleQAnonnymousLogin} style={{ marginTop: 10, }}>

							<View style={[styles.signIn,]}>
								<Text style={[styles.textSign, { color: Theme.primaryColors.blue }]}>Play as Guest</Text>
								<MaterialIcons
									name="navigate-next"
									color={Theme.primaryColors.blue}
									size={20}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</Animatable.View>
			</View>
		);
	}
};


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primaryColors.blue
	},
	header: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		flex: 1,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingVertical: 50,
		paddingHorizontal: 30
	},
	logo: {
		width: height_logo,
		height: height_logo
	},
	title: {
		color: Theme.primaryColors.blue,
		fontSize: 30,
		fontWeight: 'bold'
	},
	text: {
		color: 'grey',
		marginTop: 5
	},
	button: {
		alignItems: 'flex-end',
		marginTop: 30
	},
	signIn: {
		width: 150,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		flexDirection: 'row'
	},
	textSign: {
		color: 'white',
		fontWeight: 'bold'
	}
});

