/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Theme from '../theme/Theme';
import {Button} from '../components/UI/Button';
import KeyboardShift from '../components/KeyboardShift';
import Modal from 'react-native-modal';
import {
  watchPersonData,
  watchPointsData,
  watchUsersData,
  watchLeaderBoardData,
} from '../redux/AppRedux';
import ConvertAnonymousToUsers from '../components/ConvertAnonymousTousers';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const mapStateToProps = state => {
  return {
    pointsData: state.pointsData,
    personData: state.personData,
    usersData: state.usersData,
    leaderBoardData: state.leaderBoardData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchPersonData: () => {
      dispatch(watchPersonData());
    },
    watchPointsData: () => {
      dispatch(watchPointsData());
    },
    watchUsersData: () => {
      dispatch(watchUsersData());
    },
    watchLeaderBoardData: () => {
      dispatch(watchLeaderBoardData());
    },
  };
};

export class ProfileEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      imgSource: '',
      uploading: false,
      progress: 0,
      photoURL: '',
      displayName: '',
      email: '',
      password: '',
      errorMessage: null,
      phoneNumber: 0,
      isModalVisible: false,
    };
    this.props.watchPointsData();
    this.props.watchPersonData();
    this.props.watchLeaderBoardData();
    this.disabledUpload = this.disabledUpload.bind(this);
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    let images;
    AsyncStorage.getItem('images')
      .then(data => {
        images = JSON.parse(data) || [];
        this.setState({
          images: images,
          photoURL: currentUser.photoURL,
        });
      })
      .catch(error => {
        console.log(
          'error happened while trying to fetch data from local storage',
          error,
        );
      });
  }
  /**
   * Select image method
   */
  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        alert('And error occured: ', response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          imgSource: source,
          imageUri: response.uri,
        });
      }
    });
  };
  /**
   * Upload image method
   */
  uploadImage = () => {
    const {username, email, profileImage} = this.props.personData;
    let currentUser = firebase.auth().currentUser;
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${currentUser.uid}.${ext}`; // Generate unique name // Generate unique name
    this.setState({uploading: true});
    firebase
      .storage()
      .ref(`/userProfile/images/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const {bytesTransferred, totalBytes} = snapshot;
          let state = {};
          state = {
            ...state,
            progress: (bytesTransferred / totalBytes) * 100, // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            firebase
              .firestore()
              .collection('users')
              .doc(currentUser.uid)
              .update({
                profileImage: snapshot.downloadURL,
              })

              .then(() => {
                state = {
                  ...state,
                  uploading: false,
                  imageUri: '',
                  progress: 0,
                  photoURL: snapshot.downloadURL,
                  imgSource: '',
                };
                this.setState(state);
              })
              .catch(function(error) {
                console.log('error while uploading profile image ', error);
                alert('error while uploading profile image', error);
              });

            AsyncStorage.setItem(
              'images',
              JSON.stringify(snapshot.downloadURL),
            );
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.', error);
          console.log('Sorry, Try again.', error);
        },
      );
  };

  disabledUpload = () => {
    this.setState({
      imgSource: '',
    });
    if (this.state.progress === 100) {
      this.setState({
        imgSource: '',
      });
    }
  };

  /**
   * Update a user's profile eric.ryda+1@gmail.com
   */
  handleDisplayNameUpdate = NewName => {
    if (this.state.displayName != '') {
      const user = firebase.auth().currentUser;
      const {username, email, profileImage} = this.props.personData;
      const {displayName} = this.state;
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          username: displayName,
        })
        .then(function() {
          // Update successful.
          this.setState({username: ''});
          alert(`Well done \n \nYour new DisplayName: \n${displayName}`);
        })
        .catch(function(error) {
          // An error happened
        });
    } else {
      alert('Name can not be empty');
    }
  };

  updateEmail = newEmail => {
    const user = firebase.auth().currentUser;

    user
      .updateEmail(newEmail)
      .then(function() {
        // Update successful.
        this.setState({newEmail: ''});
      })
      .catch(function(error) {
        // "An error happened".
        alert('An error happened while updating email', error);
      });
  };

  UpdateDetails = () => {
    const {displayName, email} = this.state;
    if (displayName && displayName.length > 0) {
      this.handleDisplayNameUpdate(displayName);
    }
    if (email && email.length > 0) {
      this.updateEmail(email);
    }
  };

  SendPasswordReset = () => {
    const auth = firebase.auth().currentUser;
    const emailAddress = auth.email;

    firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(function() {})
      .catch(function(error) {
        // An error happened.
      });
  };

  _onRefresh = () => {
    this.setState({refreshing: true}, () => {
      //call a function
      const refreshUser = firebase.auth().currentUser;
      refreshUser.reload().then(() => {
        const refreshUser = firebase.auth().currentUser;
        this.setState({
          refreshing: false,
          photoURL: refreshUser.photoURL,
        });
      });
    });
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    const {uploading, imgSource, progress, images, isModalVisible} = this.state;
    const {username, email, profileImage} = this.props.personData;
    const avatar = require('../assets/images/profileAvatar.jpg');
    const cantAccessPage = require('../assets/images/cantAccessPage.png');

    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
    let currentUser = firebase.auth().currentUser;

    return (
      <>
        {currentUser.isAnonymous === true ? (
          <SafeAreaView style={styles.container}>
            <View style={styles.openDrawer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color={Theme.primaryColors.black}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.headerSection}>
              <Text style={[Theme.title, {fontSize: 32}]}>
                Hi Anonymous!
              </Text>
              <Text style={[Theme.paragraph]}>
                Create a Profile to access this page
              </Text>
            </View>

            <View style={styles.innerContainer}>
              <View style={styles.cantAccessPageImg}>
                <Image
                  source={cantAccessPage}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
            </View>
            <Modal isVisible={isModalVisible}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{zIndex: 10, marginVertical: 20}}
                  title="Hide modal"
                  onPress={this.toggleModal}>
                  <Ionicons
                    name="close"
                    size={40}
                    style={styles.buttonIcon}
                  />
                </TouchableOpacity>
                <ConvertAnonymousToUsers />
              </View>
            </Modal>
            <View style={styles.createProfileButton}>
              <Button
                onPress={this.toggleModal}
                text="create profile"
                style={styles.createProfileButton}
              />
            </View>
          </SafeAreaView>
        ) : (
          <KeyboardShift style={{marginBottom: 20}}>
            {() => (
              <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                  {/** Display image */}
                  <View style={styles.openDrawer}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.openDrawer()}>
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color={Theme.primaryColors.black}
                      />
                    </TouchableOpacity>
                  </View>

                  {imgSource !== '' && (
                    <View>
                      <TouchableOpacity
                        style={{
                          borderRadius: 12,
                          marginBottom: 5,
                          marginLeft: 5,
                          width: 160,
                          paddingVertical: 15,
                          paddingHorizontal: 20,
                          backgroundColor: Theme.secondaryColors.pink,
                        }}
                        onPress={this.disabledUpload}
                        disabled={uploading}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Theme.primaryColors.pink,
                            fontFamily: Theme.fontFamily.medium,
                            textAlign: 'center',
                          }}>
                          Cancel Upload
                        </Text>
                      </TouchableOpacity>
                      <Image
                        source={imgSource}
                        style={styles.imagePicker}
                      />

                      {uploading && (
                        <View style={styles.progressBarContainer}>
                          <View
                            style={[
                              styles.progressBar,
                              {
                                width: `${progress}%`,
                                zIndex: 5,
                                marginRight: 300,
                              },
                            ]}
                          />
                          <View
                            style={[
                              styles.progressBar,
                              {
                                width: width - 20,
                                backgroundColor: Theme.secondaryColors.blue,
                                position: 'absolute',
                                top: 8,
                                alignSelf: 'center',
                              },
                            ]}
                          />
                        </View>
                      )}
                      <View style={{marginBottom: 200}}>
                        <TouchableOpacity
                          style={actionBtnStyles}
                          onPress={this.uploadImage}
                          disabled={uploading}>
                          {uploading ? (
                            <Text style={styles.btnTxt}>Uploading...</Text>
                          ) : (
                            <Text style={styles.btnTxt}>Upload image</Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <View style={styles.profileImage}>
                      {this.state.photoURL ? (
                        <View>
                          <FastImage
                            source={
                              profileImage
                                ? {
                                    uri: profileImage,
                                    priority: FastImage.priority.high,
                                  }
                                : avatar
                            }
                            style={[
                              styles.image,
                              {
                                zIndex: 99,
                              },
                            ]}
                          />
                        </View>
                      ) : (
                        <Text
                          style={{
                            fontSize: 16,
                            paddingTop: 0,
                            textAlign: 'center',
                            fontFamily: 'HelveticaNeue',
                            fontWeight: '300',
                          }}>
                          Select an Image!
                        </Text>
                      )}
                    </View>
                    <View style={styles.add}>
                      <TouchableOpacity
                        style={styles.buttonPickImage}
                        onPress={this.pickImage}>
                        <Ionicons
                          name="ios-add"
                          size={48}
                          color="#DFD8C8"
                          style={{
                            marginTop: 6,
                            marginLeft: 2,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={[styles.text, {fontSize: 36}]}>
                      {username}
                    </Text>
                    <Text style={[styles.text]}>
                      {currentUser && currentUser.email}
                    </Text>
                    <View
                      style={{
                        marginVertical: 10,
                      }}
                    />
                  </View>

                  <View style={styles.form}>
                    <View style={styles.errorMessage}>
                      {this.state.errorMessage && (
                        <Text style={styles.error}>
                          {this.state.errorMessage}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                      }}>
                      <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Update Username"
                        placeholderTextColor={Theme.secondaryColors.black}
                        onChangeText={displayName =>
                          this.setState({
                            displayName,
                          })
                        }
                        value={this.state.displayName}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                      }}>
                      <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Update Email Address"
                        placeholderTextColor={Theme.secondaryColors.black}
                        onChangeText={email =>
                          this.setState({
                            email,
                          })
                        }
                        value={this.state.email}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={this.UpdateDetails}
                    style={styles.buttonContainer}>
                    <LinearGradient
                      colors={['#4569e1', Theme.primaryColors.blue]}
                      style={styles.LinearGradientButton}>
                      <Text style={[Theme.title, styles.buttonTitle]}>
                        Update Details
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.errorMessage}>
                  {this.state.errorMessage && (
                    <Text style={styles.error}>
                      {this.state.errorMessage}
                    </Text>
                  )}
                </View>
              </SafeAreaView>
            )}
          </KeyboardShift>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primaryColors.white,
    marginTop: 20,
  },
  headerSection: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Theme.primaryColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createProfileButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 40,
  },
  buttonPickImage: {
    alignItems: 'center',
  },
  cantAccessPageImg: {
    top: -60,
    width: 322,
    height: 273.13,
  },
  buttonContainer: {
    borderRadius: 12,
    width: width - 60,
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.secondaryColors.pink,
  },
  LinearGradientButton: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Theme.primaryColors.blue2,
    width: '100%',
    height: '100%',
  },
  buttonTitle: {
    color: Theme.primaryColors.white,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 22,
    textAlignVertical: 'auto',
  },
  add: {
    backgroundColor: Theme.primaryColors.black,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: Theme.secondaryColors.blue,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: Theme.primaryColors.gray,
  },
  btnTxt: {
    color: Theme.primaryColors.blue,
    fontFamily: Theme.fontFamily.medium,
  },
  imagePicker: {
    resizeMode: 'cover',
    position: 'relative',
    width: width - 10,
    height: 380,
    zIndex: 10,
    backgroundColor: Theme.secondaryColors.blue,
    alignSelf: 'center',
  },
  image: {
    width: 180,
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: Theme.primaryColors.lightBlue,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: Theme.primaryColors.lightBlue,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBarContainer: {
    backgroundColor: Theme.secondaryColors.gray,
    // height: 15,
    left: 5,
    right: 5,
    overflow: 'hidden',
    width: width - 10,
    paddingVertical: 8,
    bottom: 30,
    zIndex: 99,
    // top: ,
  },
  progressBar: {
    backgroundColor: Theme.primaryColors.blue,
    height: 15,
    // left: 5,
    // right: 25,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  progressBar2: {
    height: 20,

    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  form: {
    marginBottom: 30,
    marginHorizontal: 30,
    // top: -80,
  },
  inputTitle: {
    color: Theme.primaryColors.blue,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: Theme.primaryColors.blue,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: Theme.primaryColors.black,
    backgroundColor: Theme.secondaryColors.blue,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: Theme.primaryColors.blue,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: Theme.primaryColors.pink,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledBtn: {
    backgroundColor: Theme.secondaryColors.orange,
  },
  shadow: {
    shadowColor: Theme.primaryColors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  openDrawer: {
    // backgroundColor: Theme.secondaryColors.blue,
    width: width,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileEditScreen);
