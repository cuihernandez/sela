/* eslint-disable prettier/prettier */
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

const FrameScreen2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [texts, setTexts] = useState([]);
  const array = useSelector(state => state.psalms);
  const userID = useSelector(state => state.user.userID);
  const [_, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const currentIndex = route.params.currentIndex;

  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1', {currentIndex});
  };

  const handleNavigateToFrameScreen = async () => {
    try {
      navigation.navigate('Frame3', {currentIndex});
      const snapshot = await firestore()
        .collection('userData')
        .where('userID', '==', userID)
        .get();
      snapshot.forEach(doc => {
        doc.data().completeCount;
      });
      if (snapshot.empty) {
        await firestore().collection('userData').add({
          userID: userID,
          completeCount: 1,
        });
      } else {
        const snapshots = await firestore()
          .collection('userData')
          .where('userID', '==', userID)
          .get();
        //retrieve the value of documentID that the userID is userID
        const snapshotData = snapshots.docs;
        const completeCount = snapshotData.map(
          snap => snap._data.completeCount,
        );
        snapshots.forEach(doc => {
          docID = doc.id;
        });

        //increase the value of the complete count
        count = completeCount[0] + 1;
        // update the value of the complete count
        await firestore()
          .collection('userData')
          .doc(docID)
          .update({
            completeCount: count,
          })
          .then(() => {
            console.log('User updated!', docID);
          });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.info('-----------ROUTE----------------->', {route: route.params});
  }, []);

  const handleNextName = () => {
    let nextIndex = array.currentIndex;
    nextIndex =
      array.currentIndex + 1 >= texts.length ? 0 : array.currentIndex + 1;
    setCurrentIndex(nextIndex);
    dispatch(setPsalms({arrayData: texts, currentIndex: nextIndex}));
    handleNavigateToFrameScreen();
  };

  let docID = '';
  let count = 0;
  useEffect(() => {
    const getText = async () => {
      try {
        setLoading(true);
        const snapshot = await firestore().collection('psalms').get();
        let array = [];
        const res = snapshot.docs;
        res.map(doc => {
          array.push(doc._data.text);
        });
        setTexts(array);
      } catch (error) {
        console.error('This is error:', error);
      } finally {
        setLoading(false);
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
        <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
          <ArrowBackIcon color="white" size={4} />
        </TouchableOpacity>
        <Text
          color="white"
          alignItems={'center'}
          fontSize="20"
          width="2/3"
          px="3"
          marginTop={'5'}>
          מומלץ לקרוא בדיבור:
        </Text>
        <Box />
        <Box />
        <Box />
      </HStack>
      <Box flex={1} alignItems="center">
        {/* <Text color="black" fontSize={20} marginTop={3}>
          פרק ב
        </Text> */}
        <ScrollView width={'80%'}>
          <View margin="10" marginBottom="2" marginTop="2" padding="5">
            {loading ? (
              <ActivityIndicator color={'#560FC9'} />
            ) : (
              <Text color="#8F80A7" fontSize={24}>
                {texts[array.currentIndex]}
              </Text>
            )}
          </View>
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
              השלמתי תפילתי
            </Text>
            <ArrowForwardIcon size="4" color="white" />
          </Flex>
        </Button>
      </HStack>
    </>
  );
};
export default FrameScreen2;
