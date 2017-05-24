import React, { Component, SFC } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';

interface Props {
    title?: string | 'title',
    onPress?: (x?: any) => void;
}

const MyButton: SFC<Props> = ({
    title,
    onPress
}) => {

    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={'transparent'}
        >
            <View style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 44,
        width: 147,
        backgroundColor: 'rgba(113,172,55,1)',
        borderRadius: 50,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:20
    },
    text: {
        color: '#fff',
        fontSize: 18
    }
})

export default MyButton;