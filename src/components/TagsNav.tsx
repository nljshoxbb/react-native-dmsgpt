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
    list: Array<any>,
    onPress: any,
    active: any,
    contentWidth: any,
    
}

import theme from '../style/theme/default.js';
import Ionicons from 'react-native-vector-icons/Ionicons';


class TagsNav extends Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showFull: false
        }
    }

    handleClick = () => {
        this.setState({ showFull: !this.state.showFull });
    }

    render() {

        const { list, active, onPress, contentWidth } = this.props;
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: theme.brand_desalt_background
            }}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            flexWrap: "wrap",
                            width: this.state.showFull ? contentWidth - 10 : null,
                            paddingBottom: 10,
                            alignContent: 'center'
                        }}
                        showsHorizontalScrollIndicator={false}>
                        {list.map((item: any) => {
                            return (
                                <TouchableWithoutFeedback key={item.name} onPress={() => { onPress(item.id) }}>
                                    <View
                                        style={[styles.tag, { borderColor: active == item.id ? theme.brand_warning : "rgba(224,224,224,1)" }]}>
                                        <Text style={{ fontSize: 12, color: active == item.id ? theme.brand_warning : theme.color_text_base }}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 13, flexDirection: 'row' }}>
                    <Ionicons
                        onPress={this.handleClick}
                        name="ios-arrow-down"
                        size={16}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tag: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginTop: 10,
        marginRight: 20
    }
})

export default TagsNav;

