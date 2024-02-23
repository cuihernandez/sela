/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  Box,
  Button,
  Flex,
  HStack,
  View,
  Text,
} from 'native-base';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
const FrameScreen1 = () => {
  const navigation = useNavigation();
  const handleNavigateToFrameScreen = () => {
    navigation.navigate('Frame3'); // Navigate to the 'FrameScreen' page
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
          width="1/2"
          px="3"
          marginTop={'5'}>
          מומלץ לקרוא בדיבור:
        </Text>
        <Box />
      </HStack>
      <Box flex={1} alignItems="center">
        <Text color="black" fontSize={20} marginTop={3}>
          פרק ב
        </Text>
        <View
          borderRadius="15"
          backgroundColor="#F1E6FF"
          margin="10"
          marginTop="5"
          padding="5">
          <Text color="#8F80A7">
            לַמְנַצֵּ֥חַ (לידיתון) לִֽידוּת֗וּן מִזְמ֥וֹר לְדָוִֽד: ב
            אָמַ֗רְתִּי אֶֽשְׁמְרָ֣ה דְרָכַי֮ מֵחֲט֪וֹא בִלְשׁ֫וֹנִ֥י
            אֶשְׁמְרָ֥ה לְפִ֥י מַחְס֑וֹם בְּעֹ֖ד רָשָׁ֣ע לְנֶגְדִּֽי: ג
            נֶאֱלַ֣מְתִּי ד֭וּמִיָּה הֶחֱשֵׁ֣יתִי מִטּ֑וֹב וּכְאֵבִ֥י נֶעְכָּֽר:
            ד חַם-לִבִּ֨י | בְּקִרְבִּ֗י בַּהֲגִיגִ֥י תִבְעַר-אֵ֑שׁ
            דִּ֝בַּ֗רְתִּי בִּלְשֽׁוֹנִי
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
