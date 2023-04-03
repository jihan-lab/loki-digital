import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function Status({status}) {
  if (status === 'active') {
    return (
      <TouchableOpacity style={styles.Button_Aktif}>
        <Image
          source={require('../../../image/Chek.png')}
          style={{width: 35, height: 35}}
        />
        <Text style={{color: '#228BE6'}}>Aktif</Text>
      </TouchableOpacity>
    );
  }
  if (status === 'notActive') {
    return (
      <TouchableOpacity style={styles.Button_tdf}>
        <Image
          source={require('../../../image/nophone.png')}
          style={{width: 35, height: 35}}
        />
        <Text style={{color: '#DC9424'}}>Tidak Terdaftar</Text>
      </TouchableOpacity>
    );
  }
  if (status === 'notListed') {
    return (
      <TouchableOpacity style={styles.Button_noUser}>
        <Image
          source={require('../../../image/nouser.png')}
          style={{width: 35, height: 35}}
        />
        <Text style={{color: '#FF532F'}}>Tidak Aktif</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Button_noUser: {
    width: 110,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 15,
    borderColor: '#FF532F',
  },
  Button_Aktif: {
    width: 100,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 15,
    borderColor: '#228BE6',
  },
  Button_tdf: {
    width: 110,
    height: 62,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 15,
    borderColor: '#DC9424',
  },
});
