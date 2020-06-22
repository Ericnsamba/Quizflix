import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Theme from '../theme/Theme';

export const Button = ({ text, answerNum, onPress = () => { } }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <View style={styles.buttonStyle}>
      <View style={styles.answerNum}>
        <Text style={styles.answerNumsText}>{answerNum} </Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export const ButtonContainer = ({ children }) => (
  <View style={styles.buttonContainer}>{children}</View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.secondaryColors.white,
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
    marginTop: 20,
    alignItems: 'baseline',
    // borderColor: Theme.primaryColors.lightBlue,
    // borderWidth: 1,
  },
  text: {
    color: Theme.primaryColors.blue,
    fontSize: 20,
    textAlign: 'left',
    alignItems: 'baseline',
    paddingTop: 7,
    flexWrap: 'wrap',
    paddingRight: 10,
    width: 260,
  },
  answerNumsText: {
    color: Theme.secondaryColors.blue,
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  answerNum: {
    backgroundColor: Theme.primaryColors.blue,
    marginHorizontal: 10,
    height: 40,
    width: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    // marginTop: 20,
    justifyContent: 'space-between',
  },
});
