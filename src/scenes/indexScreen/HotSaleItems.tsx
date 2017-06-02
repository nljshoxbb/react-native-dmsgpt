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
    main: any
}
import HorizontalRowItem from './HorizontalRowItem';
import theme from '../../style/theme/default.js';
import { styles } from './styles';

const HotSaleItems: SFC<Props> = ({
    main,
    navigation
}) => {
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
                    {main.recommendList.map((rowData: any) => (<HorizontalRowItem key={rowData.id} rowData={rowData} navigation={navigation} />))}
                </ScrollView>
            </View>
        </View>
    )
}



export default HotSaleItems;

