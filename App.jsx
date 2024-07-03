import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Box, NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SplashScreen from '#/Screen/SplashScreen';

import LoginScreen from './src/Screen/LoginScreen';
import FrameScreen1 from './src/Screen/DrawerScreens/FrameScreen1';
import FrameScreen2 from './src/Screen/DrawerScreens/FrameScreen2';
import FrameScreen3 from './src/Screen/DrawerScreens/FrameScreen3';
import TestimonialsScreens from './src/Screen/TestimonialsScreen';
import AboutScreen from './src/Screen/AboutScreen';
import RegisterPatientScreen from './src/Screen/RegisterPatientScreen';
import UserProfileScreen from './src/Screen/UserProfileScreen';
import EditProfileScreen from './src/Screen/EditProfileScreen';
import RecommendScreen from './src/Screen/RecommendScreen';
import PaymentScreen from './src/Screen/PaymentScreen';
import StudentsScreen from './src/Screen/StudentsScreen';
import {ErrorBoundary} from '#/Utils/ErrorBoundary';
import RegisterScreen from './src/Screen/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log('LIVE');
  }, []);
  return (
    <ErrorBoundary>
      <NativeBaseProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <SafeAreaProvider
              style={{
                flex: 1,
              }}>
              <Provider store={store}>
                <Stack.Navigator
                  screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                  }}>
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
              </Provider>
            </SafeAreaProvider>
          </SafeAreaView>
        </NavigationContainer>
      </NativeBaseProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
