import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

export default function Status({status, onPress}) {
  if (status === 'aktif') {
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
  if (status === 'tidakTerdaftar') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.Button_tdf}>
        <Image
          source={require('../../../image/nophone.png')}
          style={{width: 25, height: 25}}
        />
        <Text
          style={{
            color: colors.white,
            fontSize: 11,
            paddingHorizontal: 1,
          }}>
          Tidak Terdaftar
        </Text>
      </TouchableOpacity>
    );
  }
  if (status === 'tidakAktif') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.Button_noUser}>
        <Image
          source={require('../../../image/nouser.png')}
          style={{width: 25, height: 25}}
        />
        <Text style={{color: colors.text.primary}}>Tidak Aktif</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Button_noUser: {
    width: 100,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 1000,
    borderColor: colors.disable.background,
    backgroundColor: 'yellow',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Button_Aktif: {
    width: 100,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 1000,
    borderColor: colors.disable.background,
    backgroundColor: colors.success,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Button_tdf: {
    width: 100,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 1000,
    borderColor: colors.disable.background,
    backgroundColor: colors.error,
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
