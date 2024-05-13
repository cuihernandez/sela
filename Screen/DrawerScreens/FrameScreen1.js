/* eslint-disable prettier/prettier */
import { React, useEffect, useState } from 'react';
import {
  ArrowForwardIcon,
  Box,
  Button,
  Flex,
  HStack,
  View,
  Text,
} from 'native-base';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const FrameScreen1 = () => {
  const navigation = useNavigation();
  const [nameArray, setNameArray] = useState([]);
  const [motherNameArray, setMotherNameArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextName = () => {
    const nextIndex = currentIndex + 1 >= nameArray.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    navigation.navigate('Frame2');
  };
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');

  useEffect(() => {
    const getText = async () => {
      try {
        const snapshot = await firestore()
          .collection('notice')
          .get();

        const snapshot1 = await firestore()
          .collection('transaction')
          .get();
        const res = snapshot.docs;
        const res1 = snapshot1.docs;
        let array_name = [];
        let array_mothername = [];
        res1.map((doc) => {
          array_name.push(doc.data().doneeName);
          array_mothername.push(doc.data().doneeMotherName)
        })
        setNameArray(array_name);
        setMotherNameArray(array_mothername);
        setFirstText(res[0].data().text);
        setSecondText(res[1].data().text);
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
      <View
        px="3"
        py="3"
        w="100%"
        alignItems="center"
        p={4}
        direction="row"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}>
        <Text
          color="white"
          alignItems="center"
          justifyContent="center"
          fontSize="20"
          px="3"
          marginTop={'5'}>
          מומלץ לקרוא בדיבור:
        </Text>
      </View>
      <Box flex={1} alignItems="center">
        <View
          borderRadius="15"
          backgroundColor="#F1E6FF"
          margin="10"
          padding="5">
          <Text color="#8F80A7">
            {firstText} {nameArray[currentIndex]} בן {motherNameArray[currentIndex]} {secondText}
          </Text>
        </View>
      </Box>
      <HStack alignItems={'center'} marginBottom="20" justifyContent="flex-end">
        <Button
          space={2}
          backgroundColor="#560FC9"
          borderRadius={15}
          marginRight="10"
          padding="2"
          onPress={handleNextName}>
          <Flex direction="row" alignItems="center" justifyContent="center">
            <Text color="white" fontSize="16">
              {'  '}
              המשך
            </Text>
            <ArrowForwardIcon size="4" color="white" />
          </Flex>
        </Button>
      </HStack>
    </>
  );
};
export default FrameScreen1;
