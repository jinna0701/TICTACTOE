 

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Cross extends Component {
  render() {
    const { xTranslate, yTranslate, color } = this.props
    return (
      <View style={[styles.container, {
        transform: [
          {translateX: (xTranslate ? xTranslate : 10) + 35},  //xTranslate ? xTranslate : 10: Uses xTranslate if it is truthy; otherwise, defaults to 10.
          //Adds 35 to the result, setting the translateX value.
          {translateY: (yTranslate ? yTranslate : 10) - 12},   //Subtracts 12 from the result, setting the translateY value.
        ]
      }]}>
        <View style={[styles.line, {
          transform: [
            {rotate: '45deg'},
          ],
          backgroundColor: color ? color : '#000'
        }]} />
        <View style={[styles.line, {
          transform: [
            {rotate: '135deg'},  //Rotates the line 135 degrees.
          ],
          backgroundColor: color ? color : '#000'
        }]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  line: {
    position: 'absolute',
    width: 8,
    height: 105,
  },

})
