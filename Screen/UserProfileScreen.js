/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
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
import {Dimensions, TouchableOpacity} from 'react-native';
import Header from './Components/Header.js';
import DataComponent from './Components/DataComponent.js';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Const from '../Utils/Const.js';

const screenHeight = Dimensions.get('window').height;

const UserProfileScreen = () => {
  const {donorID} = Const();
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();
  const [value, setValue] = useState(0);
  const [uniqueDoneeNames, setUniqueDoneeNames] = useState([]);
  const userID = useSelector(state => state.user.userID);
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };

  const route = useRoute();

  useEffect(() => {
    if (!userID) navigation.navigate('Login');
  }, [route.name]);

  useEffect(() => {
    const getTotalTransactionAmount = async () => {
      // console.log('User ID is:', userID, donorID);
      try {
        const snapshot = await firestore()
          .collection('transaction')
          .where('donorID', '==', donorID)
          // .where('donorID', '==', 'tn3uuh1D6L7dTnYGlvPi')
          .get();
        let totalAmount = 0;
        snapshot.forEach(doc => {
          totalAmount += parseInt(doc.data().transactionAmount);
        });
        setAmount(totalAmount);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    getTotalTransactionAmount();

    const getID = async () => {
      const donorData = await firestore()
        .collection('userData')
        .where('userID', '==', donorID)
        // .where('userID', '==', 'tn3uuh1D6L7dTnYGlvPi')
        .get();
      const res = donorData.docs;
      const completeCount = res.map(snap => snap._data.completeCount);
      const count = completeCount[0];
      setValue(count);
      // console.log('The userID is :', donorID);
    };
    getID();
    const getTotalName = async () => {
      const res = await firestore()
        .collection('transaction')
        .where('donorID', '==', userID)
        // .where('donorID', '==', 'tn3uuh1D6L7dTnYGlvPi')
        .get();
      const data = res.docs;

      const all = data.map(snap => ({
        name: snap.data().doneeName,
        motherName: snap.data().doneeMotherName, // Assuming you have this field
        email: snap.data().doneeEmail, // Assuming you have this field
      }));
      const uniqueNames = Array.from(
        new Map(all.map(item => [item['name'], item])).values(),
      );
      setUniqueDoneeNames(Array(20).fill(...uniqueNames));
      // console.log('The data is :', all);
    };
    getTotalName();
  }, [userID]);
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
        height={(screenHeight * 14) / 100}>
        <Box>
          <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
            <ArrowBackIcon color="white" size={4} marginLeft="2" />
          </TouchableOpacity>
        </Box>
        <Center width="100" height="100">
          <Image source={require('../Image/edit.png')} alt="edit image" />
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
            <Text color="#560FC9" fontWeight="bold" fontSize="lg">
              {value}
            </Text>
            <Text color="#560FC9" fontWeight="bold" fontSize="lg">
              {amount}
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
        <View backgroundColor="#F1E6FF" margin="3" borderRadius="20" flex={1}>
          <Text marginTop="3" marginRight="6" color="#8F80A7">
            חולה רשום
          </Text>
          <ScrollView h="50" margin="3">
            {/* {uniqueDoneeNames && Array.isArray(uniqueDoneeNames) && uniqueDoneeNames.map((names, index) => (
              <DataComponent key={index} name={names} onNavigate={() => navigation.navigate('RegPatient', { doneeName: names })} />
            ))} */}
            {uniqueDoneeNames.map((donee, index) => (
              <DataComponent
                key={index}
                name={donee.name}
                onNavigate={() =>
                  navigation.navigate('RegPatient', {
                    doneeName: donee.name,
                    doneeMotherName: donee.motherName,
                    doneeEmail: donee.email,
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
      </Box>
    </>
  );
};
export default UserProfileScreen;
