import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
    Animated,
    RefreshControl,
    Platform,
    TextInput,
    Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyButton from '../../components/MyButton';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import theme from '../../style/theme/default.js';

interface Props {
    profileStore: any,
    form?: any,
    navigation: any
}
@observer(['profileStore'])
class Login extends Component<Props, any>{

    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state, goBack } = navigation;
        return ({
            headerLeft: <Ionicons
                name="md-close"
                size={30}
                color={theme.color_text_desalt}
                style={{ textAlign: 'center', width: 50 }}
                onPress={() => goBack()}
            />,
            headerTitle: '登录'

        })
    }

    constructor(props: any) {
        super(props)
    }

    @observable focus = [false, false];

    @action handleFocus = (idx: number) => {
        this.focus = [false, false];
        this.focus[idx] = !this.focus[idx];
    }

    submit() {
        this.props.form.validateFields((error?: any, value?: any) => {
            this.props.profileStore.login(value);
        });
    }

    render() {
        const { profileStore, form, navigation } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <StatusBar animated barStyle='default' />
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: 25, marginLeft: 10 }}>
                        <Text style={{
                            marginLeft: 15,
                            marginTop: 10,
                            color: theme.brand_primary,
                            opacity: this.focus[0] ? 1 : 0
                        }}>手机号码</Text>
                        <InputItem
                            {...getFieldProps('phone', {
                                initialValue: '',
                                onChange: (val: any) => profileStore.handleInput(val, 'phone'),
                            }) }
                            type="number"
                            clear
                            placeholder='请输入手机号码'
                            onFocus={() => { this.handleFocus(0) }}
                        />
                        <Text style={{
                            marginLeft: 15,
                            marginTop: 5,
                            color: theme.brand_primary,
                            opacity: this.focus[1] ? 1 : 0
                        }}>密码</Text>
                        <InputItem
                            {...getFieldProps('password', {
                                initialValue: '',
                                onChange: (val: any) => profileStore.handleInput(val, 'password'),

                            }) }
                            clear
                            type="password"
                            placeholder='请输入密码'
                            onFocus={() => { this.handleFocus(1) }}
                        />

                    </View>
                    <View style={{ margin: 25 }}>
                        <Button
                            disabled={profileStore.canLogin ? false : true}
                            type='primary'
                            onPressOut={() => this.submit()}
                        >登录</Button>
                    </View>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View>
                                <Text style={{ color: theme.color_text_desalt, paddingRight: 25 }}>忘记密码</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
                    <Text style={{ color: theme.color_text_desalt }}>没有账号？</Text>
                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('Register') }}>
                        <View>
                            <Text style={{ color: theme.brand_primary }}>立即注册</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>


        );
    }
}

const MyLoginWrap = createForm()(Login)

export default MyLoginWrap;