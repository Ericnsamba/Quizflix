import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ImageBackground,
	Image
} from 'react-native';
import * as Theme from '../theme/Theme';
import { Themed } from 'react-navigation';
import { TimeAgo } from './Time';
const { width, height } = Dimensions.get('window');

export const ScoresInCategory = ({ onPress = () => { }, name, time, image, points }) => (
	<View style={styles.container}>
		<View style={styles.innerContainer}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={[styles.row, { width: 200 }]}>
				<Text style={styles.title}>{name}</Text>
				<Text style={styles.pointsText}>Points: {points}</Text>
				<TimeAgo time={time}
				/>
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignSelf: 'center',
		marginVertical: 10,
		borderRadius: 20,
		overflow: 'hidden',
	},
	innerContainer: {
		backgroundColor: Theme.primaryColors.blue,
		height: 84,
		width: width - 60,
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		alignItems: 'center'

	},

	row: {
		paddingHorizontal: 15,
		marginBottom: 1,
		width: width - 60,
		borderRadius: 12,
		marginVertical: 5,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
		backgroundColor: Theme.primaryColors.lightBlue,
	},
	title: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '500',
		textAlign: 'left',
		position: 'relative',
		bottom: 0,
	},
	pointsText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '800',
		textAlign: 'left',
		position: 'relative',
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




