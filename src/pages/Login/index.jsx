import axios from 'axios';
import {React, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Gap, Input} from '../../component';
import {colors, fonts, storeData} from '../../utils';

export default function Login({navigation}) {
  const [user, setUser] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(true);

  const seePw = () => {
    setShowPw(!showPw);
  };

  const Login = async () => {
    try {
      const response = await axios.post(
        'http://loki-api.boncabo.com/auth/login',
        {username: user, password: password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.data !== null) {
        console.log(response);
        storeData('user', response.data);
        navigation.replace('MainApp');
      }
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  };

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
