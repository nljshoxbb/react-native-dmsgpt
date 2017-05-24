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
import MyButton from './MyButton';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';

interface Props {
    profileStore: any,
    form?: any
}
@observer(['profileStore'])
class MyLogin extends Component<Props, any>{
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
            
        });
        console.log(this.props.form.getFieldsValue())
    }

    render() {
        const { profileStore, form } = this.props;
        const { getFieldProps, getFieldError } = form;

        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <StatusBar
                    barStyle={profileStore.loginShow ? "default" : "light-content"}
                />
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ color: 'rgba(153,153,153,1)', fontSize: 18 }}>您尚未登录，请先登录</Text>
                    <MyButton
                        title='登录'
                        onPress={() => profileStore.handleModal()}
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    visible={profileStore.loginShow}
                >
                    <View style={{
                        paddingTop: 20,
                        height: 60,
                        borderBottomColor: '#eeeeee',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Ionicons
                            name="md-close"
                            size={30}
                            color="rgba(153,153,153,1)"
                            style={{ textAlign: 'center', width: 50 }}
                            onPress={() => profileStore.handleModal()}

                        />
                        <Text style={{ fontSize: 18, textAlign: 'center', flex: 1 }}>登录</Text>
                        <Ionicons name="ios-close" size={25} color="#fff" style={{ textAlign: 'center', width: 50 }} />
                    </View>

                    <View style={{
                        marginRight: 25,
                        marginLeft: 10
                    }}>

                        <Text style={{ marginLeft: 15, marginTop: 10, color: 'rgba(113,172,55,1)', opacity: this.focus[0] ? 1 : 0 }}>手机号码</Text>
                        <InputItem
                            {...getFieldProps('phone', {
                                initialValue: '',
                                onChange: (val: any) => profileStore.handleInput(val, 'phone'),
                            }) }
                            clear
                            placeholder='请输入手机号码'
                            onFocus={() => { this.handleFocus(0) }}
                        />
                        <Text style={{ marginLeft: 15, marginTop: 5, color: 'rgba(113,172,55,1)', opacity: this.focus[1] ? 1 : 0 }}>密码</Text>
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
                            onPressOut={()=>this.submit()}
                        >登录</Button>
                    </View>
                </Modal>
            </View>
        );
    }
}

const MyLoginWrap = createForm()(MyLogin)

export default MyLoginWrap;