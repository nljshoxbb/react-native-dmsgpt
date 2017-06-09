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

import { connect } from 'dva';
class SearchBar extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    handleInput = (e) => {
        this.setState({ name: e });
    }

    submit = () => {
        console.log(111)
        if (this.props.submit) {
            this.props.submit(this.state.name);
        }
    }
    render() {
        return (
            <View style={{ paddingTop: 20, height: 64, backgroundColor: theme.brand_primary }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.headWapper}>
                        <TextInput
                            placeholder="搜索关键词"
                            placeholderTextColor={theme.brand_primary}
                            style={styles.searchInput}
                            onChangeText={this.handleInput}
                            value={this.state.name}
                        />
                        <TouchableWithoutFeedback onPress={this.submit}>
                            <View style={styles.searchIcon}>
                                <Ionicons name="ios-search" size={23} color="#fff" />
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    <View style={styles.headRight}>
                        <Ionicons name="ios-chatbubbles" size={25} color="#fff" />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headWapper: {
        position: 'relative',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        height: 30,
    },
    searchInput: {
        height: 30,
        flex: 1,
        borderRadius: 16,
        backgroundColor: 'rgba(149,205,92,1)',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        color: '#fff'
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
        backgroundColor: 'rgba(149,205,92,1)',
        top: 3
    },
    headRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 15
    },

})
export default SearchBar;
