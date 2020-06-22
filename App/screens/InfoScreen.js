import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import {
	View, Text, StyleSheet, Dimensions, SafeAreaView
} from 'react-native';
import * as Theme from '../theme/Theme';
import ScoreTrophy from '../components/Animated/ScoreTrophyAnim';
import { Icon } from '../custom/components/'



const { width, height } = Dimensions.get('window');

export default class InfoScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<SafeAreaView style={styles.safearea}>

				<View style={styles.container}>

					<View style={styles.headerContainer}>
						<Text style={styles.headerTitle}>Quiz Results</Text>
					</View>
					{/* <LottieView source={require('../assets/Animated/CorrectTick.json')} autoPlay loop /> */}
					<View style={styles.textContainer}>

						<Text style={styles.heading}>about the game</Text>
						<Text style={styles.text}>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industry's
							standard dummy text ever since the 1500s
					</Text>
						<View style={{ marginVertical: 20, }} />
						<Text style={styles.heading}>Developers</Text>
						<Text style={styles.text}>
							when an unknown printer
							took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic typesetting,
							remaining essentially unchanged.
					</Text>

						<View>
							{/* <Icon
								name="rocket"
								size={35}
								color="green"
							/> */}
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1
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
		textTransform: 'capitalize'
	},
	textContainer: {
		width: width,
		paddingTop: 60
	},
	text: {
		fontSize: 16,
		color: Theme.primaryColors.blue,
		lineHeight: 24,
		paddingHorizontal: 30,
	}

})