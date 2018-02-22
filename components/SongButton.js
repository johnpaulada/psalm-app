import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';

class SongButton extends Component {
  render() {
    const item = this.props.item

    return <TouchableOpacity onPress={this.props.onPress} style={styles.songButton}>
      <ImageBackground source={this.props.image} style={styles.songImage}>
        <Text style={styles.songName}>{item.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  songImage: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  songButton: {
  },
  songName: {
    fontFamily: "signato",
    fontSize: 36,
    color: '#FAFAFA',
    textShadowColor: '#333',
    textShadowRadius: 10
  }
})

export default SongButton