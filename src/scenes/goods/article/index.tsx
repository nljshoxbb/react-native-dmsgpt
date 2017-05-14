import React, { Component, SFC } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    WebView
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { observer, inject } from 'mobx-react';

@inject("articleStore") @observer
class Article extends Component<any, any> {
    static navigationOptions = ({ navigation }: { navigation?: any }) => {
        const { state } = navigation;
        return ({
            tabBarVisible: false,
            headerBackTitle: null,
            headerTintColor: '#fff',
            headerTitle: '详情',
            headerStyle: {
                position: 'absolute',
                height: 64,
                backgroundColor: 'rgba(113,172,55,1)',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
            }
        })
    }

    componentDidMount() {
        const { articleStore, navigation } = this.props;
        articleStore.getArticle(navigation.state.params.id);

    }


    render() {
        const { article } = this.props.articleStore;
        const HTML = `
                <!DOCTYPE html>\n
                <html>
                <head>
                    <title>HTML字符串</title>
                    <meta http-equiv="content-type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=320, user-scalable=no">
                    <style type="text/css">
                    body {
                        margin: 0;
                        padding: 0;
                        font: 62.5% arial, sans-serif;
                       
                    }
                  
                    img{
                        max-width:100%;
                        height:auto !important;
                        
                    }
                    p{
                        text-indent:0!important
                    }
                    </style>
                </head>
                <body>
                    <div >
                        <div style="border-bottom:solid 1px #eee;padding:10px">
                            <h2>${article.title}</h2>
                            <div style="font-size:12px;">${article.intro}</div>
                        </div>
                       
                        <div style="padding:7px">
                            ${article.content}
                        </div>
                    </div>
                 
                  
                </body>
                </html>
                `;

        return (

            <View style={{ flex: 1,paddingTop:64}}>
                <WebView
                    source={{ html: HTML }}
                    style={{ height: 1000 }}
                    scalesPageToFit={true}
                    
                >
                </WebView>
            </View>


        );
    }
}




export default Article;