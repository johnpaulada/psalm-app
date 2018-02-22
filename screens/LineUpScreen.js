import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import SongButton from '../components/SongButton'
import EmptyList from '../components/EmptyList'

const BG_IMAGE = require('../assets/images/bg.png')

class LineUpScreen extends Component {
  constructor(props) {
    super(props)
    this.props.subscribe(this)
  }

  onSelect = item => () => {
    this.props.navigation.navigate('LineUpSongDisplay', {
      song: item,
      from: 'LineUp'
    })
  }

  render() {
    const selectedSongs = Object.entries(this.props.selectedSongs)
    const noSelectedSongs = selectedSongs.length === 0

    return <View style={{backgroundColor: '#222'}}>
      {this.props.fontsLoaded && !noSelectedSongs
        ? <FlatList
            data={selectedSongs}
            keyExtractor={(item, index) => `line-${index}`}
            renderItem={({item, index}) =>
              <SongButton
                item={item[1]}
                image={BG_IMAGE}
                onPress={this.onSelect(item[1])} />
            }
          />
        : <EmptyList fontsLoaded={this.props.fontsLoaded} />}
    </View>
  }
}

const LineUp = connect()(LineUpScreen)

LineUp.navigationOptions = {
  title: 'Line Up',
  tabBarIcon: ({tintColor}) => {
    return <FontAwesome name="list" size={18} color={tintColor} />
  }
}

export default LineUp