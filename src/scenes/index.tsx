import React, { Component, PureComponent } from 'react';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    addNavigationHelpers,
    NavigationActions
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'dva';
import { BackAndroid } from 'react-native';

import IndexScreen from './indexScreen';
import Orders from './orders';
import User from './user';
import Purchase from './purchase';
import FruitList from './fruitList';
import Article from './article';
import Register from './register';
import Login from './login';


const HomeNavigator = TabNavigator({
    IndexScreen: {
        screen: IndexScreen,
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
            tabBarLabel: "采购单",
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-paper-outline" size={30} color={tintColor} />
            )
        })
    },
    User: {
        screen: User,
        navigationOptions: () => ({
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="user-o" size={28} color={tintColor} />
            )
        })
    }
}, {
        tabBarOptions: {
            activeTintColor: '#70a938'
        },
        animationEnabled: false,
        tabBarPosition: 'bottom',
        lazy: true,
        initialRouteName: "IndexScreen"
    });


const MainNavigator = StackNavigator(
    {
        HomeNavigator: {
            screen: HomeNavigator,
            navigationOptions: ({ navigation }) => ({
                header: null
            }),
        },
        FruitList: { screen: FruitList, },
        Article: { screen: Article, },

    }, {
        headerMode: 'screen',
        initialRouteName: "HomeNavigator"
    }
)

const AppNavigator = StackNavigator(
    {
        Main: { screen: MainNavigator },
        Login: { screen: Login },
        Register: { screen: Register }
    },
    {
        // headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

function getCurrentScreen(navigationState: any) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentScreen(route);
    }
    return route.routeName;
}

@connect(({ router }: { router?: any }) => ({ router }))
class Router extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false;
    }

    render() {
        const { dispatch, router } = this.props
        const navigation = addNavigationHelpers({ dispatch, state: router })
        return <AppNavigator navigation={navigation} />
    }
}

export function routerReducer(state: any, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default Router;