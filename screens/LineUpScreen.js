import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-umw'
import { Header, List, ListItem} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

class LineUpScreen extends Component {
  constructor(props) {
    super(props)
    this.props.subscribe(this)
  }

  render() {
    return <View>
      <Header
        backgroundColor={"#03A9F4"}
        centerComponent={{ text: 'Line Up', style: { color: '#fff' } }}
      />
      {this.props.fontsLoaded
        ? <FlatList
            data={Object.entries(this.props.selectedSongs)}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) =>
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate('LineUpSongDisplay', {
                    song: item[1],
                    from: 'LineUp'
                  })
                }}
                key={index}
                title={item[1].name}
              />
            }
          />
        : null}
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