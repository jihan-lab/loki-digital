import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {IlLogo} from '../../image';
import {colors, fonts, getData, storeData} from '../../utils';
import {useDispatch} from 'react-redux';
import axios from 'axios';

export default function Splash({navigation}) {
  const dispatch = useDispatch();
  const getDataUserFormLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });

    setTimeout(() => {
      if (result) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
  };

  const getLogin = async () => {
    const user = await getData('user').then(res => {
      return res;
    });

    if (user) {
      const password = await getData('passwordUser').then(res => {
        return res;
      });

      try {
        dispatch({type: 'SET_LOADING', value: true});
        const response = await axios.post(
          'http://loki-api.boncabo.com/auth/login',
          {username: user.username, password: password},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        dispatch({type: 'SET_LOADING', value: false});
        if (response.data.data !== null) {
          storeData('user', response.data);
          storeData('passwordUser', password);
          console.log('Login Ulang');
          dispatch({type: 'SET_LOADING', value: false});
        } else {
          console.log('Ada Kesalahan di mengambil data Login');
        }
      } catch (error) {
        if (error) {
          dispatch({type: 'SET_LOADING', value: false});
          console.log(error.message);
        }
      }
    }
  };
  useEffect(() => {
    getLogin();
    getDataUserFormLocal();
  }, [navigation]);

  return (
    <View style={styles.page}>
      <Image
        source={IlLogo}
        // style={{width: 30, height: 30}}
      />
      <Text style={styles.title}>Loki Digital</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
