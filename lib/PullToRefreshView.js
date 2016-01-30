'use strict'

import Indicator from './Indicator'
import React, {
  View,
  ScrollView,
  PropTypes,
    Text,
    Dimensions
} from 'react-native'

const INDICATOR_HEIGHT = 40

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class PTRView extends React.Component {
  constructor () {
    super();
    this.state = {
      scroll_offset: 0,
      isLoading: false,
      needPull: true
    }
  }
  _handleScroll (e) {
    var offset = e.nativeEvent.contentOffset.y;
    if (!this.state.isLoading) {
      this.setState({
          scroll_offset: offset,
          needPull: offset > -this.props.offset
      });
    }
  }
  _handleRelease (e) {
    if (this.state.scroll_offset < -this.props.offset) {
      this.setState({
          isLoading: true,
          state: 'laoding'
      });
      this._handleOnRefresh()
    }
  }
  _delay () {
    return new Promise((resolve) => {
      setTimeout(resolve, this.props.delay)
    })
  }
  _handleOnRefresh () {
    return new Promise((resolve) => {
      Promise.all([
        this.props.onRefresh(resolve),
        this._delay()
      ])
        .then(() => {
          this._endLoading()
        })
    })
  }
  _endLoading () {
    this.setState({
      scroll_offset: 0
    });
    setTimeout(()=>{
        this.setState({
            isLoading: false,
        })
    }, 500);
  }

  _showIndicator(){

      if(this.state.scroll_offset > -10){
          return null;
      }

      var opacity = Math.min(-this.state.scroll_offset/(INDICATOR_HEIGHT * 2), 1);
      var rotation = 45 + 135 * Math.min(-this.state.scroll_offset/(INDICATOR_HEIGHT * 2.5), 1);

    return (
          <View style={{
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            width: SCREEN_WIDTH,
            backgroundColor: 'transparent',
            opacity: opacity}}
              >
              <View style={{transform:[{rotate:rotation + 'deg'}]}}>
                  <Indicator
                      isLoading={this.state.isLoading}
                      needPull={this.state.needPull}
                      arrowColor={this.props.arrowColor}
                      />
              </View>
          </View>
      )
  }

  render () {
    return (
      <View style={{flex: 1}}>

        <ScrollView
          onScroll={this._handleScroll.bind(this)}
          onResponderRelease={this._handleRelease.bind(this)}
          scrollEventThrottle={50}
          showsVerticalScrollIndicator={false}
          style={this.props.style}
        >
            {this.props.children}
        </ScrollView>
          {this._showIndicator()}

      </View>
    )
  }
}

PTRView.defaultProps = {
  offset: 100,
  delay: 0
}

PTRView.propTypes = {
  offset: PropTypes.number,
  delay: PropTypes.number,
  onRefresh: PropTypes.func,
  style: PropTypes.object,
  children (props, propName, componentName) {
  }
}

