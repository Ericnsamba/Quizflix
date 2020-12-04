/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import * as Theme from '../theme/Theme';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as Theme from '../assets/audio/game/tick_tock.mp3';
// import Sound from 'react-native-sound';

// Import the react-native-sound module
var Sound = require('react-native-sound');


const { width, height } = Dimensions.get('window');

export default class InfoScreen extends React.Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     isAnonymous: firebase.auth().currentUser
                       ._user.isAnonymous,
                     user: {},
                     Categories: 0,
                   };
                 }

                 render() {
                   const userID = firebase.auth().currentUser
                     .uid;
                //    const {
                //      username,
                //      email,
                //      profileImage,
                //    } = this.props.personData;
                   const avatar = require('../assets/images/profileAvatar.jpg');
                   return (
                     <SafeAreaView style={styles.container}>
                       <StatusBar barStyle="dark-content" />
                       <View style={styles.logout}>
                         <TouchableOpacity
                           onPress={() =>
                             this.props.navigation.openDrawer()
                           }>
                           <Ionicons
                             name="ellipsis-vertical"
                             size={24}
                             color={Theme.primaryColors.black}
                           />
                         </TouchableOpacity>
                       </View>
                       <View style={{alignItems: 'center'}}>
                         <View style={styles.avatarContainer}>
                           {/* <FastImage
                             resizeMode={'cover'}
                             source={
                               profileImage
                                 ? {
                                     uri: profileImage,
                                     priority:
                                       FastImage.priority.high,
                                   }
                                 : avatar
                             }
                             style={styles.avatar}
                           /> */}
                         </View>
                         <View style={styles.userNameView}>
                           <Text style={styles.userName}>
                             {/* {username} */}
                           </Text>
                           <Text style={styles._email}>
                             {/* {email} */}
                           </Text>
                         </View>
                       </View>
                       <View style={styles.statsContainer}>
                         <View style={styles.stat}>
                           <Text style={styles.statAmount}>
                             {/* {this.renderPoints()} */}
                           </Text>
                           <Text style={styles.statTitle}>
                             Points
                           </Text>
                         </View>
                         <View style={styles.stat}>
                           <Text style={styles.statAmount}>
                             {/* {this.renderCategoryCount()} */}
                           </Text>
                           <Text style={styles.statTitle}>
                             Categories
                           </Text>
                         </View>
                         <View style={styles.stat}>
                           <Text style={styles.statAmount}>
                             {/* {userRanking + 1} */}
                           </Text>
                           <Text style={styles.statTitle}>
                             Rank
                           </Text>
                         </View>
                       </View>

                       <LinearGradient
                         colors={[
						   Theme.primaryColors.white
						   ,
						   Theme.primaryColors.white
						   ,
                         ]}
                         style={styles.innerContainer}>
                         <View>
                           <View style={styles.quizzesPlayed}>
                             <Text
                               style={styles.quizzesPlayedTitle}>
                               Quizzes Played
                             </Text>
                           </View>

                           <ScrollView
                             contentOffset={{x: -20, y: 0}}
                             bouncesZoom={true}
                             horizontal={true}
                             showsHorizontalScrollIndicator={
                               false
                             }
                             style={styles.scrollView} />
                         </View>
                       </LinearGradient>
                     </SafeAreaView>
                   );
                 }
               }

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: Theme.primaryColors.orange,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Theme.primaryColors.blue,
  },
  profile: {
    alignItems: 'center',
  },
  scrollView: {
    marginLeft: 1,
  },
  avatarContainer: {
    borderColor: Theme.primaryColors.blue,
    borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: 116,
    height: 116,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  userNameView: {
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 60,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 5,
    color: Theme.primaryColors.blue,
  },
  _email: {
    fontSize: 14,
    color: '#939393',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    color: Theme.primaryColors.blue,
    fontSize: 18,
    fontWeight: '300',
  },
  statTitle: {
    color: Theme.primaryColors.black,
    fontSize: 12,
    fontWeight: Theme.fontWeight.medium,
    marginTop: 4,
  },
  ScoresInCategory: {
    marginHorizontal: 10,
  },
  quizzesPlayed: {
    width: width - 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  quizzesPlayedTitle: {
    textAlign: 'left',
    fontSize: 20,
    color: Theme.primaryColors.white,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logout: {
    // backgroundColor: Theme.secondaryColors.blue,
    width: width,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
