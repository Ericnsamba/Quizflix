/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Theme from '../theme/Theme';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'yellow',
		// opacity: 0.4
	},
	circle: {
		backgroundColor: Theme.secondaryColors.pink,
		width: screen.width / 2,
		height: screen.width / 2,
		borderRadius: screen.width / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circleCorrect: {
		backgroundColor: Theme.secondaryColors.green,
	},
	icon: {
		width: screen.width / 3,
	},
});

export const Alert = ({ correct, visible }) => {
	if (!visible) {
		return null;
	}

	const icon = correct
		? require('../assets/Animated/CorrectTick.json')
		: require('../assets/Animated/IncorrectTick.json');

	const circleStyles = [styles.circle];

	if (correct) {
		circleStyles.push(styles.circleCorrect);
	}

	return (
		<View style={styles.container}>
			<View style={circleStyles}>
				<LottieView
					source={icon}
					autoPlay
					loop
					style={{
						width: 300,
					}}
				/>
			</View>
		</View>
	);
};
