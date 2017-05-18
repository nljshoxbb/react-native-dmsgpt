import { observable, action, autorun, computed, runInAction } from 'mobx';
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
import RNFetchBlob from 'react-native-fetch-blob'

const IMG_LIST_KEY = '@Goodstore:imglist';
const SCROLL_LIST_KEY = '@Goodstore:scrollList';
const RECOMMEND_LIST_KEY = '@Goodstore:recommendList';
const NATIONAL_LIST_KEY = '@Goodstore:nationalList';
const COUNTRY_FRUIT_LIST_KEY = '@Goodstore:CountryFruitList';

class GoodStore {
    @observable imgList = new Array(0);
    @observable scrollList = new Array(0);
    @observable recommendList = new Array(0);
    @observable nationalList = new Array(0);
    @observable countryList = new Array(0);
    @observable refreshing = false;

    @observable data = '';
    @observable path = '';
    constructor() {
        this.test();

    }

    @action test() {

        // RNFetchBlob.config({
        //     fileCache: true
        // })
        //     .fetch('GET', 'http://og1rr0484.bkt.clouddn.com/2016-11-12_5826dae45bb51.jpg')
        //     .then((res) => {
        //         // remove cached file from storage
        //         // res.flush()

        //     });
        // RNFetchBlob.fs.readFile('/var/mobile/Containers/Data/Application/8396F5A5-7CEA-488B-AF3F-82B146BBDF9D/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_1e8cd38b-02b8-443f-8615-2562a005ae08', 'base64')
        //     .then(action((data: string) => {
        //         this.data = data;

        //     }))


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

    @action getCountryFruitList = async () => {
        await this.nationalList.forEach(async (item, idx) => {
            try {
                const responseData = await axios.post(domain + fruitListApi, tools.parseParam({ page: 1, len: 8, type: 1, nation_id: item.id }))
                runInAction('setCountryFruitList', () => {
                    if (responseData.data.code === 'SUCCESS') {
                        this.countryList.push(responseData.data.data);
                    } else {
                        this.countryList = [];
                    }
                    AsyncStorage.setItem(COUNTRY_FRUIT_LIST_KEY, JSON.stringify(this.countryList));

                })
            } catch (error) {
                console.log(error);
            }
        });
    }

    @action init = async () => {
        try {
            const value = await AsyncStorage.getItem('@Goodstore:imglist');

            if (value !== null) {
                AsyncStorage.multiGet([IMG_LIST_KEY, SCROLL_LIST_KEY, RECOMMEND_LIST_KEY, NATIONAL_LIST_KEY, COUNTRY_FRUIT_LIST_KEY], (err, stores: any) => {
                    stores.map((result: any, i: number, store: any) => {
                        let key = store[i][0];
                        let value = JSON.parse(store[i][1]);
                        runInAction('set local to state', () => {
                            switch (key) {
                                case IMG_LIST_KEY:
                                    this.imgList = value;
                                    break;
                                case SCROLL_LIST_KEY:
                                    this.scrollList = value;
                                    break;
                                case RECOMMEND_LIST_KEY:
                                    this.recommendList = value;
                                    break;
                                case NATIONAL_LIST_KEY:
                                    this.nationalList = value;
                                    break;
                                case COUNTRY_FRUIT_LIST_KEY:
                                    this.countryList = value;
                                    break;

                            }

                        })
                    });
                });

            } else {
                this.onRefresh();
            }


        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    }

    @action setToLocalStorage = async () => {
        const responseData = await axios.all([this.getBanner(), this.getNews(), this.getRecommandList(), this.getNationalList()]);
        responseData.forEach((responseData: any, idx: number) => {
            runInAction('init state', () => {

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
                        }
                        this.refreshing = false;
                        break;
                    default:
                        break;
                }
            })
        });

        const storageArr = [
            [IMG_LIST_KEY, JSON.stringify(this.imgList)],
            [SCROLL_LIST_KEY, JSON.stringify(this.scrollList)],
            [RECOMMEND_LIST_KEY, JSON.stringify(this.recommendList)],
            [NATIONAL_LIST_KEY, JSON.stringify(this.nationalList)],
        ]

        AsyncStorage.multiSet(storageArr, (error) => {
            console.log(error)
        })
    }


    @action onRefresh() {
        this.refreshing = true;
        this.setToLocalStorage();
    }


}

export default new GoodStore();