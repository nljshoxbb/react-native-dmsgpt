import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Goods from './goods';
import Orders from './orders';
import User from './user';
import Purchase from './purchase';

import styles from './style';

const RouterIndex = TabNavigator({
    Goods: {
        screen: Goods,
        navigationOptions: () => ({
            tabBarLabel: "货源",
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-home-outline" size={30} color={tintColor} />
            )
        })
    },
    Purchase: {
        screen: Purchase,
        navigationOptions: () => ({
            tabBarLabel: "采购",
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-cart-outline" size={30} color={tintColor} />
            )
        })
    },
    Orders: {
        screen: Orders,
        navigationOptions: () => ({
            tabBarLabel: "采购",
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-paper-outline" size={30} color={tintColor} />
            )
        })
    },
    User: {
        screen: User,
        navigationOptions: () => ({
            tabBarLabel: "采购",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="user-o" size={28} color={tintColor} />
            )
        })
    }
}, {
        tabBarOptions: {
            activeTintColor: '#70a938'
        },
        // animationEnabled: true,
        lazy: true,
        initialRouteName: "Goods"
    })



export default RouterIndex;