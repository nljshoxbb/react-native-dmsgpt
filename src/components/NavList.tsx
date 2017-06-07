import Swiper from 'react-native-swiper';
import React, { Component, SFC } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import { connect } from 'dva';
import { CachedImage, ImageCache } from "react-native-img-cache";
interface Props {
    navList: Array<any>,
    NavWidth: any,
    active: any,
    onPress: any
}

import theme from '../style/theme/default.js';
import Ionicons from 'react-native-vector-icons/Ionicons';


class NavList extends Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            active: 0
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active != this.state.active) {
            this.setState({ active: nextProps.active });
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    render() {
        const { onPress, navList, NavWidth, active } = this.props;
       
        return (
            <ScrollView style={{ width: NavWidth, backgroundColor: '#fff', marginRight: 10, }}>
                {navList.map((item) => {
                   
                    return (
                        <TouchableWithoutFeedback
                            key={item.id}
                            onPress={() => onPress(item)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    height: 44,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.brand_desalt_background,
                                    alignItems: 'center',
                                    backgroundColor: active == item.id ? theme.brand_desalt_background : '#fff',
                                }}>
                                <View style={{
                                    backgroundColor: theme.brand_primary,
                                    width: 3,
                                    height: 20,
                                    opacity: item.id == active ? 1 : 0
                                }}></View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, textAlignVertical: 'center' }}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    )
                })}
            </ScrollView>
        )
    }
}


export default NavList;

