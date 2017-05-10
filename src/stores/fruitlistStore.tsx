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

class fruitlistStore {
    @observable fruitList: any = [];

    constructor() {
        this.init()
    }



    @action getFruitList() {
        axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 20, type: 1 }))
            .then(action('getScrollList', (response: any) => {

                if (response.data.code === 'SUCCESS') {
                    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
                    this.fruitList = ds.cloneWithRows(response.data.data);
                }
            }))
            .catch(function (error) {
                console.log(error);
            });
    }



    @action init() {
        this.getFruitList();
    }

    @action onClick() {

    }


}

export default new fruitlistStore();