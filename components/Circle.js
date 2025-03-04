 

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Circle extends Component {
  render() {
    const { xTranslate, yTranslate, color } = this.props  //this.props is an object that contains all the properties passed to the component.
    return (
      <View style={[styles.container, {
        transform: [
          {translateX: xTranslate ? xTranslate : 10},  //If xTranslate is truthy, translateX will be set to the value of xTranslate.
          {translateY: yTranslate ? yTranslate : 10},  //If xTranslate is falsy (e.g., null, undefined, 0, false), translateX will be set to 10.
        ],
        backgroundColor: color ? color : '#000'
      }]}>
        <View style={styles.innerCircle}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  innerCircle: {
    backgroundColor: '#F5FCFF',
    width: 70,
    height: 70,
    borderRadius: 35,
  },

})
