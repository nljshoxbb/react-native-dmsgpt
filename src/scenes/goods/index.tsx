import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import Button from 'antd-mobile/lib/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Swiper from 'react-native-swiper';
import { observable, useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { commonStyles } from '../style';
import { styles } from './styles';

@observer(['goodsStore'])
class Goods extends Component<any, any> {
    componentDidMount() {
        const { goodsStore } = this.props;
        goodsStore.getScrollList();
        goodsStore.getRecommandList();
        goodsStore.getBanner();
        goodsStore.getNationalList();
    }

    _rendScrollList() {
        return this.props.goodsStore.scrollList.map((rowData: any) => {
            let title = rowData.title.length > 15 ? rowData.title.slice(0, 15) : rowData.title;
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.yellowDot}></View>
                    <Text key={rowData.id} style={styles.scrollText}>{title}...</Text>
                </View>
            )
        })
    }

    _renderRecommand() {
        return this.props.goodsStore.recommendList.map((rowData: any) => {
            return (
                <View key={rowData.id} style={{ width: 120, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Image
                        source={{ uri: rowData.listpic + '?imageView2/1/w/80/h/80' }}
                        style={{ height: 80, width: 80 }}
                        resizeMode="cover"

                    />
                    <Text style={{ padding: 10 }}>{rowData.title}</Text>
                    <Text style={commonStyles.grayColor}>{rowData.intro.length > 10 ? rowData.intro.slice(0, 10) : rowData.intro}...</Text>
                </View>
            )
        })
    }

    render() {
        const { goodsStore } = this.props;

        if (goodsStore.imgList.length == 0) {
            return <ActivityIndicator size="large" toast></ActivityIndicator>
        }

        return (

            <ScrollView style={{flex:1}}>
                <Swiper
                    height={160}
                    autoplay
                    activeDotColor='green'
                    dot={<View style={styles.dot} />}
                //showsButtons
                >
                    {goodsStore.imgList.map((item) => {
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
                        <View style={[styles.circle, { backgroundColor: '#a1cb6b' }]}><Ionicons name="md-cart" size={30} color="#fff" /></View>
                        <Text style={{fontSize:12}}>采购入口</Text>
                    </View>
                    <View style={styles.circleBox}>
                        <View style={[styles.circle, { backgroundColor: '#51b3f0' }]}><Ionicons name="ios-clipboard" size={30} color="#fff" /></View>
                        <Text style={{fontSize:12}}>预定专区</Text>
                    </View>
                    <View style={styles.circleBox}>
                        <View style={[styles.circle, { backgroundColor: '#7eaa49' }]}><MaterialCommunityIcons name="home" size={32} color="#fff" /></View>
                        <Text style={{fontSize:12}}>大观园</Text>
                    </View>
                    <View style={styles.circleBox}>
                        <View style={[styles.circle, { backgroundColor: '#ee7c46' }]}><MaterialCommunityIcons name="note-multiple" size={30} color="#fff" /></View>
                        <Text style={{fontSize:12}}>我建议</Text>
                    </View>
                </View>

                <View style={styles.scrollWrap}>
                    <Text style={{ color: '#51b3f0', fontSize: 24, fontWeight: '800', paddingRight: 20 }}>新鲜事</Text>
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
                        <Text style={{ fontSize: 18 }}>热卖推荐</Text>
                        <View style={styles.titleDot}></View>
                    </View>
                </View>

                <View>
                    <ScrollView
                        horizontal
                    >
                        {this._renderRecommand()}

                    </ScrollView>
                </View>
            </ScrollView>

        );
    }
}



export default Goods;
