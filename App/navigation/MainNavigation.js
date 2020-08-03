import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

import Root from './RootNavigation';
import Loading from './Loading';

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });

const RootStack = createSwitchNavigator(
	{
		Root,
		Loading,
		HomeScreen,
		LoginScreen,
		SignUpScreen,
		WelcomeScreen,
	},
	{
		initialRouteName: 'Loading',
	},
);
const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
