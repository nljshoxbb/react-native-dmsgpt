import Swiper from 'react-native-swiper';
import React, { Component, SFC } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    ScrollView,
    Animated,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { CachedImage, ImageCache } from "react-native-img-cache";
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Props {
    fruitList: any,
    dispatch: any
}

import theme from '../../style/theme/default.js';
import { styles } from './styles';
const DEVICE_WIDTH = Dimensions.get("window").width;
const ip5 = (Platform.OS === 'ios' && DEVICE_WIDTH == 640) ? true : false;
const SelecItem: SFC<Props> = ({
    fruitList,
    dispatch
}) => {
    return (
        <View style={{ backgroundColor: '#fff', flexDirection: 'row', flex: 1 }}>
            <View style={[contentStyles.sectionHeaderBox]}>
                <Text style={{ paddingRight: 5 }}>不限分类</Text>
                <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
            </View>
            <View style={[contentStyles.sectionHeaderBox]}>
                <Text style={{ paddingRight: 5 }}>{fruitList.nation.name ? fruitList.nation.name : "不限产地"}</Text>
                <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
            </View>
            <View style={[contentStyles.sectionHeaderBox]}>
                <Text style={{ paddingRight: 5 }}>十大推荐</Text>
                <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
            </View>
            <TouchableWithoutFeedback onPress={() => dispatch({ type: 'changeListType' })}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 10, width: 50, paddingRight: 10 }}>
                    {fruitList.listType ? <Ionicons name="md-apps" size={28} color="#cccccc" /> : <Ionicons name="ios-list" size={28} color="#cccccc" />}
                </View>
            </TouchableWithoutFeedback>
        </View>
    )


}


const contentStyles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 60,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    sectionHeaderBox: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    row: {
        justifyContent: 'center',
        // padding: 5,
        // margin: 3,
        padding: 10,
        width: DEVICE_WIDTH * 0.5,
        // height: 200,
        backgroundColor: '#fff',
        // alignItems: 'center',
        borderColor: '#f6f6f6',
        borderWidth: 2,
        position: 'relative',
    },
    row2: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#f6f6f6',
        borderWidth: 2,
        position: 'relative',
    }
})
export default SelecItem;

