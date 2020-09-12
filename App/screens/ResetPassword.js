import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
	InputField,
	Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import styled from 'styled-components/native';
import * as Theme from '../theme/Theme';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Container = styled.View`
	background: ${props => (props.color ? props.color : '#fff')};
	flex: 1;
	padding: 20px;
`;
const Header = styled.View`
	flex: 1;
	top: 40px;
	position: relative;
`;
const InputArea = styled.View`
	flex: 1;
`;
const TouchableIcon = styled.TouchableOpacity`
	align-items: flex-end;
	width: 60px;
	height: 60px;
	background-color: #fff;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	align-self: flex-end;
`;
const CloseButton = styled.TouchableOpacity`
	align-items: flex-end;
	width: 60px;
	height: 60px;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	align-self: flex-start;
`;

const Title = styled.Text`
	color: ${props => (props.color ? props.color : '#fff')};
	display: flex;
	font-size: 28px;
`;
const ForgotPasswordSubHeading = styled.Text`
	color: ${props => (props.color ? props.color : '#fff')};
	display: flex;
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
`;
const SubTitle = styled.Text`
	color: ${props => (props.color ? props.color : '#f1f0f1')};
	display: flex;
    font-size: 16px;
    font-weight: 300
`;
const ErrorMessage = styled.Text`
	color: ${props => (props.color ? props.color : '#f1f0f1')};
	font-size: 16px;
	margin-top: 10px;
`;

export default class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secureTextEntry: true,
			email: '',
			errorMessage: '',
			displayMessage: '',
			check: false,
		};
	}

	componentDidUpdate() {
		if (this.state.check) {
			this.props.navigation.navigate('LoginScreen');
		}
	}

	SendPasswordReset = () => {
		let errorText = '';

		if (this.state.email != '') {
			const emailAddress = this.state.email;

			firebase
				.auth()
				.sendPasswordResetEmail(emailAddress)
				.then(() => {
					this.setState({ check: true });
					this.props.navigation.navigate('LoginScreen');
					//Eric.ryda@gmail.com
					Alert.alert('Email sent to:', this.state.email);
					// this.props.navigation.navigate('LoginScreen');
				})
				.catch(err => {
					Alert.alert('Error', err.message);
					this.setState({ errorMessage: err.message });
					console.log('line 108=====>', err.message);
				});
		} else {
			Alert('Email Address cannot be empty');
			// this.setState({ displayMessage: 'Email Address cannot be empty' });
		}
	};

	render() {
		console.log('ResetPassword -> render -> render', this.state);
		return (
			<SafeAreaView
				style={{ flex: 1, backgroundColor: Theme.primaryColors.blue }}>
				<KeyboardAvoidingView
					style={[
						{ backgroundColor: Theme.primaryColors.blue2 },
						styles.wrapper,
					]}
					behavior="padding">
					<Container color={Theme.primaryColors.blue}>
						<CloseButton
							onPress={() =>
								this.props.navigation.navigate('LoginScreen')
							}>
							<Icon
								name="x"
								size={30}
								color={Theme.primaryColors.white}
							/>
						</CloseButton>
						<Header>
							<Title>Forgot your password?</Title>
							<SubTitle color={Theme.secondaryColors.blue}>
								Enter your email addess to reset account
							</SubTitle>
						</Header>
						<InputArea>
							<ForgotPasswordSubHeading>
								Email address.
							</ForgotPasswordSubHeading>
							<TextInput
								style={styles.input}
								underlineColorAndroid="transparent"
								placeholder="Email"
								placeholderTextColor={Theme.secondaryColors.blue}
								autoCapitalize="none"
								onChangeText={email => this.setState({ email })}
							/>
							<ErrorMessage color={Theme.primaryColors.pink}>
								{this.state.errorMessage}
							</ErrorMessage>
						</InputArea>
						<TouchableIcon onPress={() => this.SendPasswordReset()}>
							<Icon
								name="chevron-right"
								size={30}
								color={Theme.primaryColors.blue}
							/>
						</TouchableIcon>
					</Container>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flex: 1,
		backgroundColor: Theme.primaryColors.blue2,
	},
	input: {
		color: Theme.primaryColors.white,
		borderBottomColor: Theme.primaryColors.white,
		borderBottomWidth: 1,
		paddingVertical: 20,
	},
});
