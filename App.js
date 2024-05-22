/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, View} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './Screen/SplashScreen';
import RegisterScreen from './Screen/RegisterScreen';
import LoginScreen from './Screen/LoginScreen';
import FrameScreen1 from './Screen/DrawerScreens/FrameScreen1';
import FrameScreen2 from './Screen/DrawerScreens/FrameScreen2';
import FrameScreen3 from './Screen/DrawerScreens/FrameScreen3';
import TestimonialsScreens from './Screen/TestimonialsScreen';
import AboutScreen from './Screen/AboutScreen';
import RegisterPatientScreen from './Screen/RegisterPatientScreen';
import UserProfileScreen from './Screen/UserProfileScreen';
import EditProfileScreen from './Screen/EditProfileScreen';
import RecommendScreen from './Screen/RecommendScreen';
import {Provider} from 'react-redux';
import store from './redux/store';
import SuccessScreen from './Screen/SuccessScreen';
import PaymentScreen from './Screen/PaymentScreen';
import StudentsScreen from './Screen/StudentsScreen';
import RequiresAuth from './Utils/RequiresAuth';
// import ReduxProvider from './store';
const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['your-app://'], // Your app scheme
  config: {
    screens: {
      Success: 'payment-success', // Screen to handle success redirect
    },
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider isSSR={false}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Frame1"
              component={FrameScreen1}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Frame2"
              component={FrameScreen2}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Frame3"
              component={FrameScreen3}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Testimonials"
              component={TestimonialsScreens}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RegPatient"
              component={RegisterPatientScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RecommendProfile"
              component={RecommendScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Students"
              component={StudentsScreen}
              options={{headerTitle: 'תלמידים', headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
