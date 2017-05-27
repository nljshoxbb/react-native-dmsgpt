import Swiper from 'react-native-swiper';
import React, { Component, SFC } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    ScrollView
} from 'react-native';
import { CachedImage, ImageCache } from "react-native-img-cache";
interface Props {
    navigation: any,
    goodsStore: any
}
import HorizontalRowItem from './HorizontalRowItem';
import theme from '../../style/theme/default.js';
import { styles } from './styles';

const NewItems: SFC<Props> = ({
    goodsStore,
    navigation
}) => {
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

export default NewItems;

