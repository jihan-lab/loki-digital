import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';

export default function Info() {
  return (
    <View>
      <TouchableOpacity>
        <Image
          source={require('../../../image/Info.png')}
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
