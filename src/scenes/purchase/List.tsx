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
    FlatList
} from 'react-native';
import { connect } from 'dva';
import { CachedImage, ImageCache } from "react-native-img-cache";
import theme from '../../style/theme/default.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

@connect(({ purchase }) => ({ purchase }))
class NavList extends Component<any, any> {

    constructor(props: any) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { return r1.name !== r2.name } });
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }

    }

    componentWillMount() {
        this._pressData = {};
    }

    componentWillReceiveProps(nextProps) {
        const { nation_id, goodsList } = nextProps.purchase;
        const data = goodsList[nation_id];

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
        console.log('===============_renderRow============')
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
                                this.props.dispatch({ type: `purchase/${name ? 'dec' : 'add'}PurchaseList`, payload: rowData })
                                this._pressRow(rowID, rowData);
                            }}
                        >
                            <View style={{
                                width: 32,
                                height: 32,
                                borderRadius: 50,
                                backgroundColor: !name ? theme.brand_primary : '#fff',
                                borderWidth: 2,
                                borderColor: theme.brand_primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                {!name ?
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
        const { refreshing, loading } = purchase;

        if (refreshing && !loading) {
            return (
                <View>
                    <ActivityIndicator animating size="small" />
                    <Text style={{ color: theme.color_text_desalt, textAlign: 'center', padding: 10 }}>加载中</Text>
                </View>

            )
        } else if (this.state.dataSource._cachedRowCount == 0) {
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
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
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
                        if (this.state.dataSource._cachedRowCount > 5) {
                            dispatch({ type: 'purchase/getGoodsList', payload: { loadType: 'add' } })
                        }

                    }}
                    renderFooter={() => loading ? <ActivityIndicator animating size="small" /> : <Text style={{ padding: 10, textAlign: 'center', color: theme.color_text_desalt }}>下拉加载更多</Text>}
                />)
        }

    }
}


export default NavList;

