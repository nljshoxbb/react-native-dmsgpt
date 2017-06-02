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

export function getBannerList() {
    return axios.get(domain + bannerApi);
}
//新鲜事
export function getNewsList(param = { page: 1, len: 5, c_id: 1 }) {
    return axios.post(domain + newsApi, tools.parseParam(param));
}

//推荐
export function getRecommandList(param = { page: 1, len: 8, type: 1 }) {
    return axios.post(domain + fruitListApi, tools.parseParam(param));
}

//
export function getNationalList() {
    return axios.post(domain + nationListApi, tools.parseParam({ page: 1, len: 3 }))
}

export function getCountryFruitList(param: any) {
    return axios.post(domain + fruitListApi, tools.parseParam(param))
}

export function getAll() {
    return axios.all([getBannerList(), getNewsList(), getRecommandList(), getNationalList()]);
}