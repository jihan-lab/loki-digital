import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {Button, Call, Header, Info, Navigation, Status} from '../../component';
import {colors, getData} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [dataPhone, setDataPhone] = useState('');
  const [count, setCount] = useState(0);
  const [showPhone, setShowPhone] = useState('');

  const getDataPhone = async () => {
    try {
      const response = await axios.get(
        'http://loki-api.boncabo.com/phone/index',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCount(count + 1);
      if (response !== null) {
        setDataPhone(response.data.data.target_handphone);
        setShowPhone(`+${response.data.data.target_handphone}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataUserFormLocal = () => {
    getData('user').then(res => {
      setUser(res);
      setToken(res.token);
    });
  };

  useEffect(() => {
    getDataUserFormLocal();

    if (user.length <= 0) {
      navigation.replace('Login');
    }
    console.log('user', user);
    console.log('token', token);
    console.log('phone :', dataPhone);
  }, []);
  return (
    <>
      <Header title="Loki Digital" />
      <SafeAreaView style={Style.container}>
        <View style={Style.box_2}>
          <View style={Style.box_1}>
            <View style={Style.box_phone}>
              <Text style={Style.font_title}>Hai, {user.username}</Text>
              <Text>Taken the number, {count}</Text>
            </View>
            <Text style={Style.text}>Phone Number</Text>
            <TextInput
              style={Style.InputText}
              editable={false}
              value={showPhone}
            />
            <Call
              onPress={() => {
                RNImmediatePhoneCall.immediatePhoneCall(showPhone);
              }}
            />
          </View>
        </View>
        <View style={{height: '20%', marginTop: 40, justifyContent: 'center'}}>
          <View style={Style.Button_action}>
            <Status status="active" />
            <Status status="notActive" />
            <Status status="notListed" />
          </View>
        </View>
        <Button onPress={getDataPhone} title="Get Phone Number" />
      </SafeAreaView>
    </>
  );
};

// #FFAB00
const Style = StyleSheet.create({
  Button_action: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: colors.text.primary,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'space-around',
  },
  text: {
    color: colors.text.primary,
    textAlign: 'center',
    fontSize: 40,
  },
  InputText: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: colors.text.secondary,
    marginTop: 15,
    color: colors.text.primary,
    borderWidth: 2,
    borderColor: colors.text.disable,
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'Urbanist-Regular',
  },
  box_phone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  box_1: {
    height: '80%',
    padding: 5,
    gap: 10,
  },
  box_2: {
    marginTop: 5,
    height: 320,
    justifyContent: 'center',
  },
  font: {
    color: '#FFF',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'Urbanist-Regular',
  },
  font_title: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    color: '#FFF',
    fontSize: 18,
    borderRadius: 15,
    textAlign: 'center',
  },
});

export default Home;
