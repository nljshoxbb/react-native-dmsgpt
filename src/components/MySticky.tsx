import React, { Component, SFC } from 'react';
import {
    Animated,
    View,
    Platform
} from 'react-native';

interface Props {
    scrollY: any,
    inputRange?: Array<number>,
    outputRange?: Array<number>,
    style?: any
}

const MySticky: SFC<Props> = ({
    scrollY,
    children,
    inputRange,
    outputRange,
    style
 }) => {
    const inRange = inputRange ? inputRange : [120, 120.1];
    const outRange = outputRange ? outputRange : [0, 40];
    const componentStyle = {
        left: 0,
        right: 0,
        zIndex: 1,
        top: 60,
        borderColor: '#f6f6f6',
        position: 'absolute',
        backgroundColor:'#fff',
        ...style,
    }

    const heightTranslate = scrollY.interpolate({
        inputRange: inRange,
        outputRange: outRange,
        extrapolate: 'clamp',
    });
    const borderBottomWidthTranslate = scrollY.interpolate({
        inputRange: [120, 121],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View style={[
            componentStyle,
            {
                borderBottomWidth: borderBottomWidthTranslate,
                height: heightTranslate
            }]} >
            {children}
        </Animated.View>
    )
}


export default MySticky;