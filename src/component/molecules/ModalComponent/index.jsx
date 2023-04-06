import React, {useState} from 'react';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../utils';
import {Info} from '../../atoms';

export default function ModalCom() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Info Mass seh</Text>
                <View style={styles.modalContainer}>
                  <View style={styles.waWrap}>
                    <Pressable
                      style={styles.wa}
                      onPress={() =>
                        Linking.openURL(
                          'https://chat.whatsapp.com/IoxohbBw0td49zZMbX2Ek1',
                        )
                      }>
                      <Image
                        source={require('../../../image/whatsapp.png')}
                        style={{width: 30, height: 30}}
                      />
                      <Text>Bantuan</Text>
                    </Pressable>
                  </View>
                  <View></View>
                  <Text style={styles.textModal}>
                    Hal - Hal yang harus diperhatikan :
                  </Text>
                  <Text>
                    {`
Tidak Terdaftar : 
* TSEL : Nomor yang anda tuju tidak dapat
dihubungi, mohon periksa kembali nomor tujuan anda 

Tidak Aktif: * Nomor yang anda tuju sedang tidak aktif atau berada
di luar jangkauan

Terdaftar:
* Dering
* Sedang Sibuk
* Rekam pesan anda..
* Saat ditelpon Langsung mati
`}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
      <Info onPress={() => setModalVisible(true)} />
    </>
  );
}

const styles = StyleSheet.create({
  textModal: {
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 20,
  },
  modalContainer: {
    height: '100%',
    width: '100%',
  },
  waWrap: {
    fontSize: 10,
    alignItems: 'flex-end',
  },
  wa: {
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '100%',
    margin: 20,
    backgroundColor: colors.success,
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
