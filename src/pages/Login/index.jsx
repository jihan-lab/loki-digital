import axios from 'axios';
import {React, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Gap, Input} from '../../component';
import {colors, fonts, getData, showError, storeData} from '../../utils';
import {useDispatch} from 'react-redux';

export default function Login({navigation}) {
  const [user, setUser] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(true);

  const dispatch = useDispatch();

  const seePw = () => {
    setShowPw(!showPw);
  };

  const getDataUserFormLocal = async () => {
    const result = await getData('user').then(res => {
      // setUser(res);
      // setToken(res.token);
      return res;
    });

    console.log([result]);
    if (result) {
      return navigation.replace('Home');
    }
  };

  const Login = async () => {
    try {
      dispatch({type: 'SET_LOADING', value: true});
      const response = await axios.post(
        'http://loki-api.boncabo.com/auth/login',
        {username: user, password: password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch({type: 'SET_LOADING', value: false});
      if (response.data.data !== null) {
        console.log(response);
        storeData('user', response.data);
        storeData('passwordUser', password);
        dispatch({type: 'SET_LOADING', value: false});
        navigation.replace('Home');
      } else {
        showError('Username dan Password Salah');
      }
    } catch (error) {
      if (error) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getDataUserFormLocal();
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Masuk dan mulai berkomunikasi</Text>
      <Input label="User" value={user} onChangeText={e => setUser(e)} />
      <Gap height={24} />
      <Input
        label="Password"
        value={password}
        onChangeText={e => setPassword(e)}
        secureTextEntry={showPw}
      />
      <TouchableOpacity style={styles.hiddenEye} onPress={seePw}>
        {showPw ? (
          <Image
            source={require('../../image/hidden-eye.png')}
            style={styles.showPw}
          />
        ) : (
          <Image
            source={require('../../image/eye.png')}
            style={styles.showPw}
          />
        )}
      </TouchableOpacity>
      <Gap height={40} />
      <Button title="Sign In" onPress={Login} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  hiddenEye: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 155,
  },
});
