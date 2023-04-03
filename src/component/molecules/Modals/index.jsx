import {default as React, useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {useDispatch} from 'react-redux';
import {getData} from '../../../utils';
import axios from 'axios';

export default function Modals({number}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const [temp, setTemp] = useState(false);

  const dispatch = useDispatch();
  const calling = () => {
    RNImmediatePhoneCall.immediatePhoneCall(number);
  };

  const getValue = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    // try {
    //   await axios.post(
    //     'http://loki-api.boncabo.com/phone/update_phone',
    //     {phone: number, action: n},
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   console.log('number :', number);
    //   console.log('action :', n);
    //   dispatch({type: 'SET_LOADING', value: false});
    // } catch (error) {
    //   dispatch({type: 'SET_LOADING', value: false});
    //   console.log(error);
    // }
    setModalVisible(!modalVisible);
    dispatch({type: 'SET_LOADING', value: false});
  };
  useEffect(() => {
    getData('user').then(res => {
      setToken(res.token);
    });
  }, []);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => getValue(1)}>
              <Text style={styles.textStyle}>1</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>2</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>3</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.buttonCall} onPress={calling}>
        <Image
          source={require('../../../image/PhoneCall.png')}
          style={{width: 45, height: 45}}
        />
        <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 20}}>
          Call
        </Text>
      </Pressable>
    </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
