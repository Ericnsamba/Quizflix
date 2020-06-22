import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Theme from '../../theme/Theme';

export const Button = ({ text, onPress = () => { } }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <View style={styles.buttonStyle}>
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
);

// export const ButtonContainer = ({ children }) => (
//     <View style={styles.buttonContainer}>{children}</View>
// );

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        width: 214,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: Theme.primaryColors.blue,
        //ios   
        shadowColor: Theme.primaryColors.blue,
        shadowOpacity: 0.6,
        shadowRadius: 8,
        shadowOffset: {
            height: 5,
            width: 0
        },
        //android
        elevation: 1
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Theme.primaryColors.white,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        fontSize: 20,
    },

    buttonContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});


