import React, { Component } from 'react';
import { ImageBackground, FlatList, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import SongButton from '../components/SongButton'
import EmptyList from '../components/EmptyList'

const BG_IMAGE = require('../assets/images/bg.png')

class AllSongsScreen extends Component {
  selectSong = item => () => {
    this.props.navigation.navigate('AllSongsSongDisplay', {
      song: item,
      from: 'AllSongs'
    })
  }

  render() {
    const filteredSongs = this.props.songs.filter(s => !(s.name in this.props.selectedSongs))
    const noSongs = filteredSongs.length === 0

    return <View style={{flex: 1, backgroundColor: '#222'}}>
      {this.props.fontsLoaded && !noSongs
        ? <FlatList
            data={filteredSongs}
            keyExtractor={(item, index) => `song-${index}`}
            renderItem={({item, index}) =>
              <SongButton
                item={item}
                image={BG_IMAGE}
                onPress={this.selectSong(item)} />
            }
          />
        : <EmptyList fontsLoaded={this.props.fontsLoaded} />}
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