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

class GoodStore {
    @observable imgList = new Array(0);
    @observable scrollList = new Array(0);
    @observable recommendList = new Array(0);
    @observable nationalList = new Array(0);
    @observable countryList = new Array(0);

    constructor() {

    }

    @action getBanner() {
        axios.get(domain + bannerApi)
            .then(action('getBanner', (response: any) => {
                if (response.data.status === 1) {
                    this.imgList = response.data.data;

                }

            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    //新鲜事
    @action getScrollList() {
        axios.post(domain + newsApi, tools.parseParam({ page: 1, len: 5, c_id: 1 }))
            .then(action('getScrollList', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    this.scrollList = response.data.data;
                }
            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    @action getRecommandList() {
        axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 8, type: 1 }))
            .then(action('getScrollList', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    this.recommendList = response.data.data;
                }
            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    @action getNationalList() {
        axios.post(domain + nationListApi, tools.parseParam({ page: 1, len: 3 }))
            .then(action('getNationalList', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    this.nationalList = response.data.data.slice(0, 3);
                    this.getCountryFruitList();
                }
            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    @action getCountryFruitList() {
        this.nationalList.forEach((item, idx) => {
            axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 8, type: 1, nation_id: item.id }))
                .then(action('getCountryFruitList', (response: any) => {
                    if (response.data.code === 'SUCCESS') {
                        this.countryList.push(response.data.data);
                    }
                }))
        });


    }

    @action init() {
        this.getScrollList();
        this.getRecommandList();
        this.getBanner();
        this.getNationalList();
    }

    @action onClick() {

    }


}

export default new GoodStore();