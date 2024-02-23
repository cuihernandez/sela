/* eslint-disable prettier/prettier */
import React from 'react';
import {ArrowBackIcon, Box, HStack, Image, Text, View} from 'native-base';
import Header from './Components/Header.js';
const TestimonialsScreens = () => {
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
        <View
          borderRadius="30"
          backgroundColor="#F1E6FF"
          marginLeft={10}
          marginRight={10}
          marginTop={10}>
          <Image
            marginLeft={2}
            source={require('../Image/bi_quote.png')}
            resizeMode="cover"
          />
          <View
            borderRadius="30"
            backgroundColor="#F1E6FF"
            marginLeft="2"
            marginRight="2"
            marginBottom="2"
            paddingLeft="2"
            paddingRight="2"
            paddingBottom="3">
            <Text color="#560FC9" fontSize="16" marginBottom={1}>
              פרטים
            </Text>
            <Text color="#8F80A7">
              י שמח לעזור ע"י תפילה ומרגיש ממש טוב לדעת שבכל יום ניתנת צדקה בשמי
              לנזקקים - תודה לחברת סלה
            </Text>
            <Text color="#560FC9" fontSize="16" marginRight="3">
              פלוני אלמוני
            </Text>
          </View>
        </View>
        <View
          borderRadius="30"
          backgroundColor="#F1E6FF"
          marginLeft={10}
          marginRight={10}
          marginTop={10}>
          <Image
            marginLeft={2}
            source={require('../Image/bi_quote.png')}
            resizeMode="cover"
          />
          <View
            borderRadius="30"
            backgroundColor="#F1E6FF"
            marginLeft="2"
            marginRight="2"
            marginBottom="2"
            paddingLeft="2"
            paddingRight="2"
            paddingBottom="3">
            <Text color="#560FC9" fontSize="16" marginBottom={1}>
              פרטים
            </Text>
            <Text color="#8F80A7">
              י שמח לעזור ע"י תפילה ומרגיש ממש טוב לדעת שבכל יום ניתנת צדקה בשמי
              לנזקקים - תודה לחברת סלה
            </Text>
            <Text color="#560FC9" fontSize="16" marginRight="3" >
              פלוני אלמוני
            </Text>
          </View>
        </View>
      </Box>
    </>
  );
};
export default TestimonialsScreens;
