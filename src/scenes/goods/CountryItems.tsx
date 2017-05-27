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
import Ionicons from 'react-native-vector-icons/Ionicons';
const CountryItems: SFC<Props> = ({
    goodsStore,
    navigation
}) => {
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
                                            <HorizontalRowItem key={rowData.id} rowData={rowData} navigation={navigation} />
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

export default CountryItems;

