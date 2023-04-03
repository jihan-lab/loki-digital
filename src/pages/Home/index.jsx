import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {Button, Call, Gap, Header, Modals, Status} from '../../component';
import {colors, getData, storeData} from '../../utils';
import {useDispatch} from 'react-redux';

const Home = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [dataPhone, setDataPhone] = useState([]);
  const [count, setCount] = useState(0);
  const [showPhone, setShowPhone] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [targetPhone, setTargetPhone] = useState('');
  const [temp, setTemp] = useState(false);

  const dispatch = useDispatch();

  const getDataPhone = async () => {
    dispatch({type: 'SET_LOADING', value: true});
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
        setDataPhone(response.data.data);
        storeData('allContact', dataPhone);
      }
      setAllContact(dataPhone);
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      console.log(error);
    }
  };

  const getPhoneNumber = () => {
    dispatch({type: 'SET_LOADING', value: true});
    try {
      getData('allContact').then(res => {
        setAllContact(res);
      });
      storeData('allContact', allContact);
      setShowPhone(allContact.pop());
      storeData('allContact', allContact);
      setTargetPhone(showPhone?.target_handphone);
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      console.log(error);
    }
  };

  const getDataUserFormLocal = () => {
    getData('user').then(res => {
      setUser(res);
      setToken(res.token);
    });
  };

  const calling = () => {
    RNImmediatePhoneCall.immediatePhoneCall(targetPhone);
    setTemp(true);
  };

  const getModal = () => {
    <Modals />;
  };

  useEffect(() => {
    getDataUserFormLocal();

    // if (user !== null) {
    //   navigation.replace('Login');
    // }
    getData('allContact').then(res => {
      setAllContact(res);
    });
    console.log('allContact', allContact);
    console.log('user', user);
    console.log('token', token);
  }, []);
  return (
    <>
      <Header title="Loki Digital" />
      <SafeAreaView style={Style.container}>
        <View style={Style.box_2}>
          <View style={Style.box_1}>
            <View style={Style.box_phone}>
              <Text style={Style.font_title}>Hai, {user?.username}</Text>
              <Text>Remaining, {allContact?.length}</Text>
            </View>
            <Text style={Style.text}>Phone Number</Text>
            <TextInput
              style={Style.InputText}
              editable={false}
              value={targetPhone}
            />
            <Call onPress={calling} />
          </View>
        </View>
        <View style={{height: '20%', marginTop: 40, justifyContent: 'center'}}>
          <View style={Style.Button_action}>
            <Status status="active" />
            <Status status="notActive" />
            <Status status="notListed" />
          </View>
        </View>

        {temp && temp ? (
          <>
            <Button onPress={getModal} title="Report Phone Number" />
            <Gap height={15} />
          </>
        ) : (
          <>
            <Button onPress={getPhoneNumber} title="Ready" />
            <Gap height={15} />
          </>
        )}

        {allContact && allContact.length ? (
          ''
        ) : (
          <Button onPress={getDataPhone} title="Get Phone Number" />
        )}
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
