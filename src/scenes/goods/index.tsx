import React, { Component, PropTypes } from 'react';
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
    Platform
} from 'react-native';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import Button from 'antd-mobile/lib/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { CachedImage, ImageCache } from "react-native-img-cache";
import Swiper from 'react-native-swiper';
import { observable, useStrict, toJS } from 'mobx';
import { Provider, observer } from 'mobx-react';

import MyStatusBar from '../../components/MyStatusBar';
import Banner from '../../components/Banner';

import { commonStyles } from '../style';
import { styles } from './styles';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

//横向滑动
const RowItem = ({ rowData, navigation }: { rowData?: any, navigation: any }) => {
    const observer = (path: string) => {
        console.log(`path of the image in the cache: ${path}`);
    };
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Article', { id: rowData.id })}>
            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center', padding: 5 }}  >
                <CachedImage
                    resizeMode="cover"
                    style={{ height: 70, width: 70 }}
                    source={{ uri: rowData.listpic + '?imageView2/2/w/150/h/150/interlace/1' }}
                />
                <Text style={{ padding: 10 }}>{rowData.title}</Text>
                <Text style={[commonStyles.grayColor, { fontSize: 12 }]}>{rowData.intro.length > 10 ? rowData.intro.slice(0, 10) : rowData.intro}...</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

// 
const CircleItems = ({ navigation }: { navigation?: any }) => {
    return (
        <View style={styles.circleWrap}>
            <View style={styles.circleBox}>
                <View style={[styles.circle]}>
                    <Image source={require('../../../assets/shop-car3x.png')} style={{ height: 50, width: 50 }}></Image>
                </View>
                <Text style={{ fontSize: 12 }}>采购入口</Text>
            </View>
            <View style={styles.circleBox}>
                <View style={[styles.circle]}>
                    <Image source={require('../../../assets/pre3x.png')} style={{ height: 50, width: 50 }}></Image>
                </View>
                <Text style={{ fontSize: 12 }}>预定专区</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('FruitList')}>
                <View style={styles.circleBox} >
                    <View style={[styles.circle]}>
                        <Image source={require('../../../assets/fru3x.png')} style={{ height: 50, width: 50 }}></Image>
                    </View>
                    <Text style={{ fontSize: 12 }}>大观园</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.circleBox}>
                <View style={[styles.circle]}>
                    <Image source={require('../../../assets/advice3x.png')} style={{ height: 50, width: 50 }}></Image>
                </View>
                <Text style={{ fontSize: 12 }}>我建议</Text>
            </View>
        </View>
    )
}

const CountryItems = ({ goodsStore, navigation }: { navigation: any, goodsStore: any }) => {
    const { countryList, nationalList } = goodsStore;

    let countryArr = [
        {
            titleEn: "Malaysia",
            titleCn: "马来西亚",
            desc: '一年四季都可以吃到各式各样的热带水果',
            img: require(`../../../assets/Malaysia1.jpg`),
            fruitArr: [],
            nation_id: ''

        },
        {
            titleEn: "Thailand",
            titleCn: "泰国",
            desc: '“水果王国”果实天然新鲜种类繁多',
            img: require(`../../../assets/Thailand1.jpg`),
            fruitArr: [],
            nation_id: ''
        },
        {
            titleEn: "Vietnam",
            titleCn: "越南",
            desc: '温暖湿润的天气成就了水果中的“优质生”',
            img: require(`../../../assets/Vietnam1.jpg`),
            fruitArr: [],
            nation_id: ''
        }
    ];

    if (countryList.length != 0) {
        countryList.forEach((item: any, idx: number) => {
            if (!item) {
                item = [];
            }
            if (countryArr[idx]) {
                countryArr[idx].fruitArr = item;

            };
        })

    }

    return (
        <View>
            {countryArr.map((itemData: any, idx) => {
                nationalList.forEach((obj: any, ) => {
                    if (obj.name == itemData.titleCn) {
                        itemData.nation_id = obj.id;
                    }
                })
                return (
                    <View style={{ position: 'relative' }} key={idx}>
                        <CachedImage
                            style={{ height: 242, width: null }}
                            source={itemData.img}
                            resizeMode='cover'
                        />
                        <View style={styles.countryTextBox}>
                            <Text style={[styles.countryText, { fontSize: 14 }]}>{itemData.titleEn}</Text>
                            <Text style={[styles.countryText, { fontSize: 21, fontWeight: "800" }]}>{itemData.titleCn}</Text>
                            <Text style={[styles.countryText, { fontSize: 16 }]}>{itemData.desc}</Text>
                        </View>
                        <View style={styles.countryImageBox} >
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            >
                                {
                                    itemData.fruitArr.map((rowData: any) => {
                                        return (
                                            <RowItem key={rowData.id} rowData={rowData} navigation={navigation} />
                                        )
                                    })
                                }

                            </ScrollView>
                        </View>

                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate('FruitList', { nation_id: itemData.nation_id, nation_name: itemData.titleCn });
                        }}>
                            <View style={styles.countryBottomTitle}>
                                <Text style={[{ fontSize: 16, color: '#999999' }]}>查看更多</Text>
                                <Ionicons name="ios-arrow-dropright" size={25} color="#cccccc" />
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                )
            })}
        </View>
    )


}

