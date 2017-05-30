import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
    Animated,
    RefreshControl,
    Platform,
    TextInput,
    Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyButton from '../../components/MyButton';
import MyLogin from '../../components/MyLogin';


class Purchase extends Component<any, any> {

    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            header: null
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingTop: 20, backgroundColor: 'rgba(113,172,55,1)' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.headWapper}>
                            <TextInput
                                placeholder="搜索关键词"
                                placeholderTextColor="rgba(113,172,55,1)"
                                style={styles.searchInput}
                            />
                            <View style={styles.searchIcon}>
                                <Ionicons name="ios-search" size={23} color="#fff" />
                            </View>
                        </View>

                        <View style={styles.headRight}>
                            <Ionicons name="ios-chatbubbles" size={25} color="#fff" />
                        </View>
                    </View>
                </View>

                <MyLogin {...this.props} />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    headWapper: {
        position: 'relative',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        height: 30,
    },
    searchInput: {
        height: 30,
        flex: 1,
        borderRadius: 16,
        backgroundColor: 'rgba(149,205,92,1)',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        color: '#fff'
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
        backgroundColor: 'rgba(149,205,92,1)',
        top: 3
    },
    headRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 15
    }
})



export default Purchase;