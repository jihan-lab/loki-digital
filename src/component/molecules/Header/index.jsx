import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';
import {Gap} from '../../atoms';

export default function Header({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Gap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.white,
    flex: 1,
    textTransform: 'capitalize',
  },
});
