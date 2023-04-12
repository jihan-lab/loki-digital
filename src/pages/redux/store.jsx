import {legacy_createStore as createStore} from 'redux';

const initialState = {
  loading: false,
  coinAnimation: false,
  infoModal: false,
  rewardCoin: '',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_COIN_ANIMATION') {
    return {
      ...state,
      coinAnimation: action.value,
    };
  }
  if (action.type === 'SET_INFO') {
    return {
      ...state,
      infoModal: action.value,
    };
  }
  if (action.type === 'SET_REWARD') {
    return {
      ...state,
      rewardCoin: action.value,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
