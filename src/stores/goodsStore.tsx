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
    @observable refreshing = false;

    constructor() {

    }

    getBanner() {
        return axios.get(domain + bannerApi)
    }

    //新鲜事
    getNews() {
        return axios.post(domain + newsApi, tools.parseParam({ page: 1, len: 5, c_id: 1 }))
    }
    //推荐
    getRecommandList() {
        return axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 8, type: 1 }))
    }

    @action getNationalList() {
        return axios.post(domain + nationListApi, tools.parseParam({ page: 1, len: 3 }))
    }

    @action getCountryFruitList() {
        this.nationalList.forEach((item, idx) => {
            axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 8, type: 1, nation_id: item.id }))
                .then(action('getCountryFruitList', (response: any) => {
                    this.refreshing = false;
                    if (response.data.code === 'SUCCESS') {
                        this.countryList.push(response.data.data);
                    } else {
                        this.countryList = [];
                    }

                }))
        });


    }

    @action init() {
        this.refreshing = true;
        axios.all([this.getBanner(), this.getNews(), this.getRecommandList(), this.getNationalList()])
            .then(action('init', (acctArray?: any, perms?: any) => {
                acctArray.forEach((responseData: any, idx: number) => {
                    switch (idx) {
                        case 0:
                            this.imgList = responseData.data.status === 1 ? responseData.data.data : [];
                            break;
                        case 1:
                            this.scrollList = responseData.data.code === "SUCCESS" ? responseData.data.data : [];
                            break;
                        case 2:
                            this.recommendList = responseData.data.code === "SUCCESS" ? responseData.data.data : [];
                            break;
                        case 3:
                            if (responseData.data.code === 'SUCCESS') {
                                this.nationalList = responseData.data.data.slice(0, 3);
                                this.getCountryFruitList();
                            } else {
                                this.nationalList = [];
                                this.refreshing = false;
                            }
                            break;
                        default:
                            break;
                    }

                })
            }), (error) => {
                // Logs "foo" everytime
                console.log(error.message)
            })

    }

    onRefresh() {
        this.init();
    }


}

export default new GoodStore();