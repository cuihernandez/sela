/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ArrowBackIcon,
  Box,
  Center,
  Button,
  HStack,
  Image,
  View,
  Text,
  ScrollView
} from 'native-base';
import { Dimensions } from 'react-native';
import Header from './Components/Header.js';
import DataComponent from './Components/DataComponent.js';

const UserProfileScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const name = 'לִתְרוֹם';
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
        <View width="70" height="70">
          <Image
            source={require('../Image/edit.png')}
            marginBottom={7}
            height={(screenHeight * 8) / 100}
          />
        </View>
        <Box />
      </HStack>
      <Box
        flex={1}
      //   alignItems="center"
      >
        <View padding="5">
          <Center marginBottom="4">
            <Text color="#560FC9" fontSize="lg" fontWeight="bold">
              תרומות
            </Text>
          </Center>
          <View flexDirection="row" justifyContent="space-between">
            <Text color="#560FC9" fontWeight="blod" fontSize="lg">
              1000
            </Text>
            <Text color="#560FC9" fontWeight="bold" fontSize="lg">
              $5000
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
          <Text> יש להעביר כסף ולהעלות צילום מסך</Text>
        </Center>
        <HStack
          flexDirection="row"
          justifyContent="center">
          <Button
            backgroundColor="#560FC9"
            borderRadius="2xl"
            margin="2"
            width={(screenWidth * 40) / 100}>
            הוסף קרדיט לחולה
          </Button>
          <Button
            backgroundColor="#560FC9"
            borderRadius="2xl"
            margin="2"
            width={(screenWidth * 50) / 100}>
            <HStack>
              <Text color="white">{'  '}שמור צילום מסך</Text>
              <Image
                source={{
                  uri: 'https://img.icons8.com/pastel-glyph/64/FFFFFF/download--v1.png',
                }}
                alt="download"
              />
            </HStack>
          </Button>
        </HStack>
        <View backgroundColor="#F1E6FF" margin="3" borderRadius="20" height={(screenHeight * 47) / 100}>
          <Text marginTop="3" marginRight="6" color="#8F80A7">חולה רשום</Text>
          <ScrollView h="80" margin="3">
            <DataComponent name={name} />
            <DataComponent name={name} />
            <DataComponent name={name} />
            <DataComponent name={name} />
            <DataComponent name={name} />
            <DataComponent name={name} />
            <DataComponent name={name} />
            <DataComponent name={name} />
          </ScrollView>

        </View>
      </Box >
      <View alignItems="center" justifyContent="center" marginBottom="4">
        <Button
          backgroundColor="#560FC9"
          borderRadius="2xl"
          margin="2"
          width={(screenWidth * 90) / 100}
        >עדכן</Button>
      </View>
    </>
  );
};
export default UserProfileScreen;
