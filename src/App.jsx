import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import Router from './Router';
import store from './pages/redux/store';
import {Loading} from './component';
import {Provider, useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  LogBox.ignoreAllLogs();
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
