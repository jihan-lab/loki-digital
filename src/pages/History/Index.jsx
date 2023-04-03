import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {React, useEffect} from 'react';
import {Header} from '../../component';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../../utils';

export default function History() {
  return (
    <>
      <Header title="History" />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.phone}>+62 0896******</Text>
          <Text style={styles.phone}>+62 0896******</Text>
          <Text style={styles.phone}>+62 0896******</Text>
          <Text style={styles.phone}>+62 0896******</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  phone: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 5,
  },
});
