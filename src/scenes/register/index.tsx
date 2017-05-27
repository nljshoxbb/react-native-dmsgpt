import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import {
    InputItem,
    Button,
    WhiteSpace,
    WingBlank
} from 'antd-mobile';
import { createForm } from 'rc-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme/default.js';
import MyButton from '../../components/MyButton';
import GetMsg from '../../components/GetMsg';
import {
    verifyInfoApi
} from '../../configs/api';
import { domain } from '../../configs';
interface Props {

}

@observer(['profileStore'])
class Register extends Component<Props, any> {
    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state, goBack } = navigation;
        return ({
            headerTitle: '注册'

        })
    }
    @observable phone = '';
    @observable verify_code = '';
    @observable codeImgSrc = domain + verifyInfoApi + '?imageW=100&imageH=40&';
    handleFocus = () => {

    }

    handleChange = (val?: any, name: any) => {

    }

    @action handleRefresh = () => {
        this.codeImgSrc = `${this.codeImgSrc}?time${+ new Date()}`;

    }

    render() {
        const { profileStore, form, navigation } = this.props;
        const { getFieldProps, getFieldError } = form;

        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
                <View style={{ marginRight: 25, marginLeft: 10 }}>
                     <WhiteSpace size="xl" />
                    <InputItem
                        {...getFieldProps('phone', {
                            initialValue: '',
                            onChange: (val: any) => profileStore.handleInput(val, 'phone'),
                        }) }
                        clear
                        placeholder='请输入手机号码'
                        onFocus={() => { this.handleFocus(0) }}
                    />
                    <WhiteSpace size="sm" />
                    <InputItem
                        placeholder="请输入图形验证码"
                        onChange={(val?: any) => this.handleChange(val, 'verify_code')}
                        extra={
                            <TouchableWithoutFeedback onPress={() => this.handleRefresh()}>
                                <Image source={{ uri: this.codeImgSrc }} style={{ width: 100, height: 35 }} />
                            </TouchableWithoutFeedback>

                        }
                    />
                    <WhiteSpace size="sm" />
                    <InputItem
                        placeholder="请输入短信验证码"
                        onChange={(val?: any) => this.handleChange(val, 'code')}
                        extra={() => { <GetMsg phone={this.phone} verify_code={this.verify_code} /> }}
                    />
                </View>

            </View>
        );
    }
}
const RegisterWrap = createForm()(Register)
export default RegisterWrap;