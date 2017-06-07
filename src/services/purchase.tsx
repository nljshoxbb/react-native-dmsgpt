import {
    goodsListApi,
    categoryListApi
} from '../configs/api';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';
import axios from 'axios';


export function getGoodsList(param: { refresh_token: string }) {
    return axios.post(domain + goodsListApi, tools.parseParam(param));
}

export function getCategoryList(param: { id: string }) {
    return axios.post(domain + categoryListApi, tools.parseParam(param));
}