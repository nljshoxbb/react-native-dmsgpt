import React, { Component, SFC } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    Platform,
    Animated
} from 'react-native';

interface Props {
    backgroundColor: string
    topBarOpacity?: number
    barStyle?: any
}


const MyStatusBar: SFC<Props> = ({ backgroundColor, topBarOpacity, ...props }) => {
    return (
        <Animated.View style={[styles.statusBar, { backgroundColor: backgroundColor, opacity: topBarOpacity, }]}>
            <StatusBar {...props} />
        </Animated.View>
    )
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 99,
    }
})

export default MyStatusBar;