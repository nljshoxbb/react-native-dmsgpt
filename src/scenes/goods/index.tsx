import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import Button from 'antd-mobile/lib/button';


import Swiper from 'react-native-swiper';

import { observable, useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { commonStyles } from '../style';


@observer(['goodsStore'])
class Goods extends Component<any, any> {
    componentDidMount() {
        this.props.goodsStore.getBanner();
    }


    render() {
        console.log(this.props);
        const { goodsStore } = this.props;

        if (goodsStore.imgList.length == 0) {
            return <ActivityIndicator size="large" toast></ActivityIndicator>
        }

        return (
            <View style={commonStyles.container}>

                <Swiper
                    height={200}
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
                                    style={{ height: 200 }}
                                    resizeMode="cover"

                                />
                            </View>
                        )
                    })}
                </Swiper>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    dot: {
        backgroundColor: '#fff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderWidth: 1,
        borderColor: 'green'
    }
})


export default Goods;
