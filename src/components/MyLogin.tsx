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
import theme from '../style/theme/default.js';

interface Props {
    profileStore: any,
    form?: any,
    navigation: any
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
        const { profileStore, navigation } = this.props;
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <StatusBar
                    barStyle={"light-content"}
                />
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ color: theme.color_text_desalt, fontSize: 18 }}>您尚未登录，请先登录</Text>
                    <MyButton
                        title='登录'
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </View>
        );
    }
}



export default MyLogin;