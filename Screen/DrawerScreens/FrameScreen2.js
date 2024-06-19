import React, {useState, useEffect, useCallback} from 'react';
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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import BackButton from '../Components/BackButton.js';

const FrameScreen2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {psalms, psalmsCount} = useSelector(state => state.psalms);
  const {patients, patientsCount} = useSelector(state => state.patients);
  const userID = useSelector(state => state.user.userID);
  const [_, setCurrentIndex] = useState(0);
  const [lastPsalmIndex, setCurrentPsalmIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const currentIndex = route.params.currentIndex;

  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1', {currentIndex});
  };

  let docID = '';
  let count = 0;
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

      const transactionRef = firestore().collection('transaction');

      const transactionDocument = await transactionRef
        .doc(patients[currentIndex]?.doneeId)
        .get();

      transactionRef.doc(patients[currentIndex]?.doneeId).update({
        credit: parseFloat(transactionDocument?.data().credit) - 0.2,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (snapshot.empty) {
        await firestore()
          .collection('userData')
          .add({
            userID: userID,
            completeCount: 1,
            patientsPrayedFor: [patients[currentIndex]?.doneeId],
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

        const userData = snapshots.docs[0].data();

        //increase the value of the complete count
        count = completeCount[0] + 1;
        // update the value of the complete count
        await firestore()
          .collection('userData')
          .doc(docID)
          .update({
            completeCount: count,
            patientsPrayedFor: [
              ...userData.patientsPrayedFor,
              patients[currentIndex]?.doneeId,
            ],
          })
          .then(() => {
            console.log('User updated!', docID);
          });
      }
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
          index: index < psalmsCount ? index : 0,
        });
    } catch (error) {
      console.error('Failed to update last psalm index:', error);
    }
  };

  const getLastPsalmIndex = async () => {
    try {
      const doc = await firestore()
        .collection('LastViewedUserIndex')
        .doc('lastPsalmIndex')
        .get();
      if (doc.exists) {
        setCurrentPsalmIndex(doc.data().index);
      }
    } catch (error) {
      console.error('Failed to fetch last viewed index:', error);
    }
  };

  const getPsalms = async () => {
    try {
      if (psalms && psalms.length > 0) {
        return;
      }

      const snapshot = await firestore().collection('psalms').get();
      let array = [];
      const res = snapshot.docs;
      res.map(doc => {
        const psalm = doc._data.text;

        const extractedNumber = extractNumberFromText(psalm);

        if (extractedNumber !== null) {
          array.push({
            text: psalm,
            index: extractedNumber,
          });
        } else {
          console.log(`No number found in text: ${psalm}`);
        }
      });
      dispatch(
        setPsalms({
          psalms: array
            .filter(doc => doc.index !== null)
            .sort((a, b) => a.index - b.index),
          psalmsCount: array.length,
        }),
      );
    } catch (error) {
      console.error('This is error:', error);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  );

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
        <ScrollView width={'100%'} marginBottom={100}>
          <View marginTop="2" marginBottom={20} padding="5">
            {loading ? (
              <ActivityIndicator color={'#560FC9'} />
            ) : (
              <Text color="#8F80A7" fontSize={18}>
                {lastPsalmIndex !== null &&
                  lastPsalmIndex !== undefined &&
                  psalms[lastPsalmIndex]?.text}
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

function _extractNumberFromText(text) {
  // Regular expression to find the first number in the text
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

function extractNumberFromText(text) {
  // Regular expression to find the first decimal number in the text
  const match = text.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

export default FrameScreen2;
