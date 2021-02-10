/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as Theme from '../theme/Theme';

// Screens
import ProfileScreen from '../screens/ProfileScreen';
import TopScoresScreen from '../screens/TopScoresScreen';
import InfoScreen from '../screens/InfoScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import {DrawerContent} from './DrawerContents';
import QuizHomeStack from './cardstack';

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
      headerShown: false,
      tabBarVisible: false,
    };
  },
};

const Drawer = createDrawerNavigator();
function ProfileDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        // drawer
        tabStyle: {
          paddingTop: 15,
          backgroundColor: Theme.primaryColors.lightBlue,
        },
        drawerIcon: ({focused, color, size, iconAnimation, iconIteration}) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            size = focused ? 24 : 24;
            iconAnimation = focused ? 'pulse' : 'rubberBand';
            iconIteration = focused ? 'infinite' : 1;
          } else if (route.name === 'Edit Profile') {
            iconName = focused ? 'create' : 'create-outline';
            size = focused ? 24 : 24;
            iconAnimation = focused ? 'pulse' : 'rubberBand';
          } else if (route.name === 'Information') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
            size = focused ? 24 : 24;
            iconAnimation = focused ? 'pulse' : 'rubberBand';
            iconIteration = focused ? 'infinite' : 1;
          }

          return (
            <Animatable.View
              animation={iconAnimation}
              iterationCount={iconIteration}
              delay={500}
              style={styles.icons}>
              <Icon
                name={iconName}
                size={size}
                color={color}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </Animatable.View>
          );
        },
        drawerStyle: {
          paddingTop: 90,
          backgroundColor: Theme.primaryColors.black,
          marginBottom: 80,
        },
      })}
      drawerContentOptions={{
        showLabel: false,
        activeTintColor: Theme.primaryColors.blue,
        inactiveTintColor: Theme.secondaryColors.blue,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Edit Profile" component={ProfileEditScreen} />
      <Drawer.Screen name="Information" component={InfoScreen} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

// export default (ButtonNavigation = () => {
const ButtonNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabStyle: {
            paddingTop: 15,
            backgroundColor: Theme.primaryColors.lightBlue,
          },
          tabBarIcon: ({
            focused,
            color,
            size,
            iconAnimation,
            iconIteration,
          }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              size = focused ? 40 : 34;
              iconAnimation = focused ? 'pulse' : 'rubberBand';
              iconIteration = focused ? 'infinite' : 1;
            } else if (route.name === 'Score') {
              iconName = focused ? 'trophy' : 'trophy-outline';
              size = focused ? 40 : 34;
              iconAnimation = focused ? 'pulse' : 'rubberBand';
              iconIteration = focused ? 'infinite' : 1;
            } else if (route.name === 'Info') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
              size = focused ? 40 : 34;
              iconAnimation = focused ? 'pulse' : 'rubberBand';
              iconIteration = focused ? 'infinite' : 1;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
              size = focused ? 40 : 34;
              iconAnimation = focused ? 'pulse' : 'rubberBand';
              iconIteration = focused ? 'infinite' : 1;
            }

            return (
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Animatable.View
                  animation={iconAnimation}
                  iterationCount={iconIteration}
                  delay={500}
                  style={styles.icons}>
                  <Icon
                    name={iconName}
                    size={size}
                    color={color}
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      bottom: -10,
                    }}
                  />
                </Animatable.View>
              </View>
            );
          },
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: Theme.primaryColors.blue,
          inactiveTintColor: Theme.secondaryColors.blue,
          style: {
            backgroundColor: Theme.primaryColors.white,
          },
        }}>
        <Tab.Screen name="Home" component={QuizHomeStack} />
        <Tab.Screen name="Score" component={TopScoresScreen} />
        <Tab.Screen name="Profile" component={ProfileDrawer} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
  },
  icons: {
    // top: 8,
    alignSelf: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  DrawerItem: {
    marginTop: '50%',
    // position: 'absolute',
    // bottom: 0
  },
});

export default ButtonNavigation;
