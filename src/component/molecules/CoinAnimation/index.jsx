import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {gifCoin} from '../../../image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Gap} from '../../atoms';
import {useDispatch, useSelector} from 'react-redux';

export default function CoinAnimation() {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  const closeAnimation = () => {
    dispatch({type: 'SET_COIN_ANIMATION', value: false});
  };

  return (
    <View style={styles.wrapper}>
      <Image
        source={gifCoin}
        style={{width: 300, height: 300, marginVertical: -40}}
      />
      <Text style={styles.text}>
        Hore, Kamu Dapat {stateGlobal.rewardCoin} Koin
      </Text>
      <Gap height={20} />
      <Button onPress={closeAnimation} title="Ambil" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.coinAnimationBackground,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 30,
    color: colors.white,
    fontFamily: fonts.primary[600],
    marginTop: 16,
    textShadowColor: colors.black,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    textShadowRadius: 4,
    elevation: 5,
  },
});
