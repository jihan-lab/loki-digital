import {showMessage} from 'react-native-flash-message';
import {colors} from '../colors';

export const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white,
    duration: 3000,
  });
};
export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.success,
    color: colors.white,
    duration: 3000,
  });
};
