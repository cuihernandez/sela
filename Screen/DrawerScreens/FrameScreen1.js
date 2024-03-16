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
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const FrameScreen1 = () => {
  const navigation = useNavigation();
  const handleNavigateToFrameScreen = () => {
    navigation.navigate('Frame2'); // Navigate to the 'FrameScreen' page
  };
  const user = useSelector(state => state.user);
  const name = user.name;
  const mothername = user.mothername;
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState(''); `sltion
  `
  useEffect(() => {
    const getText = async () => {
      try {
        const snapshot = await firestore()
          .collection('notice')
          .get();
        const res = snapshot.docs;
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
            {firstText}{name} בן {mothername} {secondText}
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
          onPress={handleNavigateToFrameScreen}>
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
