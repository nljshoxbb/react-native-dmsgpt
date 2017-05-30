import { observable, action, autorun, computed } from 'mobx';
import {
    bannerApi,
    newsApi,
    fruitListApi,
    newAfficheApi,
    nationListApi,
    loginApi
} from '../configs/api';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';
import axios from 'axios';
import { ListView } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import {
    Toast
} from 'antd-mobile';

class profileStore {
    @observable refreshing = false;
    @observable loginShow = false;
    @observable phone = '';
    @observable password = '';
    @observable code = '';


    constructor() {

    }

    @computed get canLogin() {
        return !!this.phone && !!this.password
    }

    @computed get canReg() {
        return !!this.phone && !!this.password && !!this.code
    }

    @action login(value) {
        Toast.loading('正在登陆', 100)
        axios.post(domain + loginApi, tools.parseParam(value))
            .then(action('login', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    Toast.success(response.data.info)
                }
            }))
    }

    @action getProfileInfo() {

    }

    @action handleModal() {
        this.loginShow = !this.loginShow;
    }

    @action handleInput(val: string, name: string) {
        this[name] = val;
    }

    @action LoginSubmit(value: any) {
        console.log(value);
    }

}

export default new profileStore();