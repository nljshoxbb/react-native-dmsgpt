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
    Image
} from 'react-native';
import { connect } from 'dva';
import { CachedImage, ImageCache } from "react-native-img-cache";


import theme from '../../style/theme/default.js';
import Ionicons from 'react-native-vector-icons/Ionicons';



class NavList extends Component<any, any> {
    constructor(props: any) {
        super(props);

    }

    _renderRow = (rowData: any, context: any) => {
        const { dispatch, purchase } = context;
        const { purchaseList } = purchase;

        let isExist = false;
        for (let i = 0; i < purchaseList.length; i++) {
            if (purchaseList[i].id == rowData.id) {
                isExist = true;
            }
        }

        return (
            <View style={{
                padding: 10,
                paddingLeft: 5,
                marginBottom: 5,
                backgroundColor: '#fff',
                flexDirection: 'row'
            }}>
                <Image
                    source={{ uri: rowData.pic + `?imageView2/2/w/206/h/206/interlace/1`, }}
                    style={{ width: 103, height: 103 }}
                />
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <Text style={{ fontSize: 14, }}>{rowData.name}</Text>
                    <Text style={{ color: theme.color_text_desalt, paddingTop: 5 }}>{rowData.summary.slice(0, 10)}</Text>
                    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                        {rowData.label.map((item, idx) => {
                            return (
                                <View
                                    key={item[idx]}
                                    style={{
                                        paddingLeft: 3,
                                        paddingRight: 3,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        backgroundColor: theme.brand_hot,
                                        borderRadius: 5,
                                        marginRight: 5
                                    }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>{item[idx]}</Text>
                                </View>
                            )
                        })}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={{ color: theme.color_text_assist }}>产地：{rowData.origin}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: theme.brand_hot }}>{rowData.price}</Text>
                                <Text style={{ color: theme.brand_hot }}>元/</Text>
                                <Text style={{ color: theme.brand_hot }}>{rowData.unit}</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                dispatch({ type: `purchase/${isExist ? 'dec' : 'add'}PurchaseList`, payload: rowData })
                            }}
                        >
                            <View style={{
                                width: 32,
                                height: 32,
                                borderRadius: 50,
                                backgroundColor: !isExist ? theme.brand_primary : '#fff',
                                borderWidth: 2,
                                borderColor: theme.brand_primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                {!isExist ?
                                    <Ionicons name="ios-cart" size={18} color="#fff" />
                                    : <Ionicons name="ios-remove" size={18} color={theme.brand_primary} />}
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                </View>
            </View>
        )
    }


    render() {
        const { purchase, dispatch } = this.props;
        const { goodsDataSource, refreshing, loading } = purchase;

        if (refreshing && !loading) {
            return (
                <View>
                    <ActivityIndicator animating size="small" />
                    <Text style={{ color: theme.color_text_desalt, textAlign: 'center', padding: 10 }}>加载中</Text>
                </View>

            )
        } else if (goodsDataSource._cachedRowCount == 0) {
            return (

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 100 }}>
                    <Text >暂无此类商品</Text>
                </View>
            )
        } else {
            return (
                <ListView
                    style={{ paddingBottom: 30 }}
                    enableEmptySections
                    dataSource={goodsDataSource}
                    renderRow={(val) => this._renderRow(val, this.props)}
                    initialListSize={10}
                    pageSize={4}
                    refreshControl={
                        <RefreshControl
                            style={{
                                backgroundColor: 'transparent',
                            }}
                            refreshing={false}
                            onRefresh={() => dispatch({ type: 'purchase/onRefresh' })}
                        />}
                    onEndReachedThreshold={5}
                    onEndReached={() => {
                        if (goodsDataSource._cachedRowCount > 5) {
                            dispatch({ type: 'purchase/getGoodsList', payload: { loadType: 'add' } })
                        }

                    }}
                    renderFooter={() => loading ? <ActivityIndicator animating size="small" /> : <Text style={{ padding: 10, textAlign: 'center', color: theme.color_text_desalt }}>下拉加载更多</Text>}
                />)
        }

    }
}


export default NavList;

