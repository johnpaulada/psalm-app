import React, { Component } from 'react';
import { FlatList, ScrollView, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

class SongDisplayScreen extends Component {
  constructor(props) {
    super(props)
    this.props.subscribe(this)
  }

  back = () => this.props.navigation.goBack()

  render() {
    const {song} = this.props.navigation.state.params

    return <View>
      <Header
        backgroundColor={"#03A9F4"}
        leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: this.back }}
        centerComponent={{ text: song.name, style: { color: '#fff' } }}
        rightComponent={{ icon: 'menu', color: '#fff' }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>   
        <Text>
          {song.lyrics}
        </Text>
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20
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