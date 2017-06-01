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
import { connect } from 'dva';
interface Props {
    form?: any,
    navigation: any,
    user: any,
    dispatch?: any
}

@connect(({ user }: { user?: any }) => ({ user }))
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
        super(props);
        this.state = {
            focus: [false, false]
        }
    }


    handleFocus = (idx: number) => {
        let focus = [false, false];
        focus[idx] = !focus[idx];
        this.setState({ focus });
    }

    handleBlur = () => {
        this.setState({ focus: [false, false] });
    }

    submit() {
        const { dispatch, form } = this.props;
        form.validateFields((error?: any, value?: any) => {
            // this.props.profileStore.login(value);
            dispatch({ type: 'user/login', payload: value });
        });
    }

    render() {
        const { form, navigation, user, dispatch } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <StatusBar animated barStyle='default' />
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: 25, marginLeft: 10 }}>
                        <Text style={{
                            marginLeft: 15,
                            marginTop: 10,
                            color: this.state.focus[0] ? theme.brand_primary : theme.color_text_desalt,
                            opacity: user.phone ? 1 : 0
                        }}>手机号码</Text>
                        <InputItem
                            {...getFieldProps('phone', {
                                initialValue: '',
                                onChange: (val: any) => dispatch({ type: 'user/getInputValue', payload: { phone: val } }),
                            }) }
                            type="number"
                            clear
                            placeholder='请输入手机号码'
                            onFocus={() => { this.handleFocus(0) }}
                            onBlur={this.handleBlur}
                        />
                        <Text style={{
                            marginLeft: 15,
                            marginTop: 5,
                            color: this.state.focus[1] ? theme.brand_primary : theme.color_text_desalt,
                            opacity: user.password ? 1 : 0
                        }}>密码</Text>
                        <InputItem
                            {...getFieldProps('password', {
                                initialValue: '',
                                onChange: (val: any) => dispatch({ type: 'user/getInputValue', payload: { password: val } }),
                            }) }
                            clear
                            type="password"
                            placeholder='请输入密码'
                            onFocus={() => { this.handleFocus(1) }}
                            onBlur={this.handleBlur}
                        />

                    </View>
                    <View style={{ margin: 25 }}>
                        <Button
                            disabled={(!!user.phone && !!user.password) ? false : true}
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