/* eslint-disable prettier/prettier */
import {React, useEffect, useState} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
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
  const {patients} = useSelector(state => state.patients);

  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userID) navigation.navigate('Login');
  }, [route.name]);

  const handleNextName = () => {
    const nextIndex =
      currentIndex + 1 >= patients.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    navigation.navigate('Frame2', {currentIndex});
  };

  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');

  useEffect(() => {
    const getText = async () => {
      try {
        const snapshot = await firestore().collection('notice').get();
        const snapshot1 = await firestore().collection('transaction').get();
        console.log('>>>>>>>COUNT: ', snapshot1.size);
        const res = snapshot.docs;
        const res1 = snapshot1.docs;
        let array_name = [];
        let array_mothername = [];
        let patientsArray = [];
        res1.map(doc => {
          array_name?.push(doc.data().doneeName);
          array_mothername?.push(doc.data().doneeMotherName);
        });

        res1.map(doc => {
          patientsArray?.push({
            doneeName: doc.data().doneeName,
            doneeMotherName: doc.data().doneeMotherName,
          });
        });

        const flatPatientsArray = mergeDuplicates(patientsArray);

        // console.log('RESPONSE: ', res1);
        setNameArray(array_name);
        setMotherNameArray(array_mothername);
        setFirstText(res[0].data().text);
        setSecondText(res[1].data().text);
        console.log('SECOND_TEXT: ', res[1].data());
        dispatch(
          setPatients({
            patients: flatPatientsArray,
            patientsCount: patientsArray.length,
          }),
        );
        patientsCount: flatPatientsArray.length,
          console.log('[[[[[[COUNT]]]]]]: ', flatPatientsArray.length);
      } catch (error) {
        console.error('This is error:', error);
      }
    };

    const getLastViewedIndex = async () => {
      console.log('GET_LAST_INDEX');
      try {
        const doc = await firestore()
          .collection('LastViewedUserIndex')
          .doc('currentIndex')
          .get();
        console.log('LAST_VIEWED_RUNNING: ');
        if (doc.exists) {
          setCurrentIndex(doc.data().index + 1);
          console.log('LAST_VIEWED_INDEX: ', doc.data().index);
        }
      } catch (error) {
        console.error('Failed to fetch last viewed index:', error);
      }
    };

    (async () => {
      console.log('[[[[[[COUNT]]]]]]: ', patients.length);
      try {
        setLoading(true);
        await getLastViewedIndex();

        if (!patients.length) {
          console.log('LENGTH===>', patients.length);
          await getText();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('--------CURRENT_INDEX------>', currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    console.log('>>>>>>>>>>>PATIENTS: ', patients);
  }, [patients]);

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
          ) : (
            <Text color="#8F80A7">
              {firstText} {patients[currentIndex]?.doneeName} בן{' '}
              {patients[currentIndex]?.doneeMotherName} {secondText}
            </Text>
          )}
        </View>
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
            <ArrowBackIcon size="4" color="white" />
          </Flex>
        </Button>
      </HStack>
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
