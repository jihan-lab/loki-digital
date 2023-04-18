import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Header, Input} from '../../component';
import {colors, fonts, showSuccess} from '../../utils';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {IlMinus, IlPlus} from '../../image';

export default function Payment({navigation, route}) {
  const [accountNumber, setAccountNumber] = useState('');
  const [nameAccount, setNameAccount] = useState('');
  const [inputAccountNumber, setInputAccountNumber] = useState('');
  const [inputNameAccount, setInputNameAccount] = useState('');
  const [user, setUser] = useState('');
  const [dana, setDana] = useState('');
  const [count, setCount] = useState('');
  const [duit, setDuit] = useState('');

  const dispatch = useDispatch();

  const sendDana = async () => {
    try {
      dispatch({type: 'SET_LOADING', value: true});
      await axios
        .post(
          'http://loki-api.boncabo.com/pengajuan/pencairan',
          {
            user_id: route.params.user_id,
            nominal: count,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${route.params.token}`,
            },
          },
        )
        .then(res => {
          console.log(res);
          dispatch({type: 'SET_LOADING', value: false});
          navigation.replace('Home');
          showSuccess('Uang sudah kamu sudah diajukan, mohon ditunggu');
        });
    } catch (error) {
      console.log(error);
      dispatch({type: 'SET_LOADING', value: false});
    }
  };

  const getUserDetailFromServer = async () => {
    try {
      await axios
        .get(
          `http://loki-api.boncabo.com/user/detail/${route.params.user_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${route.params.token}`,
            },
          },
        )
        .then(res => {
          setDuit(res.data.data.user_poin);
          setCount(res.data.data.user_poin);
          setUser(res.data.data);
          setAccountNumber(res.data.data.user_norek);
          setNameAccount(res.data.data.user_jenis_bank);
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addAccountNumberUser = async e => {
    e.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', value: true});
      await axios
        .post(
          'http://loki-api.boncabo.com/user/update_rekening',
          {
            user_id: route.params.user_id,
            jenis_rekening: inputNameAccount,
            no_rekening: inputAccountNumber,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${route.params.token}`,
            },
          },
        )
        .then(res => {
          dispatch({type: 'SET_LOADING', value: false});
          showSuccess('No Rekening Berhasil Ditambahkan');
          getUserDetailFromServer();
          console.log(res);
        });
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      console.log(error);
    }
  };

  const tambahDana = () => {
    if (count >= duit) {
      return;
    }
    setCount(count + 10000);
  };

  const kurangDana = () => {
    if (count <= 10000) {
      return;
    }
    setCount(count - 10000);
  };

  useEffect(() => {
    getUserDetailFromServer();
  }, [accountNumber, nameAccount]);

  return (
    <View style={styles.page}>
      <Header title="Cairkan Dana" />
      {accountNumber ? (
        <View style={styles.InputText}>
          <Text>No Rekening Kamu : </Text>
          <Gap height={10} />
          <Text>
            {`${nameAccount} ${accountNumber}
Poin Kamu Tersisa : ${(duit - count).toLocaleString()}
            `}
          </Text>
          <Gap height={12} />
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 20,
              fontFamily: fonts.primary[600],
              marginTop: 15,
            }}>
            Uang yang akan dikirim ke Kamu
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={kurangDana}>
              <Image style={{width: 30, height: 30}} source={IlMinus} />
            </TouchableOpacity>
            <Gap width={10} />
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 30,
                fontFamily: fonts.primary[600],
                marginBottom: 15,
                marginTop: 15,
              }}>
              Rp. {(1 * count).toLocaleString()}
            </Text>
            <Gap width={10} />
            <TouchableOpacity onPress={tambahDana}>
              <Image style={{width: 30, height: 30}} source={IlPlus} />
            </TouchableOpacity>
          </View>

          <Gap height={20} />
          <Button onPress={sendDana} title="Ajukan Pencairan Dana" />
        </View>
      ) : (
        <View style={styles.inputBank}>
          <Input
            keyBoardType="numeric"
            value={inputAccountNumber}
            onChangeText={e => setInputAccountNumber(e)}
            label="Jenis Bank"
          />
          <Gap height={20} />
          <Input
            value={inputNameAccount}
            onChangeText={e => setInputNameAccount(e)}
            label="Nomor Rekening"
          />
          <Gap height={20} />
          <Button onPress={addAccountNumberUser} title="Simpan No Rekening" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  inputBank: {
    margin: 20,
  },
  InputText: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 25,
    paddingRight: 25,
    // alignItems: 'center',
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
