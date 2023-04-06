import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

export default function Status({status, onPress}) {
  if (status === 'active') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.Button_Aktif}>
        <Image
          source={require('../../../image/Chek.png')}
          style={{width: 25, height: 25}}
        />
        <Text style={{color: colors.white}}>Aktif</Text>
      </TouchableOpacity>
    );
  }
  if (status === 'notActive') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.Button_tdf}>
        <Image
          source={require('../../../image/nophone.png')}
          style={{width: 25, height: 25}}
        />
        <Text style={{color: colors.white, fontSize: 11, paddingHorizontal: 1}}>
          Tidak Terdaftar
        </Text>
      </TouchableOpacity>
    );
  }
  if (status === 'notListed') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.Button_noUser}>
        <Image
          source={require('../../../image/nouser.png')}
          style={{width: 25, height: 25}}
        />
        <Text style={{color: '#FF532F'}}>Tidak Aktif</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Button_noUser: {
    width: 90,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 15,

    borderColor: '#DC9424',
    backgroundColor: 'yellow',
  },
  Button_Aktif: {
    width: 90,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 15,
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  Button_tdf: {
    width: 90,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 15,
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
});
