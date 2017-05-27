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
import { observable, useStrict, toJS } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CachedImage } from "react-native-img-cache";
import { styles } from './styles';

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

@observer(['fruitlistStore', 'goodsStore'])
class FruitList extends Component<any, any> {

    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;

        return ({
            headerBackTitle: null,
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
    @observable animatedOpacity = 0;
    @observable scrollY = new Animated.Value(0);
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const { fruitlistStore, navigation } = this.props;

        if (navigation.state.params) {
            const { nation_id, nation_name } = navigation.state.params;
            fruitlistStore.setNation(nation_id, nation_name);
        } else {
            fruitlistStore.setNation();
        }

        fruitlistStore.getFruitList();
    }


    componentWillMount() {
        const HEADER_MAX_HEIGHT = 60;
        const HEADER_MIN_HEIGHT = 0;
        const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

        this.props.navigation.setParams({
            animateOpacity: this.scrollY.interpolate({
                inputRange: [0, 160],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            })
        });


    }

    handleScroll = (event: any) => {
        // console.log(event.nativeEvent.contentOffset.y)
        Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])(event);
    }

    render() {
        const { goodsStore, fruitlistStore } = this.props;
        const goodProps = toJS(goodsStore);

        const listStyle = fruitlistStore.listType ?
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
                <MySticky scrollY={this.scrollY}>
                    <SelecItem {...this.props} />
                </MySticky>

                <ListView
                    dataSource={fruitlistStore.fruitList}
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
                            <Banner goodsStore={goodProps} />
                            <View style={{ height: 40 }} >
                                <SelecItem {...this.props} />
                            </View>
                        </View>

                    )}
                    initialListSize={10}
                    pageSize={4}
                    refreshControl={
                        <RefreshControl
                            refreshing={goodsStore.refreshing}
                            onRefresh={() => goodsStore.onRefresh()}
                        />}
                >

                </ListView >
            </View>
        )
    }
}

const contentStyles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 60,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    sectionHeaderBox: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    row: {
        justifyContent: 'center',
        // padding: 5,
        // margin: 3,
        padding: 10,
        width: DEVICE_WIDTH * 0.5,
        // height: 200,
        backgroundColor: '#fff',
        // alignItems: 'center',
        borderColor: '#f6f6f6',
        borderWidth: 2,
        position: 'relative',
    },
    row2: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#f6f6f6',
        borderWidth: 2,
        position: 'relative',
    }
})

export default FruitList;
