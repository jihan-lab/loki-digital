import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

export default function Call({onPress}) {
  return (
    <TouchableOpacity style={styles.buttonCall} onPress={onPress}>
      <Image
        source={require('../../../image/PhoneCall.png')}
        style={{width: 45, height: 45}}
      />
      <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 20}}>
        Call
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonCall: {
    alignSelf: 'center',
    width: 230,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#37a137',
    marginTop: 23,
    paddingVertical: 12,
  },
});
