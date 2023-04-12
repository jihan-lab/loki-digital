import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors, fonts} from '../../../utils';
import {Info} from '../../atoms';

export default function ModalCom() {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const info = () => {
    setModalVisible(true);
    dispatch({type: 'SET_INFO', value: true});
  };

  const close = () => {
    setModalVisible(!modalVisible);
    dispatch({type: 'SET_INFO', value: false});
  };
  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={close}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>LOKI Digital 1.04.09</Text>
                <View style={styles.modalContainer}>
                  <Text style={styles.textModal}>
                    Hal - Hal yang harus diperhatikan :
                  </Text>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontFamily: fonts.primary[500],
                      lineHeight: 24,
                      // textAlign: 'justify',
                    }}>
                    <Text style={styles.mainFont}>
                      {'\n '}Tidak Terdaftar :{'\n '}
                    </Text>
                    <Text>
                      TSEL : Nomor yang anda tuju tidak dapat {'\n '}dihubungi,
                      mohon periksa kembali nomor {'\n '}tujuan anda{'\n '}
                    </Text>
                    <Text style={styles.mainFont}>
                      {'\n '}Tidak Aktif: {'\n '}
                    </Text>
                    <Text>
                      Nomor yang anda tuju sedang tidak aktif {'\n '}atau berada
                      di luar jangkauan{'\n '}
                    </Text>
                    <Text style={styles.mainFont}>
                      {'\n '}Terdaftar: {'\n '}
                    </Text>
                    <Text>
                      * Dering {'\n '}* Sedang Sibuk {'\n '}* Rekam pesan anda..{' '}
                      {'\n '}* Saat ditelpon Langsung mati{'\n '}
                    </Text>
                    <Text style={styles.mainFont}>
                      {'\n '}Akun otomatis disuspend apabila {'\n '}ditemukan
                      10% kesalahan {'\n '}pemeriksaan{'\n '}
                    </Text>
                    <Text style={styles.mainFont}>
                      {'\n '}Minimal Reward Klaim : {'\n '}Rp 10.000{'\n '}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
      <Info onPress={info} />
    </>
  );
}

const styles = StyleSheet.create({
  mainFont: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    textAlign: 'left',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textModal: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
});
