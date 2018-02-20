import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

class AllSongsScreen extends Component {
  constructor(props) {
    super(props)
    this.props.subscribe(this)
  }

  render() {
    return <View>
      <Header
        backgroundColor={"#03A9F4"}
        centerComponent={{ text: 'All Songs', style: { color: '#fff' } }}
      />
      <List containerStyle={{marginTop: 0}}>
        <FlatList
          data={this.props.songs}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) =>
            <ListItem
              onPress={() => {
                // this.props.do('SELECT_SONG', {selectedSong: this.props.songs[index]})
                this.props.navigation.navigate('AllSongsSongDisplay', {
                  song: this.props.songs[index]
                })
              }}
              key={index}
              title={item.name}
            />
          }
        />
      </List>
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