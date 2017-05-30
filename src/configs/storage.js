// export const domain = "http://durian.wkidt.com";
import { AsyncStorage } from 'react-native';

export const IMG_LIST_KEY = '@Goodstore:imglist';
export const SCROLL_LIST_KEY = '@Goodstore:scrollList';
export const RECOMMEND_LIST_KEY = '@Goodstore:recommendList';
export const NATIONAL_LIST_KEY = '@Goodstore:nationalList';
export const COUNTRY_FRUIT_LIST_KEY = '@Goodstore:CountryFruitList';

export const multiConnect = (arr) => {
    return AsyncStorage.multiGet(arr)
}

export const singleConnect = (key) => {
    return AsyncStorage.getItem(key);
}

export const multiSet = (arr) => {
    return AsyncStorage.multiSet(arr);
}

export const multiRemove = (arr) => {
    return AsyncStorage.multiRemove(arr);
}