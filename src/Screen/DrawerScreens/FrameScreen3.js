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
import {
  ActivityIndicator,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import Header from '../Components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';

import BackButton from '../Components/BackButton';
import {firestore} from '#/Utils/firebaseConfig';

const FrameScreen3 = () => {
  const dispatch = useDispatch();
  const [texts, setTexts] = useState([]);
  const array = useSelector(state => state.pearls);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {patients, patientsCount} = useSelector(state => state.patients);

  const route = useRoute();
  const currentIndex = route.params?.currentIndex;

  const handleNavigateToFrameScreen = () => {
    updateLastViewedIndex(
      currentIndex < patientsCount - 1 ? currentIndex + 1 : 0,
    );
    navigation.navigate('Frame1'); // Navigate to the 'FrameScreen' page
  };

  const handleNextName = () => {
    let nextIndex = array.currentIndex;
    nextIndex =
      array.currentIndex + 1 >= texts.length ? 0 : array.currentIndex + 1;
    dispatch(setPearls({pearlsData: texts, currentIndex: nextIndex}));
    handleNavigateToFrameScreen();
  };

  const updateLastViewedIndex = async index => {
    try {
      await setDoc(doc(firestore, 'LastViewedUserIndex', 'currentIndex'), {
        index,
      });
    } catch (error) {
      console.error('Failed to update last viewed index:', error);
    }
  };

  useEffect(() => {
    const getText = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(firestore, 'pearls'));
        const res = snapshot.docs;
        console.log('PEARLS: ', res[array.currentIndex].data().text);
        setTexts(res);
      } catch (error) {
        console.error('This is error:', error);
      } finally {
        setLoading(false);
      }
    };

    getText();
  }, [array.currentIndex]);

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
        <BackButton />
        <Box width={'100%'}>
          <Text
            color="white"
            textAlign={'center'}
            fontSize="24"
            px="3"
            marginTop={'5'}>
            תודה - תינתן תרומה בשמך
          </Text>
        </Box>
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
              {loading ? (
                <ActivityIndicator color={'#560FC9'} />
              ) : (
                <Text color="#8F80A7" fontSize={24}>
                  {texts.length > 0 && array.currentIndex >= 0
                    ? texts[array.currentIndex].data().text
                    : ''}
                </Text>
              )}
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
              המשך
            </Text>
            <ArrowBackIcon size="4" color="white" />
          </Flex>
        </Button>
      </HStack>
    </>
  );
};

export default FrameScreen3;
