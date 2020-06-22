import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
const { height } = Dimensions.get('window');

export default class ScoreTrophy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.safearea}>

                <View style={styles.container}>
                    <LottieView source={require('../../assets/Animated/CorrectTick.json')} autoPlay loop />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    Animation: {
        alignSelf: 'center',
        width: 300,
        height: 300
    }
});
