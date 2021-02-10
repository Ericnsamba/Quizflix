import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import * as Theme from '../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export const SocialLoginButton = ({
  title,
  iconName,
  buttonColor,
  onPress = () => {},
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, buttonColor]}>
    <View style={styles.buttonStyle}>
      <Icon
        name={iconName}
        size={26}
        // color={Theme.primaryColors.blue}
        style={styles.icon}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: width - 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.secondaryColors.black,
    // backgroundColor: Theme.primaryColors.white,
    marginTop: 15,
  },
  buttonStyle: {
    height: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 60,
  },
});
