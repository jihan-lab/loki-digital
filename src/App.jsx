import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import Router from './Router';
import store from './pages/redux/store';
import {Loading} from './component';
import {Provider, useSelector} from 'react-redux';

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  LogBox.ignoreAllLogs();
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {stateGlobal.loading && <Loading />}
      {stateGlobal.report}
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
