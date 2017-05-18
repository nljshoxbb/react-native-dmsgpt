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

const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

class fruitlistStore {
    @observable fruitList = dataSource;
    @observable loading = true;

    constructor() {

    }



    @action getFruitList() {
       
        axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 30, type: 1, refreshing: 1 }))
            .then(action('getFruitList', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    const dataBlob = response.data.data;
                    this.fruitList = dataSource.cloneWithRowsAndSections([dataBlob]);
                    this.loading = false;

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