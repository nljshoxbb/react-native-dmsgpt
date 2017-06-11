import React, { Component } from 'react';
import {
    Text,
    View,
    Animated,
    Easing,
    Image,
    Platform,
    StatusBar
} from 'react-native';

import {
    Checkbox
} from 'antd-mobile'

import theme from '../../style/theme/default.js';
import MyButton from '../../components/MyButton';
import LoginComp from '../../components/LoginComp';

import { DEVICE_WIDTH, isEmptyObj, indexOf, NavigationActions } from '../../utils';
import { connect } from 'dva';

import OrderList from './List';


@connect(({ user, purchase }) => ({ user, purchase }))
class Order extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }


    _renderFooter = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopColor: '#F0F0F0', borderTopWidth: 1 }}>
                <View style={{ padding: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Checkbox
                        key="disabled"
                        defaultChecked
                        onChange={() => { }}
                    >
                        <Text style={{ paddingLeft: 10, fontSize: 16 }}>全选</Text>

                    </Checkbox>

                    <View style={{ flexDirection: 'column', }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>总金额:</Text><Text style={{ color: theme.brand_important }}>总金额</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>总金额:</Text><Text style={{ color: theme.brand_important }}>总金额</Text>
                        </View>
                    </View>

                </View>
                <View style={{
                    backgroundColor: theme.brand_primary,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 15
                }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>去结算</Text>
                </View>
            </View>

        )
    }

    render() {
        const { user, purchase, dispatch } = this.props;
        const { userInfo } = user;
        const { purchaseList } = purchase;

        return (
            <View style={{ flex: 1, backgroundColor: theme.brand_desalt_background }}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style={{
                    height: 64,
                    backgroundColor: theme.brand_primary,
                    paddingTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>采购单</Text>
                </View>

                {isEmptyObj(userInfo) ?
                    <View style={{ flex: 1 }}>
                        <LoginComp {...this.props} />
                    </View> :
                    <View style={{ flex: 1 }}>
                        {purchaseList.length != 0 ?
                            <OrderList /> :
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/empty_shopping_cart_.jpg')} style={{ width: 130, height: 144 }} />
                                    <Text style={{ color: theme.color_text_desalt, paddingTop: 10 }}>您的采购单很干净</Text>
                                    <Text style={{ color: theme.color_text_desalt, paddingTop: 5 }}>什么也没有……</Text>
                                    <MyButton onPress={() => { this.props.navigation.navigate('Purchase') }} title="去采购" />
                                </View>
                            </View>
                        }
                        {this._renderFooter()}
                    </View>
                }


            </View>
        );
    }
}

export default Order;