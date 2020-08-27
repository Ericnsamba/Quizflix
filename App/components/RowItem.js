import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ImageBackground,
} from 'react-native';
import styled from 'styled-components/native'
import * as Theme from '../theme/Theme';
const { width, height } = Dimensions.get('window');

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  position: relative;
  bottom: 0;
`;


export const RowItem = ({ onPress = () => { }, name, color, image }) => (
	<TouchableOpacity
		onPress={onPress}
		activeOpacity={0.8}
		style={styles.card}>
		<View style={styles.container}>
			<ImageBackground source={{ uri: image }} style={{ width: '100%', height: 130, backgroundColor: Theme.primaryColors.blue }}>
				<View style={[styles.row, { backgroundColor: color, width: '100%' }]}>
					<Title>{name}</Title>
					{/* <Text style={styles.text}>{name}</Text> */}
				</View>
			</ImageBackground>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.primaryColors.blue,
		height: 130,
		width: 328,
		justifyContent: 'center',
	},
	card: {
		justifyContent: 'center',
		alignSelf: 'center',
		marginVertical: 10,
		borderRadius: 20,
		overflow: 'hidden',
	},
	row: {
		paddingHorizontal: 15,
		paddingVertical: 20,
		marginBottom: 1,
		height: 200,
		width: width - 80,
		justifyContent: 'center',
		borderRadius: 12,
		marginVertical: 5,
	},
	text: {
		fontSize: 24,
		color: '#fff',
		fontWeight: '600',
		textAlign: 'center',
		position: 'relative',
		bottom: 0,
	},
});



