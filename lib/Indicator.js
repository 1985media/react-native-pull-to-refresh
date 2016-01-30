'use strict'

import Style from './Style'
import React, {
    View,
    ActivityIndicatorIOS,
    Image,
    Text,
    PropTypes
} from 'react-native'

export default class Indicator extends React.Component {
    render() {
        var display_object = '';
        if (this.props.needPull && !this.props.isLoading) {
            display_object = (
                <Text
                    style={{width: 36, height: 36, color: this.props.arrowColor, fontSize: 36, fontFamily:'Helvetica'}}>&#8593;</Text>
            )
        } else {
            display_object = (
                <ActivityIndicatorIOS
                    size='large'
                    />
            )
        }
        return (
            <View style={Style.IndicatorWrap}>
                {display_object}
            </View>
        )
    }
}

Indicator.propTypes = {
    needPull: PropTypes.bool,
    arrowColor: PropTypes.string,
};

