// @flow

import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import Modal from "react-native-modal";

class AllSongsScreen extends Component {
  static navigationOptions = {
    title: 'All Songs',
    tabBarIcon: ({tintColor}) => {
      return <FontAwesome name="list" size={18} color={tintColor} />
    }
  }

  state = {
    modalVisible: false
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
                this.props.do('SELECT_SONG', {selectedSong: this.props.songs[index]})
                this.setState({modalVisible: true})
              }}
              key={index}
              title={item.name}
            />
          }
        />
      </List>
      <Text>{this.props.selectedSong && this.props.selectedSong.lyrics}</Text>
      {/* <Modal isVisible={this.state.modalVisible}>
        <View style={{flex: 1}}>
          <Text>{this.props.selectedSong}</Text>
        </View>
      </Modal> */}
    </View>
  }
}

export default connect()(AllSongsScreen)