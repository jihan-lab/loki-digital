import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};

export const deleteData = async key => {
  try {
    const value = await AsyncStorage.removeItem(key);
    if (value) {
      console.log('Success');
    }
  } catch (e) {
    // error reading value
  }
};

const dummy = [
  {phone: '6285735110475', action: 3, user: 'lukman', duration: '00:25'},
  {phone: '62858440101063', action: 3, user: 'lukman', duration: '00:25'},
  {phone: '6281596963901', action: 3, user: 'lukman', duration: '00:25'},
  {phone: '6281528593927', action: 1, user: 'lukman', duration: '00:25'},
];

// const dummy2 =
// {
//   {phone: '6285735110475', action: 3},
//   {phone: '62858440101063', action: 3},
//   {phone: '6281596963901', action: 3},
//   {phone: '6281528593927', action: 1},
// }
