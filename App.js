import React from 'react';
import { View } from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import AllSongsScreen from './screens/AllSongsScreen'
import SongCategoriesScreen from './screens/SongCategoriesScreen'
import * as firebase from 'firebase';

const { FIREBASE_CONFIG } = require('./env.json')

const loadFirebase = async (config) => {  
  firebase.initializeApp(config);
  const rootRef = firebase.database().ref()
  const data = await rootRef.once('value')
  console.log(data)
}

loadFirebase(FIREBASE_CONFIG)

export default TabNavigator({
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