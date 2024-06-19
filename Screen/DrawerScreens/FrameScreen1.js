/* eslint-disable prettier/prettier */
import {React, useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  View,
  Text,
  ArrowBackIcon,
} from 'native-base';
import Header from '../Components/Header';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {setPatients} from '../../redux/actions/patientsAction';

const FrameScreen1 = () => {
  const navigation = useNavigation();
  const [nameArray, setNameArray] = useState([]);
  const [motherNameArray, setMotherNameArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const userID = useSelector(state => state.user.userID);
  const {patients, patientsCount} = useSelector(state => state.patients);

  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userID) navigation.navigate('Login');
  }, [route.name]);

  const handleNextName = () => {
    // const nextIndex = currentIndex <= patientsCount - 1 ? currentIndex + 1 : 0;
    navigation.navigate('Frame2', {currentIndex});
  };

  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');

  useFocusEffect(
    useCallback(() => {
      const getText = async () => {
        try {
          const snapshot = await firestore().collection('notice').get();
          const userDataCollectionRef = firestore().collection('userData');
          const transactionSnapshot = await firestore()
            .collection('transaction')
            .get();
          const res = snapshot.docs;

          let array_name = [];
          let array_mothername = [];
          const userDataQuerySnapshot = await userDataCollectionRef.get();

          const patientsArray = await Promise.all(
            transactionSnapshot.docs
              .map(doc => {
                const patientWithCredit = getPatientWithCredit(
                  doc,
                  userDataQuerySnapshot,
                );

                return patientWithCredit;
              })
              .filter(patient => {
                return parseFloat(patient.credit.toFixed(2)) >= 0.2;
              }),
          );

          // console.log('PATIENTS_ARRAY: ', patientsArray);

          const flatPatientsArray = mergeDuplicates(patientsArray);

          setNameArray(array_name);
          setMotherNameArray(array_mothername);
          setFirstText(res[0].data().text);
          setSecondText(res[1].data().text);
          dispatch(
            setPatients({
              patients: flatPatientsArray,
              patientsCount: flatPatientsArray.length,
            }),
          );
        } catch (error) {
          console.error('This is error:', error);
        }
      };

      const getLastViewedIndex = async () => {
        try {
          const doc = await firestore()
            .collection('LastViewedUserIndex')
            .doc('currentIndex')
            .get();
          if (doc.exists) {
            setCurrentIndex(doc.data().index);
          }
        } catch (error) {
          console.error('Failed to fetch last viewed index:', error);
        }
      };

      (async () => {
        try {
          setLoading(true);
          await getLastViewedIndex();
          await getText();
          // if (!patients.length) {
          // }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }, []),
  );

  return (
    <>
      <Header />
      <View
        px="3"
        py="3"
        w="100%"
        alignItems="center"
        p={4}
        direction="row"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}>
        <Text
          color="white"
          alignItems="center"
          justifyContent="center"
          fontSize="24"
          px="3"
          marginTop={'5'}>
          מומלץ לקרוא בדיבור:
        </Text>
      </View>
      <Box flex={1} alignItems="center">
        <View
          borderRadius="15"
          backgroundColor="#F1E6FF"
          margin="10"
          padding="5">
          {loading ? (
            <ActivityIndicator color={'#560FC9'} />
          ) : patients?.length ? (
            <Text color="#8F80A7">
              {firstText} {patients[currentIndex]?.doneeName} בן/ת{' '}
              {patients[currentIndex]?.doneeMotherName} {secondText}
            </Text>
          ) : (
            <Text>אין מטופלים זמינים</Text>
          )}
        </View>
      </Box>
      {patients?.length ? (
        <HStack
          alignItems={'center'}
          marginBottom="20"
          justifyContent="flex-end">
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
      ) : (
        <></>
      )}
    </>
  );
};

// export default FrameScreen1;
export default connect(null, {setPatients})(FrameScreen1);

const mergeDuplicates = data => {
  const mergedData = {};

  data.forEach(item => {
    const key = `${item.doneeEmail}-${item.doneeMotherName}-${item.doneeName}`;

    if (!mergedData[key]) {
      mergedData[key] = {
        // doneeEmail: item.doneeEmail,
        doneeMotherName: item.doneeMotherName,
        doneeName: item.doneeName,
        doneeId: item.doneeId,
        // donorIDs: [item.donorID],
        // transactionAmount: item.transactionAmount,
      };
    } else {
      mergedData[key].donorIDs?.push(item.donorID);
      mergedData[key].transactionAmount += item.transactionAmount;
    }
  });

  return Object.values(mergedData);
};

/**
 * Retrieves or creates a patient transaction group with calculated credit.
 *
 * @param {Object} doc - The document containing transaction data.
 * @param {Object} querySnapshot - The snapshot of queried documents.
 * @returns {Object} The patient transaction group with updated credit.
 */
const getPatientWithCredit = (doc, querySnapshot) => {
  let groupedTransactions = [];
  const transaction = doc.data();
  const key = `${transaction.doneeName}_${transaction.doneeEmail}_${transaction.donorID}`;

  /**
   * Counts the number of times the patient has been prayed for in the given snapshot.
   *
   * @param {Object} snapshot - The snapshot of queried documents.
   * @param {string} docId - The ID of the document representing the patient.
   * @returns {number} The total count of prayers for the patient.
   */
  const countPrayersForPatient = (snapshot, docId) => {
    let totalCount = 0;

    snapshot.forEach(document => {
      const userDocData = document.data();
      if (Array.isArray(userDocData.patientsPrayedFor)) {
        const itemCount = userDocData.patientsPrayedFor.filter(
          id => id === docId,
        ).length;
        totalCount += itemCount;
      }
    });

    return totalCount;
  };

  const totalPrayers = countPrayersForPatient(querySnapshot, doc.id);

  // Find the existing group in the array or create a new one
  let group = groupedTransactions.find(
    g => g.docId === doc.id && g.key === key,
  );

  if (!group) {
    group = {
      docId: doc.id,
      id: groupedTransactions.length,
      doneeName: transaction.doneeName,
      doneeMotherName: transaction.doneeMotherName,
      email: transaction.doneeEmail,
      donorID: transaction.donorID,
      doneeId: doc.id,
      totalDonation: transaction.totalDonation,
      credit: transaction.credit,
      totalPrayers: totalPrayers,
      key: key,
    };

    groupedTransactions.push(group);
  }

  // // Update the group's total donation and credit
  // group.totalDonation += transaction.transactionAmount;
  // group.credit = group.totalDonation - group.totalPrayers * 0.2;

  return group;
};
