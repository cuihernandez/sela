/* eslint-disable prettier/prettier */
import React from 'react';
import { ArrowBackIcon, Box, HStack, Image, View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Header from './Components/Header.js';
import { useNavigation } from '@react-navigation/native';


const AboutScreen = () => {
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
          fontSize={'lg'}
          px="3"
          marginTop={'5'}>
          נילעו
        </Text>
        <Box />
      </HStack>
      <Box flex={1} alignItems="center">
        <View width="50" height="70">
          <Image
            source={require('../Image/logo.png')}
            marginTop={3}
            marginBottom={7}
            alt="log"
          />
        </View>

        <View margin="10" padding="5">
          <Text color="#8F80A7">
            כל החושד בכשרים ננגע בגופו - הימנעו מחשדות כלפי אנשים ושפטו כל אדם
            לכף זכות כל החושד בכשרים ננגע בגופו - הימנעו מחשדות כלפי אנשים ושפטו
            כל אדם לכף זכות כל החושד בכשרים ננגע בגופו - הימנעו מחשדות כלפי
            אנשים ושפטו כל אדם לכף זכות כל החושד בכשרים ננגע בגופו - הימנעו
            מחשדות כלפי אנשים ושפטו כל אדם לכף זכות כל החושד בכשרים ננגע בגופו -
            הימנעו מחשדות כלפי אנשים ושפטו כל אדם לכף זכות כל החושד בכשרים ננגע
            בגופו - הימנעו מחשדות כלפי אנשים ושפטו כל אדם לכף זכות כל החושד
            בכשרים ננגע בגופו - הימנעו מחשדות כלפי אנשים ושפטו כל אדם לכף זכות
            כל החושד בכשרים ננגע בגופו - הימנעו מחשדות כלפי אנשים ושפטו כל אדם
            לכף זכות כל החושד בכשרים ננגע בגופו - הימנעו מחשדות כלפי אנשים ושפטו
            כל אדם לכף זכות
          </Text>
        </View>
      </Box>
    </>
  );
};
export default AboutScreen;
