import React from 'react'
import {AsyncStorage, View} from 'react-native'
import {StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation'
import * as firebase from 'firebase'
import {Provider} from 'react-umw'
import AllSongsScreen from './screens/AllSongsScreen'
import SongDisplayScreen from './screens/SongDisplayScreen'
import LineUpScreen from './screens/LineUpScreen'
import {Font} from 'expo'

const UMW = require('unlimited-machine-works')
const DataLoader = require('dataloader')
const {FIREBASE_CONFIG} = require('./env.json')

const machine = UMW.summon(
  {songs: [], selectedSongs: {}, fontsLoaded: false},
  {
    START: {
      INITIT: {
        to: 'BROWSING',
        action: (data, args) => {
          return {...data, songs: args.songs}
        },
      },
    },
    BROWSING: {
      SELECT_SONG: {
        to: 'BROWSING',
        action: (data, args) => {
          return {
            ...data,
            selectedSongs: {...data.selectedSongs, [args.song.name]: args.song},
          }
        },
      },
      REMOVE_SONG: {
        to: 'BROWSING',
        action: (data, args) => {
          delete data.selectedSongs[args.song.name]
          return {...data, selectedSongs: {...data.selectedSongs}}
        },
      },
      LOAD_FONTS: {
        to: 'BROWSING',
        action: (data, args) => {
          return {...data, fontsLoaded: true}
        },
      },
    },
  }
)

machine.addSubscriber((_, data) => {
  // Console.log("OUT SUBSCRIBER")
  // console.log(data.selectedSong && data.selectedSong.name)
})

loadFonts = async () => {
  await Font.loadAsync({
    'noto-sans': require('./assets/fonts/NotoSans-Regular.ttf'),
    chewy: require('./assets/fonts/Chewy-Regular.ttf'),
    signato: require('./assets/fonts/Signato-Regular.otf'),
  })

  machine.do('LOAD_FONTS')
}

const appDataLoader = new DataLoader(keys => {
  return new Promise(async (resolve, reject) => {
    const promises = keys.map(key => {
      return new Promise(async (resolveData, rejectData) => {
        const dataFromStorage = await AsyncStorage.getItem(key)

        if (!dataFromStorage) {
          firebase.initializeApp(FIREBASE_CONFIG)
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
  loadFonts()
}

loadData()

const AllSongsNavigator = StackNavigator(
  {
    DisplaySongs: {
      screen: AllSongsScreen,
    },
    AllSongsSongDisplay: {
      screen: SongDisplayScreen,
    },
  },
  {
    headerMode: 'none',
  }
)

const LineUpNavigator = StackNavigator(
  {
    DisplayLineUp: {
      screen: LineUpScreen,
    },
    LineUpSongDisplay: {
      screen: SongDisplayScreen,
    },
  },
  {
    headerMode: 'none',
  }
)

const Navigator = TabNavigator(
  {
    AllSongs: {
      screen: AllSongsNavigator,
    },
    LineUp: {
      screen: LineUpNavigator,
    },
  },
  {
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
      },
    },
  }
)

export default () => {
  return (
    <Provider machine={machine}>
      <Navigator />
    </Provider>
  )
}
