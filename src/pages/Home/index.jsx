import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
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

const Home = ({navigation}) => {
  const [user, setUser] = useState([]);
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
  const calling = () => {
    setModalVisible(true);
    // Start Duration
    const date = new Date();
    setStartDuration(date.getTime());
    RNImmediatePhoneCall.immediatePhoneCall(`+${targetPhone}`);
  };

  const getReward = async () => {
    try {
      const reward = await axios
        .get(`http://loki-api.boncabo.com/user/detail/${user.user_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          console.log(response.data.data.user_poin);
          setPoint(response.data.data.user_poin);
          return response;
        });
    } catch (error) {
      console.log('hello');
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
    console.log(data);
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
          console.log(response);
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
      console.log('nah kan');
    } else {
      start = startDuration;
      console.log('na loh');
    }
    const duration = finish - start;
    console.log(duration);
    const minutes = Math.floor(duration / 60000);
    const second = ((duration % 60000) / 1000).toFixed(0);
    const time = minutes + ':' + (second < 10 ? '0' : '') + second;
    setDurationCalculation(time);
    console.log(time);

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
    console.log('duration : ', time);
    const response = await getData('reportContact').then(res => {
      return res;
    });
    console.log('reportContact', response);
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
                  onPress={() => report(1)}
                  status="active"
                />
                <Gap width={10} />
                <Status
                  style={[Style.buttonModal, Style.buttonClose]}
                  onPress={() => report(3)}
                  status="notListed"
                />
                <Gap width={10} />
                <Status
                  style={[Style.buttonModal, Style.buttonClose]}
                  onPress={() => report(2)}
                  status="notActive"
                />
              </View>
            </View>
          </View>
        </Modal>
        <Call onPress={calling} />
        <Gap height={20} />
        <Button
          onPress={sendAllDataReportToServer}
          title={`Kirim semua data laporan : ${reportContact}`}
        />
      </View>
    );
  };

  useEffect(() => {
    setTimeout(async () => {
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
          console.log(response);
          storeData('user', response.data);
          storeData('passwordUser', password);
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
    }, 300000);

    getReward();
    getDataUserFormLocal();
    getTargetPhoneStorage();
    getReportContactStorage();
    getAllContactStorage();
  }, [targetPhone, reportContact, point]);

  return (
    <>
      <Header title="Loki Digital" />
      <SafeAreaView style={Style.container}>
        <View style={Style.box_2}>
          <View style={Style.box_1}>
            <View style={Style.box_phone}>
              <Text style={Style.font_title}>Hai, {user?.username}</Text>
              <ModalCom />
            </View>
            <Text
              style={{
                color: colors.text.primary,
                textAlign: 'right',
              }}>
              No Telp tersisa : {allContactStorage}
            </Text>
            <Text style={Style.text}>Reward Kamu</Text>
            <View style={Style.InputText}>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 40,
                  fontFamily: fonts.primary[600],
                  marginBottom: 15,
                }}>
                Rp. {(10 * point).toLocaleString()}
              </Text>
              <Text>Point Kamu Berjumlah : {point} Point</Text>
            </View>
          </View>
        </View>
        {targetPhone === 0 ? '' : <Modals user={user} number={targetPhone} />}

        <Gap height={20} />

        {allContactStorage || reportContact ? (
          ''
        ) : (
          <Button onPress={getAllDataPhoneServer} title="Ambil Nomor Telp" />
        )}
        <Gap height={50} />
        {/* <Button onPress={deleteDataDummy} title="delete" /> */}
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
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Home;
