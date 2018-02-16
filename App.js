import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Provider } from 'react-umw'
import AllSongsScreen from './screens/AllSongsScreen'
import SongCategoriesScreen from './screens/SongCategoriesScreen'

const UMW = require('unlimited-machine-works')
const DataLoader = require('dataloader')
const { FIREBASE_CONFIG } = require('./env.json')

const machine = UMW.summon({songs: [], selectedSong: null}, {
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
        return {...data, selectedSong: args.selectedSong}
      }
    },
    'UNSELECT_SONG': {
      to: 'BROWSING',
      action: (data, args) => {
        return {...data, selectedSong: null}
      }
    }
  }
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

const Navigator = TabNavigator({
  AllSongs: {
    screen: AllSongsScreen,
  },
  SongCategories: {
    screen: SongCategoriesScreen
  },
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