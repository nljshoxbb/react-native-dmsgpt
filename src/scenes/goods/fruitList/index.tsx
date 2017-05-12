import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    ListView,
    Animated,
    StatusBar
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { observable, useStrict } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';
import Swiper from 'react-native-swiper';
import { styles } from './styles';

type Banner = null;

@observer(['fruitlistStore', 'goodsStore'])
class FruitList extends Component<any, any> {
    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            tabBarVisible: false,
            headerBackTitle: null,
            headerTintColor: '#fff',
            headerStyle: {
                position: 'absolute',
                height: 60,
                backgroundColor: 'rgba(113,172,55,1)',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                opacity: state.params.opacity != 1 ? 0 : 1
            }
        })
    }

    _banner: Banner;
    constructor(props: any) {
        super(props);

    }

    componentDidMount() {

    }


    _renderRow(rowData: any) {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: rowData.listpic + '?imageView2/1/w/200/h/200' }}
                    style={{ height: 100, width: 100 }}
                />
            </View>
        )
    }

    _onChangeVisibleRows(visibleRows: any, changedRows: any) {
        // console.log(visibleRows, changedRows);
    }

    _onScroll = (event?: any) => {
        if (event.nativeEvent.contentOffset.y > 160) {
            this.props.navigation.setParams({ opacity: 1 })
        } else {
            this.props.navigation.setParams({ opacity: 0 })
        }
    }

    render() {
        const { goodsStore, fruitlistStore } = this.props;

        return (
            <View style={{ flex: 1 }}>
                
                <ListView
                    dataSource={fruitlistStore.fruitList}
                    onChangeVisibleRows={this._onChangeVisibleRows}
                    renderRow={this._renderRow}
                    onScroll={this._onScroll}
                    renderHeader={() => (
                        <View>
                            <Swiper
                                height={160}
                                autoplay
                                activeDotColor='green'
                                dot={<View style={styles.dot} />}
                            //showsButtons
                            >
                                {goodsStore.imgList.map((item: any) => {
                                    return (
                                        <View key={item.id}>
                                            <Image
                                                source={{ uri: item.imgurl }}
                                                style={{ height: 160 }}
                                                resizeMode="cover"

                                            />
                                        </View>
                                    )
                                })}
                            </Swiper>
                        </View>

                    )
                    }
                >


                </ListView >
            </View>

        );
    }
}

export default FruitList;