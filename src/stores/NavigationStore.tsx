import { observable, action, autorun, computed } from 'mobx';
import { domain } from '../configs/index';
import tools from '../utils/tools.js';

// import Goods from '../scenes/goods';
// import Orders from '../scenes/orders';
// import User from '../scenes/user';
// import Purchase from '../scenes/purchase';

// import styles from '../scenes/style';
// import FruitList from '../scenes/fruitList';
// import Article from '../scenes/article';
// import Register from '../scenes/register';
// import Login from '../scenes/login';

import App from '../index';

class NavigationStore {

    @observable headerTitle = "Index"
    @observable.ref navigationState = {
        index: 0,
        routes: [
            { key: "Index", routeName: "Index" },
        ],
    }

    // NOTE: the second param, is to avoid stacking and reset the nav state
    @action dispatch = (action, stackNavState = true) => {
        const previousNavState = stackNavState ? this.navigationState : null;
        return this.navigationState = App
            .router
            .getStateForAction(action, previousNavState);
    }




}

export default new NavigationStore();