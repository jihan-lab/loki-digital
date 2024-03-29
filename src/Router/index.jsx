import {createStackNavigator} from '@react-navigation/stack';
import {Home, Login, Payment, Splash} from '../pages';

const Stack = createStackNavigator();
//

const Router = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default Router;
