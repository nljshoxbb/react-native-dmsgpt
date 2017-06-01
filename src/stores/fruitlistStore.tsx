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
    @observable list = [];
    @observable refreshing = false;
    @observable nation = {
        id: '',
        name: ''
    }

    constructor() {

    }
    dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    @computed get fruitList() {
        return this.dataSource.cloneWithRowsAndSections([this.list.slice()]);
    }


    @action getFruitList() {
        axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 30, type: 1, refreshing: 1, nation_id: this.nation.id }))
            .then(action('getFruitList', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    const dataBlob = response.data.data;
                    this.list = dataBlob;
                    this.refreshing = false;

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

    @action changeListType() {
        this.listType = !this.listType;
        this.list = this.list.slice();
    }

    @action setNation(id: string, name: string) {
        this.nation.id = id;
        this.nation.name = name
    }
    @action onRefresh() {
        this.list = [];
        this.refreshing = true;
    }

}

export default new fruitlistStore();