/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  View,
  Text,
} from 'native-base';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';

const FrameScreen1 = () => {
  const navigation = useNavigation();
  const handleNavigateToFrameScreen = () => {
    navigation.navigate('Frame1'); // Navigate to the 'FrameScreen' page
  };
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
        <ArrowBackIcon color="white" size={4} />
        <Text
          color="white"
          alignItems={'center'}
          fontSize={'lg'}
          px="3"
          marginTop={'5'}>
          תודה
        </Text>
        <Box />
      </HStack>
      <Box flex={1} alignItems="center">
        <Image
          source={require('../../Image/cong.png')}
          width="120"
          height="150"
          marginTop={3}
          marginBottom={7}
        />
        <View
          borderRadius="15"
          backgroundColor="#F1E6FF"
          margin="10"
          padding="5">
          <Text color="#8F80A7">
            כל החושד בכשרים ננגע בגופו - הימנעו מחשדות כלפי אנשים ושפטו כל אדם
            לכף זכות
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
