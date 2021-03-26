import {createSwitchNavigator} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ResetPassword from '../screens/ResetPassword';
import ButtonNavigation from './RootNavigation';
import ScoreHeader from '../components/ScoreHeader';
import Loading from './Loading';

const RootStack = createSwitchNavigator(
  {
    ButtonNavigation,
    Loading,
    HomeScreen,
    LoginScreen,
    SignUpScreen,
    WelcomeScreen,
    ResetPassword,
  },
  {
    initialRouteName: 'Loading',
  },
);
const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
