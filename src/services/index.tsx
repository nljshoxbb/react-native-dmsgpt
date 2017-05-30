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
import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const IMG_LIST_KEY = '@Goodstore:imglist';
const SCROLL_LIST_KEY = '@Goodstore:scrollList';
const RECOMMEND_LIST_KEY = '@Goodstore:recommendList';
const NATIONAL_LIST_KEY = '@Goodstore:nationalList';
const COUNTRY_FRUIT_LIST_KEY = '@Goodstore:CountryFruitList';

export function getNewsList(param = { page: 1, len: 5, c_id: 1 }) {
    return axios.post(domain + newsApi, tools.parseParam(param));
}

export function getBannerList() {
    return axios.get(domain + bannerApi)
}