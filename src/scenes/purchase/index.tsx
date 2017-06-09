import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
    Animated,
    RefreshControl,
    Platform,
    TextInput,
    Modal,
    ListView,
    ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme/default.js';
import LoginComp from '../../components/LoginComp';
import TagsNav from '../../components/TagsNav';
import NavList from '../../components/NavList';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { DEVICE_WIDTH, isEmptyObj, indexOf } from '../../utils';

const NavWidth = DEVICE_WIDTH * (30 / 100);
const contentWidth = DEVICE_WIDTH * (70 / 100);

import List from './List';
import SearchBar from './SearchBar';


@connect(({ user, purchase, main }) => ({ user, purchase, main }))
class Purchase extends Component<any, any> {
    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            header: null
        })
    }

    render() {
       
        const { user, main, purchase, dispatch } = this.props;
        const { userInfo } = user;
        const { categoryList, category_id, goodsDataSource, nation_id, navList, refreshing, loading } = purchase;
        return (
            <View style={{ flex: 1, backgroundColor: theme.brand_desalt_background }}>
                <SearchBar submit={(value: any) => dispatch({ type: 'purchase/getGoodsList', payload: { name: value, loadType: 'init' } })} />
                {isEmptyObj(userInfo) ?
                    <LoginComp {...this.props} /> :
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <NavList
                            navList={navList}
                            NavWidth={NavWidth}
                            active={nation_id}
                            onPress={(item: any) => {
                                dispatch({ type: 'purchase/setNationId', payload: { nation_id: item.id } });
                                dispatch({ type: 'purchase/getGoodsList', payload: { nation_id: item.id, loadType: 'switch' } });
                            }}
                        />
                        <View style={{ width: contentWidth }}>
                            <TagsNav
                                list={categoryList}
                                active={category_id}
                                onPress={(id: number | string) => {
                                    dispatch({ type: 'purchase/setCategoryId', payload: { category_id: id } })
                                    dispatch({ type: 'purchase/getGoodsList', payload: { loadType: 'init' } })
                                }}
                                contentWidth={contentWidth}
                            />
                            <List  />
                        </View>
                    </View>
                }

            </View>

        );
    }
}


export default Purchase;
