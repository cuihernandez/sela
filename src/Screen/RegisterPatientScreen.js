import React, {useState, useEffect} from 'react';
import {Dimensions, Image, View, StyleSheet, ScrollView} from 'react-native';
import {
  Text,
  Input,
  Button,
  Center,
  Box,
  HStack,
  useToast,
  FormControl,
  WarningOutlineIcon,
  Spinner,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setTransaction} from '../redux/actions/transactionAction';
import Header from './Components/Header';
import {createPayment} from '../Utils/YaadpayService'; // Assuming this is unchanged
import BackButton from './Components/BackButton';
import {initializeApp} from 'firebase/app';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {firestore} from '#/Utils/firebaseConfig';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RegisterPatientScreen = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [patientName, setPatientName] = useState('');
  const [patientMotherName, setPatientMotherName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const userID = useSelector(state => state.user.userID);

  useEffect(() => {
    if (!userID) navigation.navigate('Login');
  }, [userID, navigation]);

  useEffect(() => {
    if (route.params) {
      const {doneeName, doneeMotherName, doneeEmail} = route.params;
      setPatientName(doneeName || '');
      setPatientMotherName(doneeMotherName || '');
      setPatientEmail(doneeEmail || '');
    }
  }, [route.params]);

  const initializePayment = async () => {
    setLoading(true);
    try {
      const response = await createPayment({
        userId: Math.floor(Math.random() * 1000000000).toString(), // Simplified random user ID generation
        amount: price,
        clientLName: patientName,
        clientName: patientName,
        email: patientEmail,
      });
      const paymentUrl = response.paymentUrl;

      if (paymentUrl) {
        navigation.navigate('Payment', {
          paymentUrl,
          transactionUid: response.userId,
        });
      }
    } catch (error) {
      console.error('initializePayment', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let hasError = false;

      if (patientName.trim() === '') {
        setNameError(true);
        hasError = true;
      } else {
        setNameError(false);
      }

      if (patientMotherName.trim() === '') {
        setMotherNameError(true);
        hasError = true;
      } else {
        setMotherNameError(false);
      }

      if (patientEmail.trim() === '') {
        setEmailError(true);
        hasError = true;
      } else {
        setEmailError(false);
      }

      if (hasError) {
        setLoading(false);
        return;
      }

      const timestamp = new Date();

      if (price === '') {
        setLoading(false);
        return toast.show({
          render: () => (
            <Box bg="red.500" color="white" px="2" py="1" rounded="sm" mb={5}>
              <Text color="white">Please Enter the Donate Price!</Text>
            </Box>
          ),
        });
      }

      const transactionData = {
        donorID: userID,
        date: timestamp,
        doneeName: patientName,
        doneeMotherName: patientMotherName,
        doneeEmail: patientEmail,
        transactionUid: response.userId, // Assuming response.userId is available
        totalDonation: parseFloat(price),
      };

      const transactionRef = collection(firestore, 'transaction');
      const q = query(
        transactionRef,
        where('doneeName', '==', patientName),
        where('doneeMotherName', '==', patientMotherName),
      );

      const querySnapshot = await getDocs(q);
      const transactionDocument = querySnapshot.docs[0];

      if (querySnapshot.empty) {
        await addDoc(transactionRef, {
          donorID: userID,
          date: timestamp,
          doneeName: patientName,
          doneeMotherName: patientMotherName,
          doneeEmail: patientEmail,
          totalDonation: parseFloat(price),
          credit: parseFloat(price),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await updateDoc(transactionDocument.ref, {
          totalDonation:
            parseFloat(transactionDocument.data().totalDonation) +
            parseFloat(price),
          credit:
            parseFloat(transactionDocument.data().credit) + parseFloat(price),
          updatedAt: serverTimestamp(),
        });
      }

      dispatch(setTransaction(transactionData));
      setPatientName('');
      setPatientMotherName('');
      setPatientEmail('');
      setPrice('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (route.params) {
      const {doneeName, doneeMotherName, doneeEmail} = route.params;

      if (typeof doneeName === 'undefined') {
        setPatientName('');
      } else {
        setPatientName(doneeName);
      }
      if (typeof doneeMotherName === 'undefined') {
        setPatientMotherName('');
      } else {
        setPatientMotherName(doneeMotherName);
      }

      if (typeof doneeEmail === 'undefined') {
        setPatientEmail('');
      } else {
        setPatientEmail(doneeEmail);
      }
    }
  }, [route.params, setPatientName, setPatientMotherName, setPatientEmail]);

  useEffect(() => {
    if (route.params?.paymentStatus === 'success') {
      (async () => {
        try {
          await handleSubmit();
          toast.show({
            render: () => (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                <Text color="white">Payment Successful!</Text>
              </Box>
            ),
          });
        } catch (error) {
          console.error('handleSubmit', error);
        } finally {
          route.params.paymentStatus = null;
        }
      })();
    }

    if (route.params?.paymentStatus === 'fail') {
      toast.show({
        render: () => (
          <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
            <Text color="white">Payment Unsuccessful!</Text>
          </Box>
        ),
      });
      route.params.paymentStatus = null;
    }
  }, [route.params?.paymentStatus]);

  return (
    <>
      <View style={{flex: 1}}>
        <Image
          source={require('../Image/reg_patient.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
          alt="background"
        />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <Box>
            <Header />
            <Box
              position="relative"
              bg="#560FC9"
              marginBottom={(screenWidth * 4) / 100}>
              <BackButton left={4} />

              <Box
                style={{
                  position: 'absolute',
                  top: 50,
                  zIndex: 10,
                  alignSelf: 'center',
                }}>
                <Text
                  textAlign="center"
                  fontSize={(screenWidth * 9.5) / 100}
                  color="#ffffff"
                  fontWeight="bold">
                  רישום אדם לתפילה
                </Text>
                <Text fontSize={20} textAlign="center" color="white">
                  100% מהכסף שנתרם יינתן לתרומה
                </Text>
              </Box>
            </Box>
          </Box>

          <Box style={styles.container}>
            <Box margin={(screenWidth * 3) / 100}>
              <Center>
                <FormControl isInvalid={nameError} w="100%">
                  <Text
                    marginRight={(screenWidth * 5) / 100}
                    marginBottom={(screenHeight * 1) / 100}
                    color="#1E0050">
                    שם פרטי
                  </Text>
                  <Input
                    style={styles.input}
                    variant={'unstyled'}
                    placeholder="שם פרטי"
                    value={patientName}
                    onChangeText={setPatientName}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    נא להזין שם
                  </FormControl.ErrorMessage>
                </FormControl>
              </Center>
              <Center>
                <FormControl isInvalid={motherNameError} w="100%">
                  <Text
                    marginRight={(screenWidth * 5) / 100}
                    marginTop={(screenHeight * 2) / 100}
                    marginBottom={(screenHeight * 1) / 100}
                    color="#1E0050">
                    שם האם
                  </Text>
                  <Input
                    style={styles.input}
                    variant={'unstyled'}
                    placeholder="שם האם"
                    value={patientMotherName}
                    onChangeText={setPatientMotherName}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    נא להזין את שם האם
                  </FormControl.ErrorMessage>
                </FormControl>
              </Center>
              <Center>
                <FormControl isInvalid={emailError} w="100%">
                  <Text
                    marginRight={(screenWidth * 5) / 100}
                    marginTop={(screenHeight * 2) / 100}
                    marginBottom={(screenHeight * 1) / 100}
                    color="#1E0050">
                    אמייל של התורם
                  </Text>
                  <Input
                    style={styles.input}
                    variant={'unstyled'}
                    placeholder="הזן אימייל"
                    value={patientEmail}
                    onChangeText={setPatientEmail}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    נא להזין אימייל
                  </FormControl.ErrorMessage>
                </FormControl>
              </Center>
            </Box>
            <Box padding={(screenWidth * 1) / 100}>
              <Text
                padding={(screenWidth * 2) / 100}
                textAlign="center"
                color="#1E0050">
                כל שקל שתתרמו יזכה את האדם בחמש תפילות
              </Text>
              <Box style={styles.buttongroup}>
                <Input
                  variant="unstyled"
                  style={styles.input}
                  placeholder="הכנס סכום"
                  width="50%"
                  value={price}
                  keyboardType="numeric"
                  onChangeText={setPrice}
                />
              </Box>
              <Center padding={(screenWidth * 2) / 100}>
                <Button
                  style={styles.button}
                  disabled={loading}
                  backgroundColor="#560FC9"
                  width="50%"
                  onPress={initializePayment}>
                  <HStack space="2" alignItems="center">
                    {!loading ? (
                      <Text color="white">המשך לתשלום</Text>
                    ) : (
                      <Spinner color="white" />
                    )}
                  </HStack>
                </Button>
              </Center>
            </Box>
          </Box>
        </ScrollView>
      </View>
    </>
  );
};

export default RegisterPatientScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: (screenWidth * 5) / 100, // 5% of screen width
    borderTopRightRadius: (screenWidth * 5) / 100, // 5% of screen width
    // marginTop: (screenHeight * 22) / 100, // 1% of screen height
    padding: (screenWidth * 2) / 100, // 2% of screen width
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttongroup: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: (screenWidth * 1) / 100, // 1% of screen width
  },
  input: {
    padding: (screenWidth * 1) / 100, // 1% of screen width
    height: (screenHeight * 5) / 100,
    backgroundColor: '#F1E6FF',
    color: 'black',
    borderRadius: (screenWidth * 5) / 100, // 1.5% of screen width
  },
  button: {
    borderRadius: (screenWidth * 4) / 100, // 1.5% of screen width
    margin: (screenWidth * 0.75) / 100, // 0.75% of screen width
  },
});
