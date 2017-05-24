import React, { Component, SFC } from 'react';
import {
    Animated,
    View,
    Platform,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Props {
    style?: any,
    changeListType: any,
    listType: any
}

const SelectBar: SFC<Props> = ({
    changeListType,
    listType,
    style
 }) => {

    return (
        <View style={style} >
            <View style={{ backgroundColor: '#fff', flexDirection: 'row', flex: 1 }}>
                <View style={[styles.sectionHeaderBox]}>
                    <Text style={{ paddingRight: 5 }}>不限分类</Text>
                    <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                </View>
                <View style={[styles.sectionHeaderBox]}>
                    <Text style={{ paddingRight: 5 }}>不限产地</Text>
                    <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                </View>
                <View style={[styles.sectionHeaderBox]}>
                    <Text style={{ paddingRight: 5 }}>十大推荐</Text>
                    <Ionicons name="md-arrow-dropdown" size={18} color="#cccccc" />
                </View>
                <TouchableWithoutFeedback onPress={() => changeListType()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 10, width: 50, paddingRight: 10 }}>
                        {listType ? <Ionicons name="md-apps" size={28} color="#cccccc" /> : <Ionicons name="ios-list" size={28} color="#cccccc" />}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    sectionHeaderBox: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
})


export default SelectBar;