/* eslint-disable react-native/no-inline-styles */
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
import UserAvatar from 'react-native-user-avatar';
import LinearGradient from 'react-native-linear-gradient';
import * as Theme from '../theme/Theme';
import { Themed } from 'react-navigation';
const { width, height } = Dimensions.get('window');

export const LeaderBoardUsers = ({
	onPress = () => {},
	username,
	image,
	rankNumber,
	time,
	totalPoints,
}) => (
	<LinearGradient
		colors={[Theme.secondaryColors.pink, '#FF93AD']}
		// colors={['#F56BA5', Theme.primaryColors.pink]}
		style={{
			width: '100%',
			flexGrow: 1,
			flexDirection: 'row',
			marginVertical: 5,
			backgroundColor: Theme.secondaryColors.blue,
			height: 73,
			alignItems: 'center',
			borderRadius: 10,
		}}>
		<View
			style={{
				width: 60,
				height: 73,
				justifyContent: 'center',
				alignSelf: 'center',
			}}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: '800',
					textAlign: 'center',
					color: Theme.primaryColors.black,
				}}>
				{rankNumber}
			</Text>
		</View>

		<View style={{ width: 60 }}>
			{/* <Image
				source={require('../assets/images/profileAvatar.jpg')}
				style={{
					width: 44,
					height: 44,
					borderRadius: 30,
				}}
			/> */}
			<UserAvatar
				size={40}
				name={username}
				src={image ? image: null}
				bgColors={[
					Theme.primaryColors.pink,
					// Theme.secondaryColors.blue,
					Theme.primaryColors.orange,
					Theme.primaryColors.blue,
					Theme.primaryColors.black,
					// '#fafafa',
					// '#ccaabb',
				]}
				borderRadius={40}
				style={{
					width: 44,
					height: 44,
				}}
			/>
		</View>
		<View
			style={{
				paddingTop: 5,
				flexGrow: 1,
				marginLeft: 20,
				minWidth: 100,
			}}>
			<Text
				style={{
					fontSize: 16,
					textAlign: 'left',
					color: Theme.primaryColors.black,
					width: 100,
					left: -20,
				}}>
				{username}
			</Text>
		</View>
		<View
			style={{
				paddingTop: 5,
				flexGrow: 1,
				marginLeft: 20,
			}}>
			<Text
				style={{
					fontSize: 16,
					fontWeight: '600',
					textAlign: 'left',
					color: Theme.primaryColors.black,
				}}>
				{totalPoints} pts
			</Text>
		</View>
	</LinearGradient>
	// </TouchableOpacity>
);

// const styles = StyleSheet.create({
// 	container: {
// 		width: '100%',
// 		height: 60,
// 		borderBottomColor: Theme.primaryColors.gray,
// 		borderBottomWidth: StyleSheet.hairlineWidth,
// 		flexGrow: 1,
// 		flexDirection: 'row',
// 		marginVertical: 10,
// 	},
// 	rankNumber: {
// 		width: 60,
// 		justifyContent: 'center',
// 		top: -5
// 	},
// 	image: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 30
// 	},
// 	userInfo: {
// 		paddingTop: 5,
// 		flexGrow: 1,
// 		marginLeft: 20
// 	},
// 	row: {
// 		paddingHorizontal: 15,
// 		paddingVertical: 20,
// 		marginBottom: 1,
// 		height: 200,
// 		width: width - 80,
// 		justifyContent: 'center',
// 		borderRadius: 12,
// 		marginVertical: 5,
// 	},
// 	text: {
// 		fontSize: 24,
// 		color: '#fff',
// 		fontWeight: '600',
// 		textAlign: 'center',
// 		position: 'relative',
// 		bottom: 0,
// 	},
// });
