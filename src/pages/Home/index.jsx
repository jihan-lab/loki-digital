import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import {useDispatch} from 'react-redux';
import {Button, Call, Gap, Header, ModalCom, Status} from '../../component';
import {
  colors,
  deleteData,
  fonts,
  getData,
  showError,
  showSuccess,
  storeData,
} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CallRecord from 'react-native-call-record';

const Home = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState('');
  const [point, setPoint] = useState('');
  const [token, setToken] = useState('');
  const [startDuration, setStartDuration] = useState('');
  const [finishDuration, setFinishDuration] = useState('');
  const [durationCalculation, setDurationCalculation] = useState('');
  const [allContactStorage, setAllContactStorage] = useState([]);
  const [targetPhone, setTargetPhone] = useState('');
  const [reportContact, setReportContact] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const getUserFromServer = async () => {
    try {
      await axios
        .get(`http://loki-api.boncabo.com/user/detail/${user.user_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(res => {
          if (res.data.data.user_status === 'SUSPEND') {
            deleteData('user');
            navigation.replace('Login');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllContactStorage = async () => {
    const result = await getData('allContact').then(res => {
      return res;
    });
    if (result === undefined) {
      setAllContactStorage(0);
    } else {
      setAllContactStorage(result.length);
    }
  };

  const getTargetPhoneStorage = async () => {
    const result = await getData('targetPhone').then(res => {
      return res;
    });
    if (result) {
      setTargetPhone(result.target_handphone);
    } else {
      setTargetPhone(0);
    }
  };

  const getPhoneNumber = async () => {
    const result = await getData('allContact').then(res => {
      return res;
    });
    const temp = result.pop();
    storeData('allContact', result);
    storeData('targetPhone', temp);
    getTargetPhoneStorage();
  };

  const getAllDataPhoneServer = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    try {
      const response = await axios.get(
        `http://loki-api.boncabo.com/phone/index/${user.user_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        storeData('allContact', response.data.data);
        getAllContactStorage();
        getPhoneNumber();
        showSuccess('Berhasil mengambil data nomor');
      }
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      console.log(error);
    }
  };

  const getDataUserFormLocal = async () => {
    await getData('user').then(res => {
      setUser(res);
      setUserName(res.username);
      setToken(res.token);
      return res;
    });
  };

  const getReportContactStorage = async () => {
    const response = await getData('reportContact').then(res => {
      return res;
    });

    if (response === undefined) {
      setReportContact(0);
    } else {
      setReportContact(response.length);
    }
  };

  const deleteDataDummy = () => {
    deleteData('allContact');
    deleteData('targetPhone');
    deleteData('reportContact');
  };

  // Modal Komponen
  const calling = async () => {
    RNImmediatePhoneCall.immediatePhoneCall(`+${targetPhone}`);
    setTimeout(() => {
      setModalVisible(true);
    }, 1000);
    const date = new Date();
    setStartDuration(date.getTime());
  };

  const getReward = async () => {
    try {
      await axios
        .get(`http://loki-api.boncabo.com/user/detail/${user.user_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setPoint(response.data.data.user_poin);
          return response;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendAllDataReportToServer = async () => {
    const response = await getData('reportContact').then(res => {
      return res;
    });
    if (response === undefined) {
      return showError('Data laporan masih kosong, silahkan lakukan panggilan');
    }
    if (response.length < 50) {
      return showError(
        'Mohon selesaikan terlebih dahulu nomor yang sudah diambil',
      );
    }
    let data = {data: []};

    response.map(item => {
      data.data.push(item);
    });
    dispatch({type: 'SET_LOADING', value: true});
    try {
      await axios
        .post(`http://loki-api.boncabo.com/phone/update_phone`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          showSuccess(`Data laporan berhasil dikirim, anda mendapatkan POIN`);
        });
    } catch (error) {
      console.log(error);
      showError(`Data laporan gagal dikirim, anda tidak mendapatkan POIN`);
      dispatch({type: 'SET_LOADING', value: false});
    }

    let rewardUser;
    try {
      const reward = await axios
        .get(`http://loki-api.boncabo.com/user/detail/${user.user_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setPoint(response.data.data.user_poin);
          return response;
        });
      rewardUser = reward.data.data.user_poin;
    } catch (error) {
      console.log(error);
    }

    deleteData('allContact');
    deleteData('targetPhone');
    deleteData('reportContact');
    getAllContactStorage();
    getTargetPhoneStorage();
    getReportContactStorage();

    dispatch({type: 'SET_LOADING', value: false});
    dispatch({type: 'SET_REWARD', value: 350});
    dispatch({type: 'SET_COIN_ANIMATION', value: true});
    setTimeout(() => {
      getReward();
    }, 2000);
  };

  const report = async n => {
    // Duration
    const date = new Date();
    setFinishDuration(date.getTime());
    const finish = date.getTime();
    let start;
    if (startDuration === null) {
      setStartDuration(date.getTime());
      start = date.getTime();
    } else {
      start = startDuration;
    }
    const duration = finish - start;
    const minutes = Math.floor(duration / 60000);
    const second = ((duration % 60000) / 1000).toFixed(0);
    const time = minutes + ':' + (second < 10 ? '0' : '') + second;
    setDurationCalculation(time);

    const result = await getData('reportContact').then(res => {
      return res;
    });
    let temp = [];
    if (result === undefined) {
      temp = [
        {
          phone: targetPhone,
          action: n,
          user_id: user.user_id,
          duration: time,
        },
      ];
    } else {
      if (result.length === 50) {
        setModalVisible(!modalVisible);
        return showError('Total Call sudah 50, harap kirim semua data laporan');
      }
      temp = result.concat({
        phone: targetPhone,
        action: n,
        user_id: user.user_id,
        duration: time,
      });
    }
    storeData('reportContact', temp);
    const response = await getData('reportContact').then(res => {
      return res;
    });
    if (response.length === 50) {
      deleteData('targetPhone');
    }
    setModalVisible(false);
    getReportContactStorage();
    getPhoneNumber();

    await getData('targetPhone').then(res => {
      setTargetPhone(res);
    });

    await getData('allContact').then(res => {
      setAllContactStorage(res.length);
    });
  };

  const Modals = () => {
    return (
      <View style={Style.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={Style.centeredViewModal}>
            <View style={Style.modalView}>
              <Text style={Style.modalText}>Status No. Telp</Text>
              <View style={Style.modalContent}>
                <Status
                  style={[Style.buttonModal, Style.buttonClose]}
                  onPress={() => report('TERDAFTAR')}
                  status="aktif"
                />
                <Gap width={10} />
                <Status
                  style={[Style.buttonModal, Style.buttonClose]}
                  onPress={() => report('TIDAK_AKTIF')}
                  status="tidakAktif"
                />
                <Gap width={10} />
                <Status
                  style={[Style.buttonModal, Style.buttonClose]}
                  onPress={() => report('TIDAK_TERDAFTAR')}
                  status="tidakTerdaftar"
                />
              </View>
            </View>
          </View>
        </Modal>
        {reportContact === 50 || targetPhone === 0 ? (
          ''
        ) : (
          <Call onPress={calling} />
        )}

        <Gap height={20} />
        {targetPhone !== 0 && (
          <Button title={`POIN : ${reportContact}`} type="reportAlert" />
        )}
        {reportContact === 50 && (
          <>
            <Button
              onPress={sendAllDataReportToServer}
              type="send"
              title={`POIN : ${reportContact}`}
            />
            <Gap height={20} />
            <Button
              title="Anda telah memeriksa 50 Telp. Harap ambil reward anda"
              type="reportAlert"
            />
          </>
        )}
      </View>
    );
  };

  useEffect(() => {
    getReward();
    getDataUserFormLocal();
    getTargetPhoneStorage();
    getReportContactStorage();
    getAllContactStorage();
    getUserFromServer();
  }, [targetPhone, reportContact, point]);

  return (
    <>
      <Header title="Loki Digital" />
      <SafeAreaView style={Style.container}>
        <View style={Style.box_2}>
          <View style={Style.box_1}>
            <View style={Style.box_phone}>
              <Text style={Style.font_title}>
                Hai, {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </Text>
              <ModalCom />
            </View>
            <Text
              style={{
                color: colors.text.primary,
                textAlign: 'right',
              }}>
              {reportContact === 50 && `No Telp tersisa : ${allContactStorage}`}
              {targetPhone !== 0 &&
                `No Telp tersisa : ${allContactStorage + 1}`}
            </Text>
            <Text style={Style.text}>Reward Kamu</Text>
            <View style={Style.InputText}>
              <Text>Reward Kamu Berjumlah : </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 40,
                  fontFamily: fonts.primary[600],
                  marginBottom: 15,
                }}>
                Rp. {(1 * point).toLocaleString()}
              </Text>
              {point && point >= 10000 && (
                <View style={Style.cairkanDana}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Payment', user)}>
                    <Text>Cairkan Dana</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={Style.wrapButtonSend}>
          <Modals user={user} number={targetPhone} />

          <Gap height={20} />

          {allContactStorage || reportContact ? (
            ''
          ) : (
            <Button onPress={getAllDataPhoneServer} title="Ambil Nomor Telp" />
          )}
          <Gap height={50} />
          {/* <Button onPress={deleteDataDummy} title="delete" /> */}
          <View style={Style.waWrap}>
            <TouchableOpacity
              style={Style.wa}
              onPress={() =>
                Linking.openURL(
                  'https://chat.whatsapp.com/IoxohbBw0td49zZMbX2Ek1',
                )
              }>
              <Image
                source={require('../../image/whatsapp.png')}
                style={{width: 30, height: 30}}
              />
              <Text
                style={{
                  color: colors.text.primary,
                  marginTop: 5,
                  fontFamily: fonts.primary[500],
                }}>
                Bantuan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

// #FFAB00
const Style = StyleSheet.create({
  cairkanDana: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    borderRadius: 120 / 2,
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    // width: 120,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  wrapButtonSend: {
    flex: 1,
  },
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
    fontFamily: fonts.primary[700],
  },
  InputText: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 25,
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
    padding: 5,
    gap: 10,
  },
  box_2: {
    marginTop: 5,
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
    borderRadius: 100,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  waWrap: {
    marginTop: -20,
    fontSize: 10,
    alignItems: 'flex-end',
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  wa: {
    alignItems: 'center',
  },

  // Modal Style
  buttonCall: {
    alignSelf: 'center',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#37a137',
    marginTop: 23,
    paddingVertical: 12,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: colors.text.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Home;
