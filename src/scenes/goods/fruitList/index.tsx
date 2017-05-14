import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    ListView,
    Animated,
    StatusBar,
    StyleSheet
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { observable, useStrict } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';
import Swiper from 'react-native-swiper';
import { styles } from './styles';

import MyStatusBar from '../../../components/MyStatusBar';

type _animateValue = null;
type _animateOpacity = null;

@observer(['fruitlistStore', 'goodsStore'])
class FruitList extends Component<any, any> {
    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            tabBarVisible: false,
            headerBackTitle: null,
            headerTintColor: '#fff',
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(113,172,55,1)',
                top: 0,
                left: 0,
                right: 0,
                // height: !state.params ? 0 : state.params.animatedValue,
                // overflow: 'hidden',
                height: 60,
                opacity: !state.params ? 0 : state.params.animateOpacity,
            },

        })
    }
    _animateValue = new Animated.Value(0);
    _animateOpacity = new Animated.Value(0);
    constructor(props: any) {
        super(props);

    }

    componentDidMount() {
        this.props.fruitlistStore.getFruitList();
    }


    componentWillMount() {
        const HEADER_MAX_HEIGHT = 60;
        const HEADER_MIN_HEIGHT = 0;
        const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

        this.props.navigation.setParams({
            // animatedValue: this._animateValue.interpolate({
            //     inputRange: [0, HEADER_SCROLL_DISTANCE],
            //     outputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
            //     extrapolate: 'clamp'
            // }),
            animateOpacity: this._animateValue.interpolate({
                inputRange: [0, 160],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            })
        })
    }


    _renderRow(rowData: any) {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: rowData.listpic + '?imageView2/1/w/200/h/200' }}
                    style={{ height: 100, width: 100 }}
                />
                <View><Text>11233</Text></View>
            </View>
        )
    }


    _onScroll = (event?: any) => {

    }
    _renderSectionHeader = (sectionData: string, sectionID: string) => {
        return (
            <View style={{ paddingTop: 60, flexDirection: 'column'}}>
                <View style={[contentStyles.sectionHeaderBox, { backgroundColor: 'red' }]}></View>
                <View style={[contentStyles.sectionHeaderBox, { backgroundColor: 'blue' }]}></View>
                <View style={[contentStyles.sectionHeaderBox, { backgroundColor: 'green' }]}></View>
                <View style={[contentStyles.sectionHeaderBox, { backgroundColor: 'red' }]}></View>
            </View>
        );
    };

    render() {
        const { goodsStore, fruitlistStore } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    dataSource={fruitlistStore.fruitList}
                    renderRow={this._renderRow}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this._animateValue } } }])}
                    renderSectionHeader={this._renderSectionHeader}
                    renderHeader={() => (
                        <View>
                            <Swiper
                                height={160}
                                autoplay
                                activeDotColor='green'
                                dot={<View style={styles.dot} />}
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
                        </View>
                    )
                    }
                    initialListSize={10}
                    //pageSize={4}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={16}
                >
                </ListView >
            </View>

        );
    }
}

const contentStyles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 60,
        flexDirection: 'row',
        backgroundColor: '#fff',
        // justifyContent: 'space-between',
        // height: 30
    },
    sectionHeaderBox: {
        flex: 1,
        justifyContent: 'center',
        height: 20
    }
})

export default FruitList;