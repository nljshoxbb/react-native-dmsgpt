import React, { Component } from 'react';
import { connect } from 'dva';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BackAndroid, View, Text } from 'react-native';
const TabIcon = ({
    purchase,
    tintColor
}) => {
    const num = purchase.purchaseList.length;
    return (
        <View style={{ position: 'relative' }}>
            <Ionicons name="ios-paper-outline" size={30} color={tintColor} />
            {num == 0 ? null :
                <View style={{ position: 'absolute', right: -15, top: 0, backgroundColor: 'red', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 10 }}>{num}</Text>
                </View>}
        </View>
    )
};

export default connect(({
    purchase
}) => ({
        purchase
    }))(TabIcon);