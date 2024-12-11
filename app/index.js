import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, 
  Button 
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Header from '../components/Header';
import GameBoard from '../components/GameBoard';

import tic1 from "../assets/images/tic1.png";

export default class App extends Component {
  state = {
    gameStarted: false
  };

  startGame() {
    this.setState({ gameStarted: true });
  }

  render() {
    const { gameStarted } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: 50 }]}>
        <Header />
        {
        gameStarted ? (
          <GameBoard />
        ) : (
          <View style={[styles.box]}>
          <Image
            source={tic1}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
          <Text style={styles.welcome}>
            Welcome to TIC TAC TOE!
          </Text>
          <TouchableOpacity onPress={() => this.startGame()}>
            <Text style={styles.instructions}>
            START
            </Text>

            {/* <Button > START </Button> */}







          </TouchableOpacity>
          </View>
        )
        }
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    marginTop: 50,
  },
  instructions: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
  },
  box:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
  }
});
