/* eslint-disable prettier/prettier */
import {React, useState, useEffect} from 'react';
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
  ScrollView,
  Center,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {setPearls} from '../../redux/actions/pearlsActions';
import {TouchableOpacity} from 'react-native';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const FrameScreen1 = () => {
  const dispatch = useDispatch();
  const [texts, setTexts] = useState([]);
  const array = useSelector(state => state.pearls);
  const navigation = useNavigation();
  const handleNavigateToFrameScreen = () => {
    navigation.navigate('Frame1'); // Navigate to the 'FrameScreen' page
  };

  const handleNextName = () => {
    console.log('texts value is :--', texts[1]?._data);
    let nextIndex = array.currentIndex;
    nextIndex =
      array.currentIndex + 1 >= texts.length ? 0 : array.currentIndex + 1;
    dispatch(setPearls({pearlsData: texts, currentIndex: nextIndex}));
    handleNavigateToFrameScreen();
  };

  useEffect(() => {
    const getText = async () => {
      try {
        const snapshot = await firestore().collection('pearls').get();
        const res = snapshot.docs;
        console.log('TEXTS: ', res);
        setTexts(res);
      } catch (error) {
        console.error('This is error:', error);
      }
    };
    getText();
  }, []);
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
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowBackIcon color="white" size={4} />
        </TouchableOpacity>
        <Text
          color="white"
          alignItems={'center'}
          fontSize="20"
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
          alt="configration"
        />
        <ScrollView width={'80%'}>
          <Center>
            <View
              borderRadius="15"
              backgroundColor="#F1E6FF"
              margin="2"
              padding="5"
              width="4/5">
              <Text color="#8F80A7">
                {texts.length > 0 &&
                  array.currentIndex >= 0 &&
                  texts[array.currentIndex]?._data.text}
              </Text>
            </View>
          </Center>
        </ScrollView>
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
