 

import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View
} from 'react-native'

import Circle from './Circle'
import Cross from './Cross'
import {
  CENTER_POINTS,
  AREAS,
  CONDITIONS,
  GAME_RESULT_NO,
  GAME_RESULT_USER,
  GAME_RESULT_AI,
  GAME_RESULT_TIE
} from '../constants/game'
import styles from './styles/gameBoard'
import PromptArea from './PromptArea'

export default class GameBoard extends Component {
  state = {
    AIInputs: [],
    userInputs: [],
    result: 0,
    round: 0
  };

  constructor() {
    super()  //Calls the constructor of the parent class (React.Component). This is necessary to properly initialize the component.
    this.state= {  //Initializes the component's state with an object
      AIInputs: [],  //An array to store inputs from the AI.
      userInputs: [],
      result: GAME_RESULT_NO,
      round: 0
    }
  }

  restart() {
    const { round } = this.state
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: GAME_RESULT_NO,
      round: round + 1
    })
    setTimeout(() => {
      if (round % 2 === 0) {
        this.AIAction()
      }
    }, 5)  //5: The delay in milliseconds before the function is executed.
  }

  boardClickHandler(e) {
    const { locationX, locationY } = e.nativeEvent   //e.nativeEvent: Represents the native event object that contains details about the event.
    //So, after this line, you can use locationX and locationY directly in your code to access the X and Y coordinates of the event, 
    //respectively. These coordinates typically represent the position of the event (e.g., a touch or click) relative to the target element.

    const { userInputs, AIInputs, result } = this.state
    if (result !== -1) {  //result !== -1: If the result is not -1, the condition is true.
      return   //: If the condition is true, the function exits early and no further code in the function is executed.
    }


    const inputs = userInputs.concat(AIInputs)
    //The concat method is used to merge two or more arrays. It returns a new array that includes all elements from the original arrays.
    //

    const area = AREAS.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY))

      if (area && inputs.every(d => d !== area.id)) {
        this.setState({ userInputs: userInputs.concat(area.id) })
        setTimeout(() => {
          this.judgeWinner()
          this.AIAction()
        }, 5)
      }
  }

  AIAction() {
    const { userInputs, AIInputs, result } = this.state
    if (result !== -1) {
      return
    }
    while(true) {
      const inputs = userInputs.concat(AIInputs)

      const randomNumber = Math.round(Math.random() * 8.3)
      if (inputs.every(d => d !== randomNumber)) {
        this.setState({ AIInputs: AIInputs.concat(randomNumber) })
        this.judgeWinner()
        break
      }
    }
  }

  componentDidMount() {
    this.restart()
  }

  isWinner(inputs) {
    return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  judgeWinner() {
    const { userInputs, AIInputs, result } = this.state
    const inputs = userInputs.concat(AIInputs)

    if (inputs.length >= 5 ) {
      let res = this.isWinner(userInputs)
      if (res && result !== GAME_RESULT_USER) {
        return this.setState({ result: GAME_RESULT_USER })
      }
      res = this.isWinner(AIInputs)
      if (res && result !== GAME_RESULT_AI) {
        return this.setState({ result: GAME_RESULT_AI })
      }
    }

    if (inputs.length === 9 &&
        result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
      this.setState({ result: GAME_RESULT_TIE })
    }
  }

  render() {
    const { userInputs, AIInputs, result } = this.state
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>
          <View style={styles.board}>
            <View
              style={styles.line}
            />
            <View
              style={[styles.line, {
                width: 3,
                height: 306,
                transform: [
                  {translateX: 200}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 100}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 200}
                ]
              }]}
            />
            {
              userInputs.map((d, i) => (
                <Circle
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                  color="deepskyblue"
                />
              ))
            }
            {
              AIInputs.map((d, i) => (
                <Cross
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                />
              ))
            }
          </View>
        </TouchableWithoutFeedback>
        <PromptArea result={result} onRestart={() => this.restart()} />
      </View>
    )
  }
}
