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
import theme from '../../style/theme/default.js';
import MyButton from '../../components/MyButton';
import LoginComp from '../../components/LoginComp';

import { DEVICE_WIDTH, isEmptyObj, indexOf,NavigationActions } from '../../utils';
import { connect } from 'dva';

@connect(({ user, purchase }) => ({ user, purchase }))
class Order extends Component<any, any> {
    constructor(props: any) {
        super(props);

    }

    componentDidMount() {

    }


    render() {
        const { user, purchase, dispatch } = this.props;
        const { userInfo } = user;
        // const {}
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
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    {isEmptyObj(userInfo) ?
                        <LoginComp {...this.props} /> :
                        <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Image source={require('../../../assets/empty_shopping_cart_.jpg')} style={{ width: 130, height: 144 }} />
                            <Text style={{ color: theme.color_text_desalt, paddingTop: 10 }}>您的采购单很干净</Text>
                            <Text style={{ color: theme.color_text_desalt, paddingTop: 5 }}>什么也没有……</Text>
                            <MyButton onPress={() => { this.props.navigation.navigate('Purchase') }} title="去采购" />
                        </View>
                    }
                </View>

            </View>
        );
    }
}

export default Order;