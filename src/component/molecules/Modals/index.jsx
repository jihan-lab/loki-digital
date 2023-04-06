import {default as React, useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

import {colors, getData, showError, storeData} from '../../../utils';
import {Button, Call, Gap, Status} from '../../atoms';

export default function Modals({user, number}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDuration, setStartDuration] = useState('');
  const [finishDuration, setFinishDuration] = useState('');
  const [durationCalculation, setDurationCalculation] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [allContactStorage, setAllContactStorage] = useState([]);
  const [reportContact, setReportContact] = useState('');

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

  const getAllContactStorage = async () => {
    const result = await getData('allContact').then(res => {
      return res;
    });
    setAllContactStorage(result);
  };

  const data = {
    data: [
      {
        phone: '0989',
        action: '2',
      },
      {
        phone: '0989',
        action: '2',
      },
    ],
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
    getAllContactStorage();
    const temp = allContactStorage.pop();
    storeData('allContact', allContactStorage);
    storeData('targetPhone', temp);
    getTargetPhoneStorage();
  };

  useEffect(() => {
    getReportContactStorage();
    getAllContactStorage();
    getTargetPhoneStorage();
  }, [
    targetPhone,
    startDuration,
    finishDuration,
    durationCalculation,
    reportContact,
  ]);

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
}

const Style = StyleSheet.create({
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
