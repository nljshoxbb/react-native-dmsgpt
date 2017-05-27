

import React, { Component, SFC } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text
} from 'react-native';
import { CachedImage, ImageCache } from "react-native-img-cache";
interface Props {
    rowData?: any,
    navigation: any
}

import theme from '../../style/theme/default.js';

const HorizontalRowItem: SFC<Props> = ({
    rowData,
    navigation
}) => {
    const observer = (path: string) => {
        console.log(`path of the image in the cache: ${path}`);
    };
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Article', { id: rowData.id })}>
            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center', padding: 5 }}  >
                <CachedImage
                    resizeMode="cover"
                    style={{ height: 70, width: 70 }}
                    source={{ uri: rowData.listpic + '?imageView2/2/w/150/h/150/interlace/1' }}
                />
                <Text style={{ padding: 10 }}>{rowData.title}</Text>
                <Text style={[{ fontSize: 12, color: theme.color_text_secondary }]}>{rowData.intro.length > 10 ? rowData.intro.slice(0, 10) : rowData.intro}...</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}



export default HorizontalRowItem;

