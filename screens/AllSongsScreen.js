import React, { Component } from 'react';
import { ImageBackground, FlatList, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import SongButton from '../components/SongButton'

const BG_IMAGE = require('../assets/images/bg.png')

class AllSongsScreen extends Component {
  constructor(props) {
    super(props)
    this.props.subscribe(this)
  }

  selectSong = item => () => {
    this.props.navigation.navigate('AllSongsSongDisplay', {
      song: item,
      from: 'AllSongs'
    })
  }

  render() {
    return <View>
      {/* <Header
        backgroundColor={"#03A9F4"}
        centerComponent={{ text: 'All Songs', style: { color: '#fff' } }}
      /> */}
      {this.props.fontsLoaded
        ? <FlatList
            data={this.props.songs.filter(s => !(s.name in this.props.selectedSongs))}
            keyExtractor={(item, index) => `song-${index}`}
            renderItem={({item, index}) =>
              <SongButton
                item={item}
                image={BG_IMAGE}
                onPress={this.selectSong(item)} />
            }
          />
        : null}
    </View>
  }
}

const AllSongs = connect()(AllSongsScreen)

AllSongs.navigationOptions = {
  title: 'All Songs',
  tabBarIcon: ({tintColor}) => {
    return <FontAwesome name="list" size={18} color={tintColor} />
  }
}

export default AllSongs