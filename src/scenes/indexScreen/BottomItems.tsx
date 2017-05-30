import Swiper from 'react-native-swiper';
import React, { Component, SFC } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import { CachedImage, ImageCache } from "react-native-img-cache";
interface Props {
    width: any,
}
import HorizontalRowItem from './HorizontalRowItem';
import theme from '../../style/theme/default.js';
import { styles } from './styles';

const HotSaleItems: SFC<Props> = ({
    width
}) => {
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



export default HotSaleItems;

