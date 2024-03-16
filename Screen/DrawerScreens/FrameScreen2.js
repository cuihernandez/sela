/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  Box,
  Button,
  Flex,
  HStack,
  View,
  Text,
  ScrollView
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const FrameScreen1 = () => {
  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  const [texts, setTexts] = useState([]);
  const userID = useSelector(state => state.user.userID);
  let docID = '';
  let cout = 0;
  const handleNavigateToFrameScreen = async () => {
    try {
      console.log("userId", userID);
      const snapshot = await firestore()
        .collection('userData')
        .where('userID', '==', userID)
        .get();
      snapshot.forEach((doc) => { doc.data().completeCount });
      if (snapshot.empty) {
        await firestore()
          .collection('userData')
          .add({
            userID: userID,
            completeCount: 1,
          });
      }
      else {
        const snapshots = await firestore()
          .collection('userData')
          .where('userID', '==', userID)
          .get();
        //retrieve the value of documentID that the userID is userID
        const snapshotData = snapshots.docs;
        const completeCount = snapshotData.map(snap => snap._data.completeCount);
        snapshots.forEach((doc) => {
          docID = doc.id;
          console.log('doc.id is:', doc.id);
        });
        console.log('document id is :', docID);

        //increase the value of the complete count
        cout = completeCount[0] + 1;
        // update the value of the complete count
        await firestore()
          .collection('userData')
          .doc(docID)
          .update({
            completeCount: cout,
          })
          .then(() => {
            console.log('User updated!', docID);
          });
      }
      navigation.navigate('Frame3');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const getText = async () => {
      try {
        const snapshot = await firestore()
          .collection('psalms')
          .get();
        const res = snapshot.docs;
        setTexts(res);
        res.map((item) => {
          console.log('stlion:', item._data.text)
        })
      }
      catch (error) {
        console.error('This is error:', error)
      }
    }
    getText();
  }
    , [])
  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        alignItems="center"
        p={4}
        direction="row"
        justifyContent="space-between"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}>
        <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
          <ArrowBackIcon color="white" size={4} />
        </TouchableOpacity>
        <Text
          color="white"
          alignItems={'center'}
          fontSize="20"
          width="2/3"
          px="3"
          marginTop={'5'}>
          מומלץ לקרוא בדיבור:
        </Text>
        <Box />
        <Box />
        <Box />
      </HStack>
      <Box flex={1} alignItems="center">
        <Text color="black" fontSize={20} marginTop={3}>
          פרק ב
        </Text>
        <ScrollView width={'80%'}>
          {texts.map((item) => (
            <View
              borderRadius="15"
              backgroundColor="#F1E6FF"
              margin="10"
              marginBottom="2"
              marginTop="2"
              padding="5">
              <Text color="#8F80A7">
                {item._data.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Box>
      <HStack alignItems={'center'} marginBottom="20" justifyContent="flex-end">
        <Button
          space={2}
          backgroundColor="#560FC9"
          borderRadius={15}
          marginRight="10"
          padding="2"
          onPress={handleNavigateToFrameScreen}>
          <Flex direction="row" alignItems="center" justifyContent="center">
            <Text color="white" fontSize="16">
              {'  '}
              השלמתי תפילתי
            </Text>
            <ArrowForwardIcon size="4" color="white" />
          </Flex>
        </Button>
      </HStack>
    </>
  );
};
export default FrameScreen1;
