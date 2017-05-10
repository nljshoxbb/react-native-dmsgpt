import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    dot: {
        backgroundColor: '#fff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderWidth: 1,
        borderColor: '#70a938'
    },
    circleWrap: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff'
    },
    circleBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    scrollWrap: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    scrollText: {
        fontSize: 12
    },
    yellowDot: {
        height: 8,
        width: 8,
        borderRadius: 50,
        backgroundColor: "#e7b843",
        marginRight: 10
    },
    hotSale: {
        borderTopWidth: 15,
        borderColor: '#f6f6f6',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 15,
        backgroundColor: '#fff'
    },
    hotSaletitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    titleDot: {
        height: 6,
        width: 6,
        backgroundColor: '#000',
        borderRadius: 50,
        margin: 5
    },
    countryTextBox: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        left: 0,
        right: 0,
        top: 25

    },
    countryText: {
        color: '#fff',
        paddingTop: 8,
        textAlign: 'center'
    },
    countryImageBox: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        top: 100,
        margin: 20,
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 99,
        borderColor: '#eee',
        borderWidth: 1,
        shadowOffset: {
            // width: 10,
            height: 10,
        },
        shadowColor: '#9c9c9c',
        shadowOpacity: 0.3,
        shadowRadius: 15
    },
    countryBottomTitle: {
        paddingTop: 80,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    bottomBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomTitle: {
        color: "#999999",
        fontSize: 13,
        paddingTop: 15,
    
    }


})
