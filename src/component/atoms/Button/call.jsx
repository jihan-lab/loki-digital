import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

export default function Call({onPress}) {
  return (
    <TouchableOpacity style={styles.buttonCall} onPress={onPress}>
      <View style={styles.buttonBorder}>
        <Image
          source={require('../../../image/PhoneCall.png')}
          style={{width: 70, height: 70}}
        />
        <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 20}}>
          Call
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBorder: {
    width: 150,
    height: 150,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37a137',
    borderRadius: 1000,
  },
  buttonCall: {
    alignSelf: 'center',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    backgroundColor: colors.white,
    marginTop: 23,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
