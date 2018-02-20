import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Provider } from 'react-umw'
import AllSongsScreen from './screens/AllSongsScreen'
import SongDisplayScreen from './screens/SongDisplayScreen'

const UMW = require('unlimited-machine-works')
const DataLoader = require('dataloader')
const { FIREBASE_CONFIG } = require('./env.json')

const machine = UMW.summon({songs: [], selectedSongs: []}, {
  'START': {
    'INITIT': {
      to: 'BROWSING',
      action: (data, args) => {
        return {...data, songs: args.songs}
      }
    }
  },
  'BROWSING': {
    'SELECT_SONG': {
      to: 'BROWSING',
      action: (data, args) => {
        return {...data, selectedSongs: [...data.selectedSongs, args.song]}
      }
    },
    'REMOVE_SONG': {
      to: 'BROWSING',
      action: (data, args) => {
        return {...data, selectedSongs: data.selectedSongs.filter(song => {
          return song.name !== args.song.name
        })}
      }
    }
  }
})

machine.addSubscriber((_, data) => {
  // console.log("OUT SUBSCRIBER")
  // console.log(data.selectedSong && data.selectedSong.name)
})

const appDataLoader = new DataLoader(keys => {
  return new Promise(async (resolve, reject) => {
    const promises = keys.map(key => {
      return new Promise(async (resolveData, rejectData) => {
        const dataFromStorage = await AsyncStorage.getItem(key)

        if (!dataFromStorage) {
          firebase.initializeApp(FIREBASE_CONFIG);
          const ref = firebase.database().ref(`/${key}`)
          const keyData = await ref.once('value')
          const dataFromFirebase = keyData.val()
          await AsyncStorage.setItem(key, JSON.stringify(dataFromFirebase))
          resolveData(dataFromFirebase)
        } else {
          resolveData(JSON.parse(dataFromStorage))
        }
      })
    })

    resolve(await Promise.all(promises))
  })
})

const loadData = async () => {
  const songs = await appDataLoader.load('songs')
  machine.do('INITIT', {songs})
}

loadData()

const AllSongsNavigator = StackNavigator({
  DisplaySongs: {
    screen: AllSongsScreen
  },
  AllSongsSongDisplay: {
    screen: SongDisplayScreen
  }
}, {
  headerMode: 'none'
})

const Navigator = TabNavigator({
  AllSongs: {
    screen: AllSongsNavigator,
  }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarComponent: TabBarBottom,
  tabBarOptions: {
    activeTintColor: '#03A9F4',
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      margin: 5,    
    }
  }
});

export default () => {
  return <Provider machine={machine}>
    <Navigator />
  </Provider>
}