import React, { Component, SFC } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    Image
} from 'react-native';
import { CachedImage, ImageCache } from "react-native-img-cache";
interface Props {
    navigation: any
}

import theme from '../../style/theme/default.js';
import { styles } from './styles';

const CircleItems: SFC<Props> = ({
    navigation
}) => {
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


export default CircleItems;