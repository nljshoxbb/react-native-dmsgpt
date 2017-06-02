import React, { Component } from 'react';
import {
    Text,
    View,
    Animated,
    Easing,
    Image
} from 'react-native';
import { commonStyles } from '../style';



class Order extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            slide: new Animated.ValueXY({ x: 0, y: 0 })
        }

    }

    componentDidMount() {
        Animated.timing(
            this.state.slide,
            {
                toValue: { x: 200, y: 0 },
                duration: 2000,
                delay: 500,
                easing: Easing.in(Easing.ease)
            }).start();
    }


    render() {

        const slideStyle = this.state.slide.getTranslateTransform();
        return (
            <Animated.View style={slideStyle}>
                <View style={{ width: 50, height: 50,backgroundColor:'red' }}>
                    
                </View>
                <Text >123</Text>
            </Animated.View>

        );
    }
}

export default Order;