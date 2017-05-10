import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import Button from 'antd-mobile/lib/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';
import { observable, useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';

import { commonStyles } from '../style';
import { styles } from './styles';
import FruitList from './fruitList';

const RowItem = ({ rowData }: { rowData?: any }) => {
    return (
        <View style={{ width: 100, alignItems: 'center', justifyContent: 'center', padding: 5 }}>
            <Image
                source={{ uri: rowData.listpic + '?imageView2/1/w/70/h/70' }}
                style={{ height: 70, width: 70 }}
                resizeMode="cover"

            />
            <Text style={{ padding: 10 }}>{rowData.title}</Text>
            <Text style={[commonStyles.grayColor, { fontSize: 12 }]}>{rowData.intro.length > 10 ? rowData.intro.slice(0, 10) : rowData.intro}...</Text>
        </View>
    )
}

@observer(['goodsStore'])
class GoodsIndexScreen extends Component<any, any> {

    static navigationOptions = ({ navigation }: { navigation?: any }) => {

        return ({
            header: null
        })
    }

    componentDidMount() {
        const { goodsStore } = this.props;
        goodsStore.init();
    }

    _rendScrollList() {
        return this.props.goodsStore.scrollList.map((rowData: any) => {
            let title = rowData.title.length > 15 ? rowData.title.slice(0, 15) : rowData.title;
            return (
                <View
                    key={rowData.id}
                    style={{ flexDirection: 'row', alignItems: 'center' }}

                >
                    <View style={styles.yellowDot}></View>
                    <Text key={rowData.id} style={styles.scrollText}>{title}...</Text>
                </View>
            )
        })
    }

    _renderRecommand() {
        return this.props.goodsStore.recommendList.map((rowData: any) => {
            return (
                <RowItem key={rowData.id} rowData={rowData} />
            )
        })
    }


    _renderCountry() {
        const { countryList } = this.props.goodsStore;
        let countryArr = [
            {
                titleEn: "Malaysia",
                titleCn: "马来西亚",
                desc: '一年四季都可以吃到各式各样的热带水果',
                img: require(`../../../assets/Malaysia1.jpg`),
                fruitArr: []

            },
            {
                titleEn: "Thailand",
                titleCn: "泰国",
                desc: '“水果王国”果实天然新鲜种类繁多',
                img: require(`../../../assets/Thailand1.jpg`),
                fruitArr: []
            },
            {
                titleEn: "Vietnam",
                titleCn: "越南",
                desc: '温暖湿润的天气成就了水果中的“优质生”',
                img: require(`../../../assets/Vietnam1.jpg`),
                fruitArr: []
            }
        ];

        if (countryList.length != 0) {
            countryList.forEach((item: any, idx: number) => {
                if (!item) {
                    item = [];
                }
                countryArr[idx].fruitArr = item;
            })
        }


        return countryArr.map((itemData,idx) => {
            return (
                <View style={{ position: 'relative' }} key={idx}>
                    <Image
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
                                        <RowItem key={rowData.id} rowData={rowData} />
                                    )
                                })
                            }

                        </ScrollView>
                    </View>
                    <View style={styles.countryBottomTitle}>
                        <Text style={[{ fontSize: 16, color: '#999999' }]}>查看更多 </Text>
                        <Ionicons name="ios-arrow-dropright" size={25} color="#cccccc" />
                    </View>
                </View>
            )
        })


    }

    render() {
        const { goodsStore, navigation } = this.props;

        if (goodsStore.imgList.length == 0) {
            return <ActivityIndicator size="large" toast></ActivityIndicator>
        }
        const { height, width } = Dimensions.get('window');

        return (

            <ScrollView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
                <Swiper
                    height={160}
                    autoplay
                    activeDotColor='green'
                    dot={<View style={styles.dot} />}
                //showsButtons
                >
                    {goodsStore.imgList.map((item: any) => {
                        return (
                            <View key={item.id}>
                                <Image
                                    source={{ uri: item.imgurl }}
                                    style={{ height: 160 }}
                                    resizeMode="cover"

                                />
                            </View>
                        )
                    })}
                </Swiper>

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
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('FruitList', { name: 'FruitList' })}>
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

                <View style={styles.scrollWrap}>
                    <Text style={{ color: '#51b3f0', fontSize: 21, fontWeight: '800', paddingRight: 20 }}>新鲜事</Text>
                    <View style={{ flex: 1, }}>
                        <Swiper
                            horizontal={false}
                            autoplay
                            height={14}
                            showsPagination={false}
                        >{this._rendScrollList()}</Swiper>
                    </View>
                </View>

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
                            {this._renderRecommand()}
                        </ScrollView>
                    </View>
                </View>
                {this._renderCountry()}
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#f6f6f6', paddingTop: 20, paddingBottom: 10 }}>
                    <View style={styles.bottomBox}>
                        <Image
                            style={{ height: 28, width: 28 }}
                            source={require('../../../assets/bottom1.png')}
                        />
                        <Text style={styles.bottomTitle}>东盟原产地直购</Text>
                        {width == 320 ? <Text /> : <Text style={{ color: "#999999", fontSize: 11, paddingTop: 5 }}>100% 原产地直购保证</Text>}
                    </View>
                    <View style={styles.bottomBox}>
                        <Image
                            style={{ height: 28, width: 28 }}
                            source={require('../../../assets/bottom2.png')}
                        />
                        <Text style={styles.bottomTitle}>会员权益</Text>
                        {width == 320 ? <Text /> : <Text style={{ color: "#999999", fontSize: 11, paddingTop: 5 }}>会员升级 尊享特权</Text>}
                    </View>
                    <View style={styles.bottomBox}>
                        <Image
                            style={{ height: 28, width: 28 }}
                            source={require('../../../assets/bottom3.png')}
                        />
                        <Text style={styles.bottomTitle}>极速送达</Text>
                        {width == 320 ? <Text /> : <Text style={{ color: "#999999", fontSize: 11, paddingTop: 5 }}>专属物流 全程把控</Text>}
                    </View>
                </View>

            </ScrollView>

        );
    }
}


const GoodsIndex = StackNavigator({
    GoodsIndex: {
        screen: GoodsIndexScreen
    },
    FruitList: {
        screen: FruitList,
        
    }
}, {
        initialRouteName: 'GoodsIndex',

    });

export default GoodsIndex;