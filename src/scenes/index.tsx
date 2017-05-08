import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import Goods from './goods';
import Orders from './orders';
import User from './user';

import styles from './style';

const RouterIndex = TabNavigator({
    Goods: {
        screen: Goods,
        navigationOptions: () => ({
            tabBarLabel: "货源",
            title: '货源',
            tabBarIcon: ({ tintColor }) => (
                <Text>123</Text>
            )
        })
    },
    Orders: { screen: Orders },
    User: { screen: User }
}, {
        tabBarOptions: {
            activeTintColor: '#108ee9'
        },
        animationEnabled: true,
        lazy: true,
        initialRouteName: "Goods"
    })



export default RouterIndex;