const mainColors = {
  blue: '#4221EE',
  green: '#EDFCFD',
  green1: '#0BCAD4',
  black: '#112340',
  black2: 'rgba(0, 0, 0, 0.5)',
  black3: 'rgba(0, 0, 0, 0.8)',
  grey: '#E9E9E9',
  grey2: '#B1B7C2',
  grey3: '#EDEEF0',
  grey4: '#B1B7C2',
  dark: '#112340',
  red: '#E06379',
  yellow: '#DC9424',
};

export const colors = {
  primary: mainColors.blue,
  white: 'white',
  black: mainColors.black,
  warning: mainColors.yellow,

  text: {
    primary: mainColors.dark,
    secondary: mainColors.grey,
    disable: mainColors.grey2,
  },

  disable: {
    background: mainColors.grey3,
    text: mainColors.grey4,
  },
  loadingBackground: mainColors.black2,
  coinAnimationBackground: mainColors.black3,
  success: mainColors.green1,
  error: mainColors.red,
};
