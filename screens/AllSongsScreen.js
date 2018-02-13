// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

class AllSongsScreen extends Component {
  static navigationOptions = {
    title: 'All Songs',
    tabBarIcon: ({tintColor}) => {
      return <FontAwesome name="list" size={18} color={tintColor} />
    }
  }

  itemz = [
    {name: "Song 1"},
    {name: "Song 2"},
  ]

  render() {
    return <View>
      <Header
        centerComponent={{ text: 'All Songs', style: { color: '#fff' } }}
      />
      <List containerStyle={{marginTop: 0}}>
        <FlatList
          data={this.itemz}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) =>
            <ListItem
              key={index}
              title={item.name}
            />
          }
        />
      </List>
    </View>
  }
}

export default AllSongsScreen