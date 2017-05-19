import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    ListView,
    Animated,
    StatusBar,
    StyleSheet,
    RefreshControl,
    Dimensions,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { observable, useStrict, toJS } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CachedImage } from "react-native-img-cache";
import { styles } from './styles';

import MyStatusBar from '../../components/MyStatusBar';
import Banner from '../../components/Banner';

const DEVICE_WIDTH = Dimensions.get("window").width;

const ip5 = (Platform.OS === 'ios' && DEVICE_WIDTH == 640) ? true : false;

type _animateValue = null;
type _animateOpacity = null;

@observer(['fruitlistStore', 'goodsStore'])
class FruitList extends Component<any, any> {

    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            headerBackTitle: null,
            headerTintColor: '#fff',
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(113,172,55,1)',
                top: 0,
                left: 0,
                right: 0,
                // height: !state.params ? 0 : state.params.animatedValue,
                // overflow: 'hidden',
                height: 60,
                opacity: !state.params ? 0 : state.params.animateOpacity,
            },

        })
    }
    _animateValue = new Animated.Value(0);
    _animateOpacity = new Animated.Value(0);
    _box = null;
    constructor(props: any) {
        super(props);
        this.state = {
            scrollY: []
        }
    }

    componentDidMount() {
        this.props.fruitlistStore.getFruitList();
    }


    componentWillMount() {
        const HEADER_MAX_HEIGHT = 60;
        const HEADER_MIN_HEIGHT = 0;
        const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

        this.props.navigation.setParams({
            animateOpacity: this._animateOpacity.interpolate({
                inputRange: [0, 160],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            })
        })
    }


    _renderRow(rowData: any, context: any) {

        // + '?imageView2/2/w/130/h/130/interlace/1' 

        let animated = new Animated.Value(0);
        let opacitytranslate = new Animated.Value(0);
        const width = ip5 ? 140 : 160;
        const translateHeight = width - 15;

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

    _renderSectionHeader = (sectionData: string, sectionID: string) => {
        return (
            <View style={{ paddingTop: 60, }}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', flex: 1 }}>
                    <View style={[contentStyles.sectionHeaderBox]}>
                        <Text style={{ paddingRight: 5 }}>不限分类</Text>
                        <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                    </View>
                    <View style={[contentStyles.sectionHeaderBox]}>
                        <Text style={{ paddingRight: 5 }}>不限产地</Text>
                        <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                    </View>
                    <View style={[contentStyles.sectionHeaderBox]}>
                        <Text style={{ paddingRight: 5 }}>十大推荐</Text>
                        <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        <Ionicons name="md-apps" size={28} color="#cccccc" />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { goodsStore, fruitlistStore } = this.props;
        const goodProps = toJS(goodsStore);
        return (
            <ListView
                dataSource={fruitlistStore.fruitList}
                renderRow={(val) => this._renderRow(val, this)}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this._animateOpacity } } }])}
                contentContainerStyle={contentStyles.list}
                renderHeader={() => (
                    <Banner goodsStore={goodProps} />

                )}
                initialListSize={10}
                pageSize={4}
                // scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={goodsStore.refreshing}
                        onRefresh={() => goodsStore.onRefresh()}
                    />}
            >
            </ListView >


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
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',

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
})

export default FruitList;
