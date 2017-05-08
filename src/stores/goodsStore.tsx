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
        axios.post(domain + newsApi, {
            page: 1,
            len: 5,
            c_id: 1
        })
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
        axios.post(domain + fruitListApi, {
            page: 1,
            len: 20,
            type: 1,
            recommend: 1
        })
            .then(action('getRecommandList', (response: any) => {
                 console.log(response)
                if (response.data.code === 'SUCCESS') {
                    this.recommendList = response.data.data;
                }

            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    @action getNationalList() {
        axios.post(domain + nationListApi, {
            page: 1,
            len: 8,
        })
            .then(action('getNationalList', (response: any) => {
               
                if (response.data.code === 'SUCCESS') {
                    this.nationalList = response.data.data;
                }

            }))
            .catch(function (error) {
                console.log(error);
            });
    }



    @action onClick() {

    }


}

export default new GoodStore();