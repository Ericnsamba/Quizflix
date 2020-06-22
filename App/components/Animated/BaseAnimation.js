import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";
export default class BaseAnimation extends React.Component {
    componentDidMount() {
        this.animation.play();
    }
    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };
    render() {
        return (

            <LottieView
                ref={animation => {
                    this.animation = animation;
                }}
                style={this.props.customStyle}
                source={this.props.AnimatedFile}
            />

        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
