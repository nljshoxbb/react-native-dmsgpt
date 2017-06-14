import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';
import theme from '../style/theme/default.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Props {
    onChange?: any,
    defaultValue?: number,
    step?: number,
    min?: number,
    max?: number
}

class Stepper extends Component<Props, any> {
    constructor(props: Props) {
        super(props);
        let value = 0;
        if (this.props.defaultValue) {
            value = this.props.defaultValue;
        }
        this.state = {
            value
        }
    }

    static defaultProps = {
        step: 1,
        defaultValue: 1,
        // onChange: (value: any) => { console.log(value) }
    }


    onChange = (type: any, val?: any) => {
        const { step, min, max } = this.props;
        let { value } = this.state;
        if (type == 'dec') {
            value -= step;
        } else if (type == 'add') {
            value += step;
        }
        if (max && value > max) {
            value = max;
        }
        if (min && value < min) {
            value = min;
        }
        if (typeof val === 'number') {
            value = val;
        }
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        const { value } = this.state;
        return (
            <View style={{ flexDirection: 'row', }}>
                <TouchableWithoutFeedback onPress={() => this.onChange('dec')}>
                    <View>
                        <Ionicons
                            name="ios-remove"
                            size={24}
                            color={theme.brand_primary}
                            style={{ width: 25, height: 25, backgroundColor: theme.brand_desalt, textAlign: 'center', fontWeight: "800" }}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TextInput
                    value={String(value)}
                    style={{
                        borderColor: theme.brand_desalt,
                        borderWidth: 1,
                        width: 50,
                        textAlign: 'center',
                        fontSize: 16
                    }}
                    onChange={this.onChange}
                />
                <TouchableWithoutFeedback onPress={() => this.onChange('add')}>
                    <View>
                        <Ionicons
                            name="ios-add"
                            size={24}
                            color={theme.brand_primary}
                            style={{ width: 25, height: 25, backgroundColor: theme.brand_desalt, textAlign: 'center', fontWeight: "800" }}
                        />
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

export default Stepper;