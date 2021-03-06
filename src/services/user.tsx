import {
    loginApi,
    refreshTokenApi
} from '../configs/api';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';
import axios from 'axios';


export function login(param: any) {
    return axios.post(domain + loginApi, tools.parseParam(param));
}

export function refreshToken(param: { refresh_token: string }) {
    return axios.post(domain + refreshTokenApi, tools.parseParam(param));
}