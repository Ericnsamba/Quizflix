import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createStackNavigator} from '@react-navigation/stack';
// Screens
import HomeScreen from '../screens/HomeScreen';
import QuizIndex from '../screens/QuizIndex';
import Score from '../components/Score';
import Quiz from '../screens/Quiz';
import ScoreHeader from '../components/ScoreHeader';
import ProfileScreen from '../screens/ProfileScreen';

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
const Stack = createStackNavigator();
const QuizHomeStack = ({navigation, route}) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="QuizIndex" component={QuizIndex} />
      <Stack.Screen name="Quiz" component={Quiz} options={() => options} />
      <Stack.Screen name="Score" component={Score} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default QuizHomeStack;
