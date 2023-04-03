import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Navigation() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button_home}>
        <Image
          source={require('../../../image/Home.png')}
          style={{width: 38, height: 38}}
        />
        <Text style={{fontSize: 17, color: '#37a137', fontWeight: '600'}}>
          Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#151a16',
    bottom: 10,
    width: '100%',
    height: 67,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button_home: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
