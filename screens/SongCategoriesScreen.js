// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

class SongCategoriesScreen extends Component {
  static navigationOptions = {
    title: 'Song Categories',
    tabBarIcon: ({tintColor}) => {
      return <FontAwesome name="table" size={18} color={tintColor} />
    }
  }

  render() {
    return <View>
      <Header
        backgroundColor={"#03A9F4"}
        centerComponent={{ text: 'Song Categories', style: { color: '#fff' } }}
      />
    </View>
  }
}

export default SongCategoriesScreen