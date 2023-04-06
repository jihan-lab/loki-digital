import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Login} from '../pages';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const MainApp = () => {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen
//         options={{headerShown: false}}
//         name="Home"
//         component={Home}
//       />
//       <Drawer.Screen
//         options={{headerShown: false}}
//         name="Login"
//         component={Login}
//       />
//     </Drawer.Navigator>
//   );
// };

const Router = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    </>
  );
};

export default Router;
