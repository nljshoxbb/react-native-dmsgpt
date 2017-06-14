import {
    goodsListApi,
    categoryListApi,
    bacthAddShoppingCartApi,
    shoppingCartListApi
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


export function bacthAddShoppingCart(param: { basket: string }) {
    return axios.post(domain + bacthAddShoppingCartApi, tools.parseParam(param));
}

export function getShoppingCartList(){
    return axios.post(domain + shoppingCartListApi);
}