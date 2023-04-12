import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {gifTick} from '../../../image';
import {colors, fonts} from '../../../utils';

export default function Button({title, onPress, type}) {
  if (type === 'reportAlert') {
    return (
      <View style={styles.container(type)}>
        <Text style={styles.text(type)}>{title}</Text>
      </View>
    );
  }
  if (type === 'send') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.containerSend}>
        <Image
          source={gifTick}
          style={{width: 150, height: 150, marginVertical: -40}}
        />
        <Text style={styles.textSend}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(type)}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerSend: {
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.success,
    borderRadius: 1000,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: type => ({
    backgroundColor:
      type === 'reportAlert' ? colors.disable.background : colors.primary,
    alignItems: 'center',
    padding: 15,
    width: type === 'reportAlert' ? '70%' : '100%',
    alignSelf: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),
  text: type => ({
    textAlign: 'center',
    fontSize: type === 'reportAlert' ? 14 : 20,
    fontFamily: fonts.primary[700],
    color: type === 'reportAlert' ? colors.disable.text : colors.white,
  }),
  textSend: {
    marginTop: 15,
    marginBottom: -25,
    fontSize: 15,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
});
