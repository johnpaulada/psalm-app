import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

class EmptyList extends Component {
  render() {
    return <View style={styles.emptyContainer}>
      { this.props.fontsLoaded ? <Text style={styles.emptyText}>Nothing here yet.</Text> : null }
    </View>
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: '100%',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#FAFAFA',
    fontFamily: 'chewy',
    fontSize: 18
  }
})

export default EmptyList