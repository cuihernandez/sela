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
import {ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native';
import Header from './Components/Header.js';
import DataComponent from './Components/DataComponent.js';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {collection, query, where, getDocs} from 'firebase/firestore';

import Const from '../Utils/Const.js';
import BackButton from './Components/BackButton.js';
import {firestore} from '#/Utils/firebaseConfig.js';

const screenHeight = Dimensions.get('window').height;
const UserProfileScreen = () => {
  const {donorID} = Const();
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();
  const [value, setValue] = useState(0);
  const [uniqueDoneeNames, setUniqueDoneeNames] = useState([]);
  const [loading, setLoading] = useState(false);
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
      try {
        const snapshot = await getDocs(
          query(
            collection(firestore, 'transaction'),
            where('donorID', '==', donorID),
          ),
        );
        let totalAmount = 0;
        snapshot.forEach(doc => {
          totalAmount += parseInt(doc.data().totalDonation);
        });
        setAmount(totalAmount);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const getID = async () => {
      try {
        const donorData = await getDocs(
          query(
            collection(firestore, 'userData'),
            where('userID', '==', donorID),
          ),
        );
        const res = donorData.docs;
        const completeCount = res.map(snap => snap.data().completeCount);
        const count = completeCount[0];
        setValue(count);
      } catch (error) {
        console.error('Error fetching donor data:', error);
      }
    };

    const getTotalName = async () => {
      try {
        const res = await getDocs(
          query(
            collection(firestore, 'transaction'),
            where('donorID', '==', userID),
          ),
        );
        const data = res.docs;

        const all = data.map(snap => ({
          name: snap.data().doneeName,
          motherName: snap.data().doneeMotherName, // Assuming you have this field
          email: snap.data().doneeEmail, // Assuming you have this field
        }));
        const uniqueNames = Array.from(
          new Map(all.map(item => [item['name'], item])).values(),
        );
        setUniqueDoneeNames(uniqueNames);
      } catch (error) {
        console.error('Error fetching unique names:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        await getTotalTransactionAmount();
        await getID();
        await getTotalName();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        justifyContent="center"
        alignItems="center"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}
        height={(screenHeight * 14) / 100}>
        <BackButton top={5} left={4} />
        <Center width="100" height="100" alignSelf={'center'}>
          <Image source={require('../Image/edit.png')} alt="edit image" />
        </Center>
      </HStack>
      <Box
        flex={1}
        //   alignItems="center"
      >
        <View padding="5">
          <Center marginBottom="4">
            <Text color="#560FC9" fontSize="lg" fontWeight="bold">
              נתוני תרומות ותפילות
            </Text>
          </Center>
          <View flexDirection="row" justifyContent="space-between">
            <Text color="#560FC9" fontWeight="bold" fontSize="lg">
              {value}
            </Text>
            <Text color="#560FC9" fontWeight="bold" fontSize="lg">
              {amount?.toFixed(2)}₪
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
          <Text>100% מהכסף שנתרם מועבר לצדקה</Text>
        </Center>
        <View backgroundColor="#F1E6FF" margin="3" borderRadius="20" flex={1}>
          <Text marginTop="3" marginRight="6" color="#8F80A7">
            אנשים שרשמתי לתפילה
          </Text>
          <ScrollView h="50" margin="3">
            {/* {uniqueDoneeNames && Array.isArray(uniqueDoneeNames) && uniqueDoneeNames.map((names, index) => (
              <DataComponent key={index} name={names} onNavigate={() => navigation.navigate('RegPatient', { doneeName: names })} />
            ))} */}
            {loading ? (
              <Box marginTop={5}>
                <ActivityIndicator color={'#560FC9'} size={50} />
              </Box>
            ) : !uniqueDoneeNames.length ? (
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 16, textAlign: 'center'}}>
                  אין נתונים זמינים של בוצע
                </Text>
              </View>
            ) : (
              uniqueDoneeNames.map((donee, index) => (
                <DataComponent
                  key={index}
                  name={donee.name}
                  motherName={donee.motherName}
                  email={donee.email}
                  action={() => {
                    navigation.navigate('RegPatient', {
                      doneeName: donee.name,
                      doneeMotherName: donee.motherName,
                      doneeEmail: donee.email,
                    });
                  }}
                />
              ))
            )}
          </ScrollView>
        </View>
      </Box>
    </>
  );
};
export default UserProfileScreen;
