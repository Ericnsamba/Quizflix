/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import { StyleSheet } from 'react-native';
import iPhoneSize from '../../helpers/iPhoneSizes';
import * as Theme from '../../theme/Theme';

let headingTextSize = 30;
if (iPhoneSize() === 'small') {
	headingTextSize = 26;
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flex: 1,
	},
	scrollViewWrapper: {
		marginTop: 70,
		flex: 1,
		padding: 0,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	scrollView: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 20,
		flex: 1,
	},
	loginHeader: {
		fontSize: headingTextSize,
		// color: colors.white,
		fontWeight: '300',
		marginBottom: 40,
	},
	notificationWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	container: {
		flex: 1,
		backgroundColor: Theme.primaryColors.white,
		justifyContent: 'center',
		backgroundColor: Theme.primaryColors.lightBlue
		// backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	greeting: {
		marginTop: -32,
		fontSize: 24,
		fontWeight: '500',
		textAlign: 'center',
	},
	form: {
		marginBottom: 30,
		marginHorizontal: 30,
	},
	inputTitle: {
		color: Theme.primaryColors.b,
		fontSize: 10,
		textTransform: 'uppercase',
	},
	input: {
		borderBottomColor: Theme.primaryColors.black,
		borderBottomWidth: StyleSheet.hairlineWidth,
		height: 40,
		fontSize: 15,
		color: Theme.primaryColors.white,
	},
	button: {
		marginHorizontal: 30,
		backgroundColor: Theme.primaryColors.white,
		borderRadius: 4,
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorMessage: {
		height: 72,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	error: {
		color: 'tomato',
		fontSize: 13,
		fontWeight: '600',
		textAlign: 'center',
	},
});

export default styles;