const BottomItems = ({ width }: { width?: any }) => {
    const bottomArray = [
        { img: require('../../../assets/bottom1.png'), title: "东盟原产地直购", subTitle: '100% 原产地直购保证' },
        { img: require('../../../assets/bottom2.png'), title: "会员权益", subTitle: '会员升级 尊享特权' },
        { img: require('../../../assets/bottom3.png'), title: "极速送达", subTitle: '专属物流 全程把控' }
    ];
    return (
        <View style={styles.bottomWrap}>
            {bottomArray.map((item: any, idx: number) => (
                <View style={styles.bottomBox} key={idx}>
                    <Image
                        style={styles.bottomImage}
                        source={item.img}
                    />

                    <Text style={styles.bottomTitle}>{item.title}</Text>
                    {width == 320 ? <Text /> : <Text style={styles.bottomText}>{item.subTitle}</Text>}
                </View>
            ))}
        </View>
    )
}

const NewItems = ({ goodsStore, navigation }: { navigation: any, goodsStore: any }) => {
    const _rendNews = () => {
        return goodsStore.scrollList.map((rowData: any, idx: number | string) => {
            let title = rowData.title.length > 15 ? rowData.title.slice(0, 15) : rowData.title;
            return (
                <TouchableWithoutFeedback
                    key={rowData.id}
                    onPress={() => navigation.navigate('Article', { name: 'Article', id: rowData.id })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <View style={styles.yellowDot}></View>
                        <Text key={rowData.id} style={styles.scrollText}>{title}...</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }
    return (
        <View style={styles.scrollWrap}>
            <Text style={{ color: '#51b3f0', fontSize: 21, fontWeight: '800', paddingRight: 20 }}>新鲜事</Text>
            <View style={{ flex: 1, }}>
                <Swiper
                    horizontal={false}
                    autoplay
                    height={16}
                    showsPagination={false}
                >{_rendNews()}</Swiper>
            </View>
        </View>
    )
}

const HotsalItems = ({ goodsStore, navigation }: { navigation: any, goodsStore: any }) => {
    return (
        <View style={styles.hotSale}>
            <View style={styles.hotSaletitle}>
                <View style={styles.titleDot}></View>
                <Text style={{ fontSize: 16 }}>热卖推荐</Text>
                <View style={styles.titleDot}></View>
            </View>
            <View >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {goodsStore.recommendList.map((rowData: any) => (<RowItem key={rowData.id} rowData={rowData} navigation={navigation} />))}
                </ScrollView>
            </View>
        </View>
    )
}


@observer(['goodsStore'])
class GoodsIndexScreen extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
        };
    }
    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        return ({
            header: null
        })
    }

    componentDidMount() {
        const { goodsStore } = this.props;
        goodsStore.init();
    }


    render() {
        const { goodsStore, navigation } = this.props;
        const topBarOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 80, 160],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
        });

        const { height, width } = Dimensions.get('window');
        const goodProps = toJS(goodsStore)


        return (
            <View style={{ flex: 1 }}>
                <MyStatusBar
                    backgroundColor='rgba(113,172,55,1)'
                    barStyle="light-content"
                    topBarOpacity={topBarOpacity}
                />
                <Animated.ScrollView
                    scrollEventThrottle={1}
                    style={{ flex: 1, backgroundColor: '#f6f6f6' }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={goodsStore.refreshing}
                            onRefresh={() => goodsStore.onRefresh()}
                        />}
                >

                    <Banner goodsStore={goodProps} />
                    <CircleItems {...this.props} />
                    <NewItems {...this.props } goodsStore={goodProps} />
                    <HotsalItems {...this.props } goodsStore={goodProps} />
                    <CountryItems {...this.props } goodsStore={goodProps} />
                    <BottomItems width={width} />

                </Animated.ScrollView>
            </View>
        );


    }
}

export default GoodsIndexScreen;