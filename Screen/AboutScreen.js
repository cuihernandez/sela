/* eslint-disable prettier/prettier */
import React from 'react';
import {ArrowBackIcon, Box, HStack, Image, View, Text} from 'native-base';
import Header from './Components/Header.js';

const AboutScreen = () => {
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
        <View width="50" height="70">
          <Image
            source={require('../Image/logo.png')}
            marginTop={3}
            marginBottom={7}
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
      <View alignItems="center" justifyContent="center" marginBottom="4">
        <Text>תנאי שירות</Text>
        <Text margin="3">רישיונות קוד פתוח</Text>
      </View>
    </>
  );
};
export default AboutScreen;
