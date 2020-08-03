/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Theme from '../theme/Theme';
// import * as Theme from '../assets/audio/game/tick_tock.mp3';
// import Sound from 'react-native-sound';

// Import the react-native-sound module
var Sound = require('react-native-sound');


const { width, height } = Dimensions.get('window');

export default class InfoScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderSound = () => {
		// Enable playback in silence mode
		Sound.setCategory('Playback');


		var whoosh = new Sound('../assets/audio/game/tick_tock.mp3', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}
			// loaded successfully
			console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

			// Play the sound with an onEnd callback
			whoosh.play((success) => {
				if (success) {
					console.log('successfully finished playing');
				} else {
					console.log('playback failed due to audio decoding errors');
				}
			});
		});
	}

	renderCloseModal=()=>{
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}


	render() {

		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					{/* <View style={styles.headerContainer}>
						<Text style={styles.headerTitle}>Quiz Results</Text>
					</View> */}

					<View style={styles.textContainer}>
						<Text style={styles.heading}>about the game</Text>
						<Text style={styles.text}>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s
						</Text>
						<View style={{ marginVertical: 20 }} />
						<Text style={styles.heading}>Developers</Text>
						<Text style={styles.text}>
							when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap
							into electronic typesetting, remaining essentially
							unchanged.
						</Text>
						<View/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
	},
	container: {
		// flex: 1,
		backgroundColor: Theme.primaryColors.white,
		borderRadius: 20,
		justifyContent: 'center',
	},
	headerContainer: {
		width: width,
		height: 124,
		justifyContent: 'center',
		borderBottomColor: Theme.primaryColors.blue,
		borderBottomWidth: 1,
	},
	headerTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		color: Theme.primaryColors.blue,
	},
	heading: {
		color: Theme.primaryColors.blue,
		fontWeight: '500',
		textAlign: 'left',
		fontSize: 20,
		marginVertical: 10,
		paddingHorizontal: 30,
		textTransform: 'capitalize',
	},
	textContainer: {
		// width: width,
		// paddingTop: 60,
		marginVertical: 60,
	},
	text: {
		fontSize: 16,
		color: Theme.primaryColors.blue,
		lineHeight: 24,
		paddingHorizontal: 30,
	},
	closeModalButton: {
		justifyContent: 'center',
		width: 200,
		backgroundColor: 'skyblue',
		alignSelf: 'center',
		padding: 10,
	},
});
