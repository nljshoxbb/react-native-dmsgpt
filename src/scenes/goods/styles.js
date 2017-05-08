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
        borderBottomColor: '#eee'
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
        alignItems: 'center'
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
        borderTopWidth:15,
        borderColor:'#f6f6f6',
        padding:20
    },
    hotSaletitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleDot: {
        height: 6,
        width: 6,
        backgroundColor: '#000',
        borderRadius: 50,
        margin:5
    }

})
