/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Center,
  HStack,
  Image,
  Link,
  View,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Header from './Components/Header.js';
import avatar_facebook from '../Image/logos_facebook.png';
import avatar_twitter from '../Image/logos_twitter.png';
import avatar_whatsapp from '../Image/logos_whatsapp.png';
import avatar_instagram from '../Image/logos_instagram.png';
import avatar_gmail from '../Image/logos_gmail.png';
import dot from '../Image/dot.png';
import icon_copy from '../Image/icon_copy.png';

const RecommendScreen = () => {
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };

  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        alignItems="flex-start"
        p={4}
        direction="row"
        justifyContent="space-between"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}
        height={(screenHeight * 12) / 100}>
        <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
          <ArrowBackIcon color="white" size={4} marginLeft="1" />
        </TouchableOpacity>

        <Center>
          <Text
            color="white"
            alignItems={'center'}
            fontSize={'lg'}
            px="3"
            marginTop={'5'}>
            המלץ לחברים
          </Text>
        </Center>
        <Box />
      </HStack>
      <Box flex={1} alignItems="center">
        <View margin="10" padding="5">
          <Link
            href="#"
            alignItems="center"
            justifyContent="space-around"
            backgroundColor="#F1E6FF">
            <Text color="#1E0050" marginRight="4" marginLeft="4">
              www.hebrewsparys.co
            </Text>
            <Image source={icon_copy} alt="copy" />
          </Link>
        </View>
        <HStack justifyContent="center" space={2}>
          <Link href="https://mail.google.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_gmail} alt="avatar_gmail" />
            </Avatar>
          </Link>
          <Link href="https://www.facebook.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_facebook} alt="avatar_facebook" />
            </Avatar>
          </Link>
          <Link href="https://twitter.com">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_twitter} alt="avatar_twitter" />
            </Avatar>
          </Link>
          <Link href="https://www.whatsapp.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_whatsapp} alt="avatar_whatsapp" />
            </Avatar>
          </Link>
          <Link href="https://instagram.google.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_instagram} alt="avatar_instagram" />
            </Avatar>
          </Link>
        </HStack>
      </Box>
    </>
  );
};
export default RecommendScreen;
