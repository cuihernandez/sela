import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Screen/SplashScreen';
import RegisterScreen from './Screen/RegisterScreen';
import FrameScreen from './Screen/DrawerScreens/FrameScreen'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        <Stack.Screen name="Frame" component={FrameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
