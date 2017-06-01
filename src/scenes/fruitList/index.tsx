import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    ListView,
    Animated,
    StatusBar,
    StyleSheet,
    RefreshControl,
    Dimensions,
    Platform,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { connect } from 'dva';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CachedImage } from "react-native-img-cache";

import MyStatusBar from '../../components/MyStatusBar';
import Banner from '../../components/Banner';
import MySticky from '../../components/MySticky';

import SelecItem from './SelecItem';


import RowItems from './RowItems';
const DEVICE_WIDTH = Dimensions.get("window").width;

const ip5 = (Platform.OS === 'ios' && DEVICE_WIDTH == 640) ? true : false;

type _animateValue = null;
type _animateOpacity = null;
type _style = {};
type _animateHeight = null;

@connect(({ fruitList, main }: { fruitList: any, main: any }) => ({ fruitList, main }))
class FruitList extends Component<any, any> {
    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            // headerBackTitle: null,
            headerTintColor: '#fff',
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(113,172,55,1)',
                top: 0,
                left: 0,
                right: 0,
                height: 60,
                opacity: (!state.params || state.params.animateOpacity == undefined) ? 0 : state.params.animateOpacity,
            },
        })
    }

    _animateValue = new Animated.Value(0);
    _animateOpacity = new Animated.Value(0);
    _animateHeight = new Animated.Value(0);
    _style = {
        opacity: 0,
        height: 0,
    }
    _box = null;
    // @observable animatedOpacity = 0;
    // @observable scrollY = new Animated.Value(0);
    constructor(props: any) {
        super(props);
        this.state = {
            animatedOpacity: 0,
            scrollY: new Animated.Value(0)
        }
    }

    componentDidMount() {
        const { navigation, dispatch } = this.props;
        if (navigation.state.params) {
            const { nation_id, nation_name } = navigation.state.params;
            dispatch({ type: 'fruitList/getList', payload: { nation_id } });
            dispatch({ type: 'fruitList/setNation', payload: { nation: { id: nation_id, name: nation_name } } });
        } else {
            dispatch({ type: 'fruitList/getList', payload: { nation_id: '' } });
        }
       
    }


    componentWillMount() {
        const HEADER_MAX_HEIGHT = 60;
        const HEADER_MIN_HEIGHT = 0;
        const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

        this.props.navigation.setParams({
            animateOpacity: this.state.scrollY.interpolate({
                inputRange: [0, 160],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            })
        });
    }

    handleScroll = (event: any) => {
        Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])(event);
    }

    render() {
        const {
            fruitList,
            dispatch,
            main
        } = this.props;
        const listStyle = fruitList.listType ?
            {
                flexDirection: 'column',

            } :
            {
                justifyContent: 'space-around',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
            }

        return (
            <View style={{ flex: 1 }}>
                <MySticky scrollY={this.state.scrollY}>
                    <SelecItem {...this.props} />
                </MySticky>

                <ListView
                    dataSource={fruitList.list}
                    renderRow={(val) => {
                        const obj = {
                            rowData: val,
                            context: this,
                        }
                        return <RowItems {...obj} />
                    }}
                    onScroll={(e) => this.handleScroll(e)}
                    contentContainerStyle={[listStyle]}
                    renderHeader={() => (
                        <View>
                            <Banner bannerList={main.bannerList} />
                            <View style={{ height: 40 }} >
                                <SelecItem {...this.props} />
                            </View>
                        </View>

                    )}
                    initialListSize={10}
                    pageSize={4}
                    refreshControl={
                        <RefreshControl
                            refreshing={fruitList.refreshing}
                            onRefresh={() => dispatch({ type: 'fruitList/onRefresh' })}
                        />}
                >

                </ListView >
            </View>
        )
    }
}


export default FruitList;
