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
    Dimensions
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { observable, useStrict } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
            animateOpacity: this._animateOpacity.interpolate({
                inputRange: [0, 160],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            })
        })
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
    }



    _renderRow(rowData: any) {

        return (
            <View style={contentStyles.row}>
                <Image
                    source={{ uri: rowData.listpic + '?imageView2/2/w/130/h/130/interlace/1' }}
                    style={{ height: 130, width: 130 }}
                />
                <View><Text>{rowData.title}</Text></View>
            </View>
        )

    }

    _renderSectionHeader = (sectionData: string, sectionID: string) => {
        return (
            <View style={{ paddingTop: 60, }}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', flex: 1 }}>
                    <View style={[contentStyles.sectionHeaderBox]}>
                        <Text style={{ paddingRight: 5 }}>不限分类</Text>
                        <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                    </View>
                    <View style={[contentStyles.sectionHeaderBox]}>
                        <Text style={{ paddingRight: 5 }}>不限产地</Text>
                        <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                    </View>
                    <View style={[contentStyles.sectionHeaderBox]}>
                        <Text style={{ paddingRight: 5 }}>十大推荐</Text>
                        <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        <Ionicons name="md-apps" size={28} color="#cccccc" />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { goodsStore, fruitlistStore } = this.props;

        return (
            <ListView
                dataSource={fruitlistStore.fruitList}
                renderRow={this._renderRow}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this._animateOpacity } } }])}
                //renderSectionHeader={this._renderSectionHeader}
                contentContainerStyle={contentStyles.list}
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

                )}
                initialListSize={10}
                pageSize={4}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={goodsStore.refreshing}
                        onRefresh={() => goodsStore.onRefresh()}
                    //style={{ backgroundColor: 'transparent' }}
                    //colors={['transparent']}
                    //tintColor='transparent'

                    />}
            >
            </ListView >


        )
    }
}
const deviceWidth = Dimensions.get('window').width;
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
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',

    },
    row: {
        justifyContent: 'center',
        // padding: 5,
        // margin: 3,
        width: deviceWidth * 0.5,
        height: 200,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor:'#f6f6f6',
        borderWidth:2
        
      
    },
})

export default FruitList;
