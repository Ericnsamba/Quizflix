import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ImageBackground,
	Image,
} from 'react-native';
import * as Theme from '../theme/Theme';
import { Themed } from 'react-navigation';
import { TimeAgo } from './Time';
const { width, height } = Dimensions.get('window');

export const ScoresInCategory = ({
	onPress = () => {},
	name,
	time,
	image,
	points,
}) => (
	<View style={styles.container}>
		<ImageBackground
			source={{ uri: image }}
			style={[styles.image, styles.innerContainer]}>
			<View style={[styles.cardDetails]}>
				<Text style={styles.title}>{name}</Text>
				<Text style={styles.pointsText}>Points: {points}</Text>
				<TimeAgo time={time} style={{ paddingBottom: 5 }} />
			</View>
		</ImageBackground>
	</View>
);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignSelf: 'center',
		marginVertical: 10,
		borderRadius: 20,
		overflow: 'hidden',
		width: 200,
	},
	innerContainer: {
		backgroundColor: Theme.primaryColors.blue,
		height: 200,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},

	cardDetails: {
		width: 200,
		paddingHorizontal: 15,
		paddingVertical: 5,
		marginBottom: 0,
		marginVertical: 5,
		alignSelf: 'center',
		backgroundColor: Theme.primaryColors.orange,
	},
	image: {
		borderRadius: 60 / 2,
		backgroundColor: Theme.primaryColors.lightBlue,
	},
	title: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '500',
		// textAlign: 'left',
		// position: 'relative',
		bottom: 0,
	},
	pointsText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '800',
		// textAlign: 'left',
		// position: 'relative',
		bottom: 0,
	},
	text: {
		fontSize: 10,
		color: '#fff',
		fontWeight: '400',
		textAlign: 'left',
		position: 'relative',
		bottom: 0,
	},
});
