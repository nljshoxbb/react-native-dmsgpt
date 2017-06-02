import { observable, action, autorun, computed } from 'mobx';
import {
    bannerApi,
    newsApi,
    fruitListApi,
    newAfficheApi,
    nationListApi,
    articleApi
} from '../configs/api';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';
import axios from 'axios';

class GoodStore {
    @observable article = {};
    @observable loading = true;
    constructor() {

    }

    @action getArticle(id: string) {
        this.loading = true
        axios.get(domain + articleApi + "?id=" + id)
            .then(action('getArticle', (response: any) => {
                if (response.data.code === 'SUCCESS') {
                    this.article = response.data.data;
                    this.loading = false;
                }
            }))
            .catch(function (error) {
                console.log(error);
            });
    }



}

export default new GoodStore();