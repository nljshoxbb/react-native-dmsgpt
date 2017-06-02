import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    TextInput,
    Dimensions,
    Modal,
    ListView,
    ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios';
import {
    InputItem,
    Button,
    WhiteSpace,
    WingBlank,
    List,
    SearchBar
} from 'antd-mobile';
import { createForm } from 'rc-form';
import Ionicons from 'react-native-vector-icons/Ionicons';

import tools from '../../utils/tools.js';
import theme from '../../style/theme/default.js';
import MyButton from '../../components/MyButton';
import GetMsg from '../../components/GetMsg';
import { domain } from '../../configs';
import {
    verifyInfoApi,
    provinceApi
} from '../../configs/api';



const Item = List.Item;
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 5;

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
    @observable dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 != row2 })
    @observable phone = '';
    @observable verify_code = '';
    @observable codeImgSrc = domain + verifyInfoApi + '?imageW=100&imageH=40&';
    @observable modalShow = false;
    @observable searchValue = '';
    @observable selectName = 'province';
    @observable province = { name: '', id: '' };
    @observable city = { name: '', id: '' };
    @observable provinceList = [];
    @observable cityList = [];
    @observable loading = false;
    @observable

    componentDidMount() {
        this.getData();
    }

    @action getData = (province_id?: any) => {
        this.loading = true;
        axios.post(domain + provinceApi, tools.parseParam({ province_id }))
            .then(action('getData', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    const dataBlob = response.data.data;
                    this.loading = false;
                    if (this.selectName === 'province') {
                        this.provinceList = dataBlob;
                    } else {
                        this.cityList = dataBlob;
                    }
                    this.dataSource = this.dataSource.cloneWithRows(dataBlob);

                }
            }))
            .catch(function (error) {
                console.log(error);
            });
    }


    @action handleChange = (val?: any, name?: any) => {
        this[name] = val;
    }

    @action handleRefresh = () => {
        this.codeImgSrc = `${this.codeImgSrc}?time${+ new Date()}`;

    }

    @action handleModal = (name?: string) => {

        if (name === 'province' || name === 'city') {
            this.selectName = name;

            if (name === 'province') {
                this.dataSource = this.dataSource.cloneWithRows(this.provinceList.slice());
            }

        }
        this.modalShow = !this.modalShow;
    }

    @action handleSelect = (id: string, name: string) => {
        if (this.selectName == 'province') {
            this["province"] = { name, id };
            this.getData(id);
            this.selectName = 'city';
        } else {
            this["city"] = { name, id }
            this.handleModal();
        }
    }

    submit = () => {

    }

    _renderRow = (rowData: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.handleSelect(rowData.id, rowData.name)}>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16 }}>{rowData.name}</Text>
                </View>
            </TouchableWithoutFeedback>

        )
    }

    onChange = () => {

    }


    render() {
        const { profileStore, form, navigation } = this.props;
        const { getFieldProps, getFieldError } = form;

        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flex: 1 }}
                scrollEnabled={false}
            >

                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.modalShow}

                >
                    <View style={{ paddingTop: 20, flex: 1 }}>
                        <View >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons
                                    name="md-close"
                                    size={30}
                                    color={theme.color_text_desalt}
                                    style={{ textAlign: 'center', width: 50, alignItems: 'flex-end', opacity: 0 }}
                                    onPress={this.handleModal}
                                />
                                <View style={{ alignItems: 'center', flex: 1 }}><Text>选择省份</Text></View>
                                <Ionicons
                                    name="md-close"
                                    size={30}
                                    color={theme.color_text_desalt}
                                    style={{ textAlign: 'center', width: 50, alignItems: 'flex-end' }}
                                    onPress={this.handleModal}
                                />
                            </View>
                            <SearchBar
                                value={this.searchValue}
                                placeholder="搜索"
                                onSubmit={value => console.log(value, 'onSubmit')}
                                onClear={value => console.log(value, 'onClear')}
                                onFocus={() => console.log('onFocus')}
                                onBlur={() => console.log('onBlur')}
                                onCancel={() => console.log('onCancel')}
                                onChange={this.onChange}
                            />
                        </View>

                        {this.loading ?
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <ListView
                                dataSource={this.dataSource}
                                renderRow={this._renderRow}
                                initialListSize={10}
                                pageSize={4}
                                style={{ paddingLeft: 10, paddingRight: 10 }}
                            />
                        }
                    </View>
                </Modal>

                <WhiteSpace size="xl" />
                <InputItem
                    {...getFieldProps('phone', {
                        initialValue: '',
                        onChange: (val: any) => this.handleChange(val, 'phone'),
                    }) }
                    type="number"
                    clear
                    placeholder='请输入手机号码'
                />
                <WhiteSpace size="sm" />
                <InputItem
                    placeholder="请输入图形验证码"
                    onChange={(val?: any) => this.handleChange(val, 'verify_code')}
                    type="number"
                    extra={
                        <TouchableWithoutFeedback onPress={() => this.handleRefresh()}>
                            <Image source={{ uri: this.codeImgSrc }} style={{ width: 100, height: 35 }} />
                        </TouchableWithoutFeedback>

                    }
                />
                <WhiteSpace size="sm" />
                <InputItem
                    placeholder="请输入短信验证码"
                    extra={<GetMsg phone={this.phone} verify_code={this.verify_code} />}
                    {...getFieldProps('code', {
                        initialValue: '',
                        onChange: (val: any) => this.handleChange(val, 'code'),
                    }) }
                />
                <WhiteSpace size="xl" />
                <WingBlank>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 16 }}>您的收货城市</Text><Text style={{ color: theme.brand_primary, fontSize: 12, paddingLeft: 10 }}>(注册后不可修改)</Text>
                    </View>
                </WingBlank>
                <WhiteSpace size="lg" />
                <Item arrow="down" onPressIn={() => this.handleModal('province')} >
                    <Text style={{ fontSize: 16, color: this.province.name == '' ? theme.color_text_desalt : theme.brand_primary }}>{this.province.name == '' ? "请选择所在省份" : this.province.name}</Text>
                </Item>
                <WhiteSpace size="sm" />
                <Item arrow="down" onPressIn={() => this.handleModal('city')} >
                    <Text style={{ fontSize: 16, color: this.city.name == '' ? theme.color_text_desalt : theme.brand_primary }}>{this.city.name == '' ? "请选择所在城市" : this.city.name}</Text>
                </Item>
                <WhiteSpace size="sm" />
                <InputItem
                    placeholder="请输入密码"
                    onChange={(val?: any) => this.handleChange(val, 'password')}
                    extra={<Ionicons name="ios-eye" size={18} color="#cccccc" />}
                />
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Button
                        disabled={profileStore.canReg ? false : true}
                        type='primary'
                        onPressOut={() => this.submit()}
                    >立即注册</Button>
                </WingBlank>
                <WhiteSpace size="sm" />
            </KeyboardAwareScrollView>
        );
    }
}
const RegisterWrap = createForm()(Register)
export default RegisterWrap;