import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

export default function Background() {
  return <View style={styles.wrapper}></View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.coinAnimationBackground,
    width: '100%',
    height: '100%',
  },
  //   text: {
  //     fontSize: 18,
  //     color: colors.primary,
  //     fontFamily: fonts.primary[600],
  //     marginTop: 16,
  //   },
});
