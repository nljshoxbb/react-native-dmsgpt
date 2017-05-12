import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Article extends Component {

    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            tabBarVisible: false,
            headerBackTitle: null,
            headerTintColor: '#fff',
            headerTitle:'详情',
            headerStyle: {
                position: 'absolute',
                height: 60,
                backgroundColor: 'rgba(113,172,55,1)',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                // opacity: state.params.opacity != 1 ? 0 : 1
            }
        })
    }

    render() {
        return (
            <View>
                <Text>Article</Text>
            </View>
        );
    }
}

export default Article;