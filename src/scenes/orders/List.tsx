import Swiper from 'react-native-swiper';
import React, { Component, SFC } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    ListView,
    Image,
    RecyclerViewBackedScrollView,
    TouchableHighlight,
    FlatList,
    TextInput
} from 'react-native';
import { connect } from 'dva';
import { CachedImage, ImageCache } from "react-native-img-cache";
import theme from '../../style/theme/default.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { DEVICE_WIDTH } from '../../utils';

import {
    Checkbox,
    Stepper
} from 'antd-mobile'
// import { List } from 'antd-mobile';
// const Item = List.Item;

@connect(({ purchase }) => ({ purchase }))
class OrderList extends Component<any, any> {

    constructor(props: any) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { return r1.name !== r2.name } });
        const { purchaseList } = this.props.purchase;
        const data = purchaseList;
        this._pressData = {};
        this.state = {
            dataSource: ds.cloneWithRows(data ? this._genRows(this._pressData, data) : []),
        }

    }

    componentWillMount() {
        this._pressData = {};
    }

    componentWillReceiveProps(nextProps) {
        const { purchaseList } = nextProps.purchase;
        const data = purchaseList
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data ? this._genRows(this._pressData, data) : []),
            list: data ? data : []
        });


    }

    _genRows = (pressData: any, data: any) => {
        const { purchaseList } = this.props.purchase;

        var dataBlob = [];
        for (var ii = 0; ii < data.length; ii++) {
            var pressedText = pressData[ii] ? 'isExist' : '';
            dataBlob.push({ name: pressedText, rowData: data[ii] });
        }

        return dataBlob;
    }

    _pressRow = (rowID: number, rowData: any) => {
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._genRows(this._pressData, this.state.list))
        })
    }

    _renderRow = (item: any, sectionID: number, rowID: number) => {
        const rowData = item.rowData;
        const name = item.name;
        console.log(rowData);
        console.log('===============_renderRow============')
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff'
            }}>
                <Checkbox
                    key="disabled"
                    defaultChecked
                    onChange={() => { }}
                    style={{ margin: 20 }}
                />
                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: theme.brand_desalt_background,
                        flex: 1,
                        paddingRight: 10,
                        paddingTop: 15,
                        paddingBottom: 10
                    }}>
                        <Image
                            source={{ uri: rowData.pic + `?imageView2/2/w/206/h/206/interlace/1`, }}
                            style={{ width: 80, height: 80 }}
                        />
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingLeft: 20
                        }}>
                            <View>
                                <Text>{rowData.name}</Text>
                                <Text style={{ paddingTop: 5, color: theme.color_text_desalt }}>{rowData.standard}</Text>
                            </View>
                            <Text style={{ color: theme.brand_important, fontSize: 14 }}>{rowData.price}/{rowData.unit}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingRight:10,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>金额</Text>
                            <Text style={{ fontSize: 20, color: theme.brand_important, paddingLeft: 5 }}>{rowData.price}元</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Ionicons
                                name="ios-add"
                                size={24}
                                color={theme.brand_primary}
                                style={{ width: 25, height: 25,backgroundColor:theme.brand_desalt,textAlign:'center',fontWeight:"800" }} />

                            <TextInput
                                style={{
                                    borderColor: theme.brand_desalt,
                                    borderWidth: 1,
                                    width:50,
                                    textAlign:'center',
                                    fontSize:16
                                }}
                            />

                            <Ionicons
                                name="ios-remove"
                                size={24}
                                color={theme.brand_primary}
                                 style={{ width: 25, height: 25,backgroundColor:theme.brand_desalt,textAlign:'center',fontWeight:"800" }} />

                        </View>
                    </View>
                </View>
            </View>

        )
    }

    render() {
        const { purchase, dispatch } = this.props;
        const { refreshing, loading } = purchase;

        // if (refreshing && !loading) {
        //     return (
        //         <View>
        //             <ActivityIndicator animating size="small" />
        //             <Text style={{ color: theme.color_text_desalt, textAlign: 'center', padding: 10 }}>加载中</Text>
        //         </View>

        //     )
        // } else 
        if (this.state.dataSource._cachedRowCount == 0) {
            return (

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 30 }}>
                    <View >
                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                            <Image source={require('../../../assets/purchase_empty.jpg')} style={{ width: 55, height: 40, margin: 20 }} />
                        </View>
                        <Text style={{ color: theme.color_text_desalt, textAlign: 'center' }}>暂无此类商品，敬请期待</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <ListView
                    style={{ paddingBottom: 30 }}
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    initialListSize={10}
                    pageSize={4}
                    refreshControl={
                        <RefreshControl
                            style={{
                                backgroundColor: 'transparent',
                            }}
                            refreshing={refreshing}
                            onRefresh={() => dispatch({ type: 'purchase/onRefresh' })}
                        />}
                //onEndReachedThreshold={5}
                //onEndReached={() => {}}
                //renderFooter={() => loading ? <ActivityIndicator animating size="small" /> : <Text style={{ padding: 10, textAlign: 'center', color: theme.color_text_desalt }}>下拉加载更多</Text>}
                />)
        }

    }
}


export default OrderList;

