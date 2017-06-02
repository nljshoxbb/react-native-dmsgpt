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
    context: any,
    ip5: any,
    rowData: any
}

import theme from '../../style/theme/default.js';
import { styles } from './styles';
const DEVICE_WIDTH = Dimensions.get("window").width;
const ip5 = (Platform.OS === 'ios' && DEVICE_WIDTH == 640) ? true : false;
const RowItems: SFC<Props> = ({
    context,
    rowData
}) => {

    const { listType } = context.props.fruitList;
    let animated = new Animated.Value(0);
    let opacitytranslate = new Animated.Value(0);
    const width = ip5 ? 140 : 160;
    const translateHeight = width - 15;
   
    if (listType) {
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={() => context.props.navigation.navigate('Article', { id: rowData.id })}>
                    <View style={contentStyles.row2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <CachedImage
                                style={{ height: 100, width: 100 }}
                                source={{ uri: rowData.listpic + `?imageView2/2/w/${width * 3}/h/${translateHeight * 3}/interlace/1` }}
                            />
                        </View>

                        <View style={{ paddingLeft: 20, flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                            <Text style={{ color: '#666666' }}>{rowData.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 13, color: '#00b6f6' }}>{rowData.producing}</Text>
                                <Text style={{ fontSize: 12, color: '#999999', paddingLeft: 20 }}>产季：{rowData.season}</Text>
                            </View>
                            <Text style={{ fontSize: 12, color: '#999999' }}>保鲜期限：{rowData.refreshing}天</Text>
                            <Text style={{ fontSize: 12, color: '#71ac37' }}>热卖时间{rowData.hot_sale_k}~{rowData.hot_sale_j}月</Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    Animated.timing(
                                        animated,
                                        {
                                            toValue: -translateHeight,
                                            duration: 200,
                                        },
                                    ).start()

                                    Animated.timing(
                                        opacitytranslate,
                                        {
                                            toValue: 1,
                                            duration: 200,
                                        },

                                    ).start()
                                }}
                            >
                                <Ionicons
                                    name="ios-more"
                                    size={26}
                                    color="#999999"
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <Animated.View
                            useNativeDriver
                            style={[{ position: 'absolute', left: 0, right: 0, bottom: -translateHeight, height: translateHeight }, { opacity: opacitytranslate, transform: [{ translateY: animated, }] }]}>
                            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgba(113,172,55,0.9)' }}><Text style={{ color: '#fff' }}>查看详情</Text></View>
                            <View style={{ padding: 10, backgroundColor: 'rgba(240,240,240,0.9)', flex: 1 }}><Text style={{ fontSize: 14, lineHeight: 17, color: '#666666' }}>{rowData.intro.slice(0, 35)}</Text></View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback >
            </View>

        )
    } else {
        return (
            <TouchableWithoutFeedback
                onPress={() => context.props.navigation.navigate('Article', { id: rowData.id })}>
                <View style={contentStyles.row}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <CachedImage
                            style={{ height: translateHeight, width: width }}
                            source={{ uri: rowData.listpic + `?imageView2/2/w/${width * 3}/h/${translateHeight * 3}/interlace/1` }}
                        />
                    </View>

                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: '#666666' }}>{rowData.title}</Text>
                        <View style={{ paddingTop: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#999999' }}>产季：{rowData.season}</Text>
                            <Text style={{ fontSize: 13, color: '#00b6f6' }}>{rowData.producing}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#71ac37' }}>热卖时间{rowData.hot_sale_k}~{rowData.hot_sale_j}月</Text>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    Animated.timing(
                                        animated,
                                        {
                                            toValue: -translateHeight,
                                            duration: 200,
                                        },
                                    ).start()

                                    Animated.timing(
                                        opacitytranslate,
                                        {
                                            toValue: 1,
                                            duration: 200,
                                        },

                                    ).start()
                                }}
                            >
                                <Ionicons
                                    name="ios-more"
                                    size={26}
                                    color="#999999"
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <Animated.View
                        useNativeDriver
                        style={[{ position: 'absolute', left: 0, right: 0, bottom: -translateHeight, height: translateHeight }, { opacity: opacitytranslate, transform: [{ translateY: animated, }] }]}>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgba(113,172,55,0.9)' }}><Text style={{ color: '#fff' }}>查看详情</Text></View>
                        <View style={{ padding: 10, backgroundColor: 'rgba(240,240,240,0.9)', flex: 1 }}><Text style={{ fontSize: 14, lineHeight: 17, color: '#666666' }}>{rowData.intro.slice(0, 35)}</Text></View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback >
        )
    }
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
export default RowItems;

