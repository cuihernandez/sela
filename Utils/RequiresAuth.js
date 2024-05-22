import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import FrameScreen1 from '../Screen/DrawerScreens/FrameScreen1';
import FrameScreen2 from '../Screen/DrawerScreens/FrameScreen2';
import FrameScreen3 from '../Screen/DrawerScreens/FrameScreen3';
import TestimonialsScreens from '../Screen/TestimonialsScreen';
import AboutScreen from '../Screen/AboutScreen';
import RegisterPatientScreen from '../Screen/RegisterPatientScreen';
import UserProfileScreen from '../Screen/UserProfileScreen';
import EditProfileScreen from '../Screen/EditProfileScreen';
import RecommendScreen from '../Screen/RecommendScreen';
import PaymentScreen from '../Screen/PaymentScreen';
import {Stack} from '../App';

export default function RequiresAuth() {
  const userID = useSelector(state => state.user.userID);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (!userID) navigation.navigate('Login');
  }, [route.name]);

  return (
    <>
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
    </>
  );
}
