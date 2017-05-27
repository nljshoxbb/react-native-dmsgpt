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
import HorizontalRowItem from './HorizontalRowItem';
import CircleItems from './CircleItems';
import HotSaleItems from './HotSaleItems';
import NewItems from './NewItems';
import CountryItems from './CountryItems';
import BottomItems from './BottomItems';

import { commonStyles } from '../style';
import { styles } from './styles';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


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
            // header: null
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
                    <HotSaleItems {...this.props } goodsStore={goodProps} />
                    <CountryItems {...this.props } goodsStore={goodProps} />
                    <BottomItems width={width} />

                </Animated.ScrollView>
            </View>
        );


    }
}

export default GoodsIndexScreen;