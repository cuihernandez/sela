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

import Header from '../Components/Header';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import BackButton from '../Components/BackButton.js';
import {firestore} from '#/Utils/firebaseConfig.js';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

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
      const userSnapshot = await getDocs(
        query(collection(firestore, 'userData'), where('userID', '==', userID)),
      );
      userSnapshot.forEach(doc => {
        doc.data().completeCount;
      });

      const transactionRef = collection(firestore, 'transaction');
      const transactionDocRef = doc(
        transactionRef,
        patients[currentIndex]?.doneeId,
      );
      const transactionDocument = await getDoc(transactionDocRef);

      await updateDoc(transactionDocRef, {
        credit: parseFloat(transactionDocument?.data().credit) - 0.2,
        updatedAt: serverTimestamp(),
      });

      if (userSnapshot.empty) {
        await addDoc(collection(firestore, 'userData'), {
          userID: userID,
          completeCount: 1,
          patientsPrayedFor: [patients[currentIndex]?.doneeId],
        });
      } else {
        const snapshots = await getDocs(
          query(
            collection(firestore, 'userData'),
            where('userID', '==', userID),
          ),
        );
        const snapshotData = snapshots.docs;
        const completeCount = snapshotData.map(
          snap => snap.data().completeCount,
        );
        let docID;
        snapshots.forEach(doc => {
          docID = doc.id;
        });

        const userData = snapshots.docs[0].data();
        const count = completeCount[0] + 1;

        await updateDoc(doc(firestore, 'userData', docID), {
          completeCount: count,
          patientsPrayedFor: [
            ...userData.patientsPrayedFor,
            patients[currentIndex]?.doneeId,
          ],
        }).then(() => {
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
      await setDoc(doc(firestore, 'LastViewedUserIndex', 'lastPsalmIndex'), {
        index: index < psalmsCount ? index : 0,
      });
    } catch (error) {
      console.error('Failed to update last psalm index:', error);
    }
  };

  const getLastPsalmIndex = async () => {
    try {
      const docSnap = await getDoc(
        doc(firestore, 'LastViewedUserIndex', 'lastPsalmIndex'),
      );
      if (docSnap.exists()) {
        setCurrentPsalmIndex(docSnap.data().index);
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

      const snapshot = await getDocs(collection(firestore, 'psalms'));
      let array = [];
      const res = snapshot.docs;
      res.map(doc => {
        const psalm = doc.data().text;
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
          console.error('Error Fetching Stuff: ', error);
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
