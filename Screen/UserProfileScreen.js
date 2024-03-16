/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  ArrowBackIcon,
  Box,
  Center,
  Button,
  HStack,
  Image,
  View,
  Text,
  ScrollView,
} from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';
import Header from './Components/Header.js';
import DataComponent from './Components/DataComponent.js';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Const from '../Utils/Const.js';

const UserProfileScreen = () => {

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const { donorID } = Const();
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();
  const [value, setValue] = useState(0);
  const [uniqueDoneeNames, setUniqueDoneeNames] = useState([]);

  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  const userID = useSelector(state => state.user.userID);
  useEffect(() => {
    const getTotalTransactionAmount = async () => {
      console.log('User ID is:', userID, donorID);
      try {
        const snapshot = await firestore()
          .collection('transaction')
          .where('donorID', '==', donorID)
          .get();
        let totalAmount = 0;
        snapshot.forEach((doc) => {
          totalAmount += parseInt(doc.data().transactionAmount);
        });
        setAmount(totalAmount);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    getTotalTransactionAmount();

    const getID = async () => {
      const donorData = await firestore()
        .collection('userData')
        .where('userID', '==', donorID)
        .get();
      const res = donorData.docs;
      const completeCount = res.map(snap => snap._data.completeCount);
      const count = completeCount[0];
      setValue(count);
      console.log('The userID is :', donorID);

    }
    getID();
    const getTotalName = async () => {
      const res = await firestore()
        .collection('transaction')
        .where('donorID', '==', userID)
        .get();
      const data = res.docs;
      const all = data.map(snap => snap._data.doneeName);
      setUniqueDoneeNames(...uniqueDoneeNames, all);
      console.log('The data is :', all);
    };
    getTotalName();

  }, []);
  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        p={4}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}
        height={screenHeight * 14 / 100}>
        <Box>
          <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
            <ArrowBackIcon color="white" size={4} marginLeft="2" />
          </TouchableOpacity>
        </Box>
        <Center width="100" height="100">
          <Image
            source={require('../Image/edit.png')}
            alt="edit image"
          />
        </Center>
        <Box />
      </HStack>
      <Box
        flex={1}
      //   alignItems="center"
      >
        <View padding="5">
          <Center marginBottom="4">
            <Text color="#560FC9" fontSize="lg" fontWeight="bold">
              תרומות
            </Text>
          </Center>
          <View flexDirection="row" justifyContent="space-between">
            <Text color="#560FC9" fontWeight="blod" fontSize="lg">
              {value}
            </Text>
            <Text color="#560FC9" fontWeight="bold" fontSize="lg">
              ${amount}
            </Text>
          </View>
          <View flexDirection="row" justifyContent="space-between">
            <Text color="#560FC9" fontWeight="bold" fontSize="md">
              תפילות
            </Text>
            <Text color="#560FC9" fontWeight="bold" fontSize="md">
              סך התרומות
            </Text>
          </View>
        </View>
        <Center>
          <Text> יש להעביר כסף ולהעלות צילום מסך</Text>
        </Center>
        <HStack
          flexDirection="row"
          justifyContent="center">
          <Button
            id="credit add"
            backgroundColor="#560FC9"
            borderRadius="2xl"
            margin="2"
            width={(screenWidth * 40) / 100}
          >
            הוסף קרדיט לחולה
          </Button>
          <Button
            id='btn_download'
            backgroundColor="#560FC9"
            borderRadius="2xl"
            margin="2"
            width={(screenWidth * 50) / 100}>
            <HStack alignItems="center">
              <Text color="white">{'  '}שמור צילום מסך</Text>
              <Image
                source={require('../Image/icon_download.png')}
                alt="download"
              />
            </HStack>
          </Button>
        </HStack>
        <View backgroundColor="#F1E6FF" margin="3" borderRadius="20" height={(screenHeight * 43) / 100}>
          <Text marginTop="3" marginRight="6" color="#8F80A7">חולה רשום</Text>
          <ScrollView h="80" margin="3">

            {/* {uniqueDoneeNames.map((names, index) => (
              <DataComponent key={index} name={names} />
            ))} */}
            {uniqueDoneeNames && Array.isArray(uniqueDoneeNames) && uniqueDoneeNames.map((names, index) => (
              <DataComponent key={index} name={names} />
            ))}
          </ScrollView>
        </View>
      </Box >
      <View alignItems="center" justifyContent="center" marginBottom="4">
        <Button
          backgroundColor="#560FC9"
          borderRadius="2xl"
          margin="2"
          width={(screenWidth * 90) / 100}
        >עדכן</Button>
      </View>
    </>
  );
};
export default UserProfileScreen;
