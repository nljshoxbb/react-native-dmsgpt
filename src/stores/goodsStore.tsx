import { observable, action, autorun, computed } from 'mobx';
import { bannerApi } from '../configs/api';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';
import axios from 'axios';

class GoodStore {
    @observable imgList = new Array(0);
    @observable num = [];
    constructor() {

    }

    @action getBanner() {
        axios.get(domain + bannerApi)
            .then(action('getBanner', (response: any) => {
                console.log(response.data.data);
                if (response.data.status === 1) {
                    this.imgList = response.data.data;

                }

            }))
            .catch(function (error) {
                console.log(error);
            });

    }

    @action onClick() {
        this.num.push('a');
    }


}

export default new GoodStore();