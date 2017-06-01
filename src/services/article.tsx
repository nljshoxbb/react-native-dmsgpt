import {
    articleApi,
} from '../configs/api';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';
import axios from 'axios';

export function getArticle(param: any) {
    return axios.get(domain + articleApi + '?' + tools.parseParam(param))
}