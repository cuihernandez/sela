import React, {useState, useEffect} from 'react';
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  Box,
  Button,
  Flex,
  HStack,
  View,
  Text,
  ScrollView,
} from 'native-base';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {setPsalms} from '../../redux/actions/psalmsAction.js';
import firestore from '@react-native-firebase/firestore';
import Header from '../Components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import BackButton from '../Components/BackButton.js';

const FrameScreen2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {psalms} = useSelector(state => state.psalms);
  const userID = useSelector(state => state.user.userID);
  const [_, setCurrentIndex] = useState(0);
  const [lastPsalmIndex, setCurrentPsalmIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const currentIndex = route.params.currentIndex;

  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1', {currentIndex});
  };

  const handleNavigateToFrameScreen = async () => {
    try {
      navigation.navigate('Frame3', {currentIndex});
      console.log('updateLastPsalmIndex:', lastPsalmIndex);
      updateLastPsalmIndex(lastPsalmIndex + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateLastPsalmIndex = async index => {
    try {
      await firestore()
        .collection('LastViewedUserIndex')
        .doc('lastPsalmIndex')
        .set({
          index,
        });
    } catch (error) {
      console.error('Failed to update last psalm index:', error);
    }
  };

  const getLastPsalmIndex = async () => {
    console.log('GET_LAST_INDEX');
    try {
      const doc = await firestore()
        .collection('LastViewedUserIndex')
        .doc('lastPsalmIndex')
        .get();
      if (doc.exists) {
        console.log('LAST_VIEWED_PSALM_RUNNING: ', doc.data().index);
        setCurrentPsalmIndex(doc.data().index);
        console.log('LAST_VIEWED_INDEX: ', doc.data().index);
      }
    } catch (error) {
      console.error('Failed to fetch last viewed index:', error);
    }
  };

  const getPsalms = async () => {
    try {
      if (psalms && psalms.length > 0) {
        console.log('PSALMS_EXIST', psalms);
        return;
      }
      console.log("PSALMS_DON'T_EXIST");

      const snapshot = await firestore().collection('psalms').get();
      let array = [];
      const res = snapshot.docs;
      res.map(doc => {
        array.push(doc._data.text);
      });
      dispatch(setPsalms({psalms: array, psalmsCount: array.length}));
    } catch (error) {
      console.error('This is error:', error);
    } finally {
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getLastPsalmIndex();
        await getPsalms();
      } catch (error) {
        console.error('ERror Fetching Stuff: ', error);
      } finally {
        setLoading(false);
      }
    })();
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
        <BackButton />
        <Box width={'100%'}>
          <Text
            color="white"
            textAlign={'center'}
            fontSize="24"
            px="3"
            marginTop={'5'}>
            מומלץ לקרוא בדיבור:
          </Text>
        </Box>
      </HStack>
      <Box flex={1} alignItems="center">
        {/* <Text color="black" fontSize={20} marginTop={3}>
          פרק ב
        </Text> */}
        <ScrollView width={'100%'}>
          <View marginTop="2" marginBottom={20} padding="5">
            {loading ? (
              <ActivityIndicator color={'#560FC9'} />
            ) : (
              <Text color="#8F80A7" fontSize={18}>
                {lastPsalmIndex !== null &&
                  lastPsalmIndex !== undefined &&
                  psalms[lastPsalmIndex]}
              </Text>
            )}
          </View>
        </ScrollView>
      </Box>
      <HStack
        alignItems={'center'}
        bottom={'20'}
        right={'5'}
        justifyContent="flex-end"
        position={'absolute'}>
        <Button
          space={2}
          backgroundColor="#560FC9"
          borderRadius={15}
          padding="2"
          onPress={handleNavigateToFrameScreen}>
          <Flex direction="row" alignItems="center" justifyContent="center">
            <Text color="white" fontSize="16">
              השלמתי תפילתי
            </Text>
            <ArrowBackIcon size="4" color="white" />
          </Flex>
        </Button>
      </HStack>
    </>
  );
};
export default FrameScreen2;
