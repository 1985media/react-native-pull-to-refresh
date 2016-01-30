'use strict';

var React = require('react-native');

var {
    Component,
    Platform,
    PullToRefreshViewAndroid,
    } = React;

import PTRView from './lib/PullToRefreshView.js'


class PullToRefreshView extends Component {

    constructor () {
        super();
        this.state = {
            isRefreshing: false
        }
    }

    _onRefresh(){
        this.setState({
            isRefreshing: true,
        });
        this.props.onRefresh().done(()=>{
            this.setState({
                isRefreshing: false,
            });
        })
    }

    render() {
        if(Platform.OS == 'android'){
            return (
                <PullToRefreshViewAndroid
                    onRefresh={this._onRefresh.bind(this)}
                    refreshing={this.state.isRefreshing}
                    colors={this.props.andoridColors}
                    style={{flex: 1}}
                    >
                    {this.props.children}
                </PullToRefreshViewAndroid>
            );
        } else {
            return (
                <PTRView
                    onRefresh={this._onRefresh.bind(this)}
                    arrowColor={this.props.iosArrowColor}>
                    {this.props.children}
                </PTRView>
            );
        }
    }
}


module.exports = PullToRefreshView;