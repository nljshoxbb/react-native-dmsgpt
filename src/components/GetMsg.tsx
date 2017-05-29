import React, { Component, PropTypes } from 'react';

import {
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Button,
    Toast
} from 'antd-mobile';
import {
    View,
} from 'react-native';
import {
    verifyCodeApi
} from '../configs/api';
import axios from 'axios';
import { domain } from '../configs';
import tools from '../utils/tools.js';
function myTrim(x) {
    return x.replace(/\s+/g, "");
}

interface Props {
    phone: any,
    verify_code: any
}

class GetMessage extends Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            canClick: true,
            overtime: 60
        }
        this.timer = null;

    }


    handleGetCode = () => {
        let { phone, verify_code } = this.props;
        const { overtime } = this.state;
        Toast.loading('发送中', 1, () => {
            console.log('加载完成!!!');
        });
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        axios.post(domain + verifyCodeApi, tools.parseParam({ phone: myTrim(phone), verify_code: verify_code }))
            .then((response: any) => {
                console.log(response)
                if (response.data.code === 'SUCCESS') {
                    const dataBlob = response.data.data;
                    Toast.loading('发送成功', 0.5, () => {
                        console.log('加载完成!!!');
                    });
                    this.setState({ canClick: false });
                    this.timer = setInterval(this.handleInterval, 1000);
                } else {
                    Toast.fail(response.data.info, 1);
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    handleInterval = () => {
        const { overtime } = this.state;
        if (overtime == 1) {
            clearInterval(this.timer);
            this.setState({ canClick: true, overtime: 60 });
        } else {
            this.setState({ overtime: this.state.overtime - 1 });
        }
    }

    render() {
        const { canClick, overtime } = this.state;
        return (
            <View>
                <Button
                    type="ghost"
                    disabled={canClick ? false : true}
                    size="small"
                    loading={false}
                    onPressIn={canClick ? this.handleGetCode : ''}
                >{canClick ? "点击获取" : `重新发送(${overtime})`}</Button>
            </View>
        );
    }
}


export default GetMessage;