import React, { Component } from 'react';
import {
  ActionSheetIOS,
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

class SongDisplayScreen extends Component {
  constructor(props) {
    super(props)
    this.props.subscribe(this)
  }

  back = () => this.props.navigation.goBack()

  displayOptions = () => {
    const {song, from} = this.props.navigation.state.params

    const buttonText = {
      'AllSongs': 'Add to Line Up',
      'LineUp': 'Remove from Line Up'
    }

    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', buttonText[from]],
      cancelButtonIndex: 0,
      destructiveButtonIndex: from === 'AllSongs' ? undefined : 1
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        if (from === 'AllSongs') {
          this.props.do('SELECT_SONG', {song})
        } else if (from === 'LineUp') {
          this.props.do('REMOVE_SONG', {song})
        }
        
        this.back()
      }
    });
  }

  render() {
    const {song} = this.props.navigation.state.params

    return <View>
      <Header
        backgroundColor={"#03A9F4"}
        leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: this.back }}
        centerComponent={{ text: song.name, style: { color: '#fff' } }}
        rightComponent={{ icon: 'menu', color: '#fff', onPress: this.displayOptions }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>   
        { 
          this.props.fontsLoaded
            ? song.lyrics.split("\n").map((line, index) =>
              <Text key={`line-${index}`} style={styles.lyrics}>
                {line}
              </Text>)
            : null
        }
      </ScrollView> 
    </View>
  }
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20
  },
  lyrics: {
    fontFamily: 'noto-sans',
    fontSize: 16,
    lineHeight: 20
  }
})

const SongDisplay = connect()(SongDisplayScreen)

SongDisplay.navigationOptions = {
  title: 'Song',
  tabBarIcon: ({tintColor}) => {
    return <FontAwesome name="list" size={18} color={tintColor} />
  }
}

export default SongDisplay