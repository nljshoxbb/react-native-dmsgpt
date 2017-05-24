import { observable, action, autorun, computed } from 'mobx';
import {
    bannerApi,
    newsApi,
    fruitListApi,
    newAfficheApi,
    nationListApi
} from '../configs/api';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';
import axios from 'axios';
import { ListView } from 'react-native';

class profileStore {
    @observable refreshing = false;
    @observable loginShow = false;
    @observable phone = '';
    @observable password = '';

    constructor() {

    }

    @computed get canLogin() {
        return !!this.phone && !!this.password
    }

    @action getProfileInfo() {
        // axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 30, type: 1, refreshing: 1, nation_id: this.nation.id }))
        //     .then(action('getFruitList', (response: any) => {
        //         if (response.data.code === 'SUCCESS') {
        //             const dataBlob = response.data.data;
        //             this.list = dataBlob;
        //             this.refreshing = false;

        //         }
        //     }))
        //     .catch(function (error) {
        //         console.log(error);
        //     });
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