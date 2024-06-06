/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  ArrowBackIcon,
  Text,
  Input,
  Button,
  Center,
  Box,
  HStack,
  useToast,
  FormControl,
  WarningOutlineIcon,
  ScrollView,
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {setTransaction} from '../redux/actions/transactionAction';
import Header from './Components/Header';
import {createPayment} from '../Utils/YaadpayService';
import {loadUser} from '../redux/reducers/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE62_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const base62Encode = num => {
  let encoded = '';
  while (num > 0) {
    encoded = BASE62_CHARS[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded.padStart(9, '0'); // Ensure it is 9 characters long
};

const base62Decode = str => {
  let decoded = 0;
  for (let i = 0; i < str.length; i++) {
    decoded = decoded * 62 + BASE62_CHARS.indexOf(str[i]);
  }
  return decoded;
};

const firebaseDocIdToNumber = docId => {
  let num = 0;
  for (let i = 0; i < docId.length; i++) {
    num = num * 62 + BASE62_CHARS.indexOf(docId[i]);
  }
  return num;
};

const numberToFirebaseDocId = num => {
  let docId = '';
  while (num > 0) {
    docId = BASE62_CHARS[num % 62] + docId;
    num = Math.floor(num / 62);
  }
  return docId.padStart(20, '0'); // Firebase document IDs are 20 characters long
};

let transactionUserId = '';
const RegisterPatientScreen = () => {
  const route = useRoute();

  const toast = useToast();
  const navigation = useNavigation();
  const [patientName, setPatientName] = useState('');
  const [patientMotherName, setPatientMotherName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionUid, setTransactionUid] = useState(
    route.params?.transactionUid,
  );

  const [selectedButton, setSelectedButton] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmitClick = () => {
    setSubmitClicked(true);
    setPatientName('');
    setPatientMotherName('');
    setPrice('');
    setPatientEmail('');
    setSelectedButton(null);
  };

  const handleButtonSelect = buttonNumber => {
    setSelectedButton(buttonNumber);
  };

  useEffect(() => {
    if (!userID) navigation.navigate('Login');
  }, [route.name]);

  const userID = useSelector(state => state.user.userID);
  const trans = useSelector(state => state.transaction);
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // const uid = await AsyncStorage.getItem('userId');
      const uid = 'SHOULD BE UID';
      console.log({uid});
      // setUid(uid);
    })();
  }, []);

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
      height: (screenHeight * 5) / 100,
      borderRadius: (screenWidth * 4) / 100, // 1.5% of screen width
      margin: (screenWidth * 0.75) / 100, // 0.75% of screen width
      padding: (screenWidth * 0.75) / 100, // 0.75% of screen width
    },
  });

  useEffect(() => {
    console.log({userID});
  }, [userID]);

  const initializePayment = async () => {
    setLoading(true);
    try {
      const response = await createPayment({
        userId: (() => {
          let result = '';
          for (let i = 0; i < 9; i++) {
            // Generate a random number between 0 and 9 and append it to the result
            result += Math.floor(Math.random() * 10).toString();
          }
          console.log({result});
          transactionUserId = result;
          return result;
        })(),
        amount: price,
        clientLName: patientName,
        clientName: patientName,
        email: patientEmail,
      });
      const paymentUrl = response.paymentUrl;

      console.log({transactionUserId});

      if (paymentUrl)
        navigation.navigate('Payment', {
          paymentUrl,
          transactionUid: transactionUserId,
        });
    } catch {
      console.error('initializePayment', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (patientName.trim() === '') {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (patientMotherName.trim() === '') {
        setMotherNameError(true);
      } else {
        setMotherNameError(false);
      }
      if (patientEmail.trim() === '') {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      const timestamp = Date(Date.now());
      if (price === '') {
        console.log('okay');
        return toast.show({
          render: () => {
            return (
              <Box
                bg="red.500"
                color={'white'}
                px="2"
                py="1"
                rounded="sm"
                mb={5}>
                <Text color={'white'}>Please Enter the Donate Price!</Text>
              </Box>
            );
          },
        });
      } else {
        console.log('HANDLE_SUB: ', transactionUid);
        const transactionDatas = {
          donorID: userID,
          date: timestamp,
          doneeName: patientName,
          doneeMotherName: patientMotherName,
          doneeEmail: patientEmail,
          transactionUid,
          transactionAmount: parseFloat(price),
        };
        const res = await firestore()
          .collection('transaction')
          .add({
            donorID: userID,
            date: timestamp,
            doneeName: patientName,
            doneeMotherName: patientMotherName,
            doneeEmail: patientEmail,
            transactionAmount: parseFloat(price),
          });

        console.log('handleSubmit: ', res);
        console.log('transactionInfo', trans);

        dispatch(setTransaction(transactionDatas));
        setPatientName('');
        setPatientMotherName('');
        setPatientEmail('');
        setPrice('');
      }
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
    } else {
      console.log('Route params are undefined');
    }
  }, [route.params, setPatientName, setPatientMotherName, setPatientEmail]);

  useEffect(() => {
    console.log({paymentStatus: route.params?.paymentStatus});
    if (route.params?.paymentStatus === 'success') {
      (async () => {
        try {
          await handleSubmit();
          toast.show({
            render: () => {
              return (
                <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={'white'}>Payment Successful!</Text>
                </Box>
              );
            },
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
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              <Text color={'white'}>Payment Unsuccessful!</Text>
            </Box>
          );
        },
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
              <Box position={'absolute'} top={5} right={6}>
                <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
                  <ArrowBackIcon color="white" size={4} marginLeft="2" />
                </TouchableOpacity>
              </Box>

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
                  רישום חולה לתפילה
                </Text>
                <Text fontSize={20} textAlign={'center'} color={'white'}>
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
                כל שקל שתתרמו יזכה את החולה בחמש תפילות
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
                  onPress={() => initializePayment()}>
                  <HStack space="2" alignItems="center">
                    {!loading ? (
                      <Text color="white">המשך לתשלום</Text>
                    ) : (
                      <Spinner color={'white'} />
                    )}
                  </HStack>
                </Button>
              </Center>
            </Box>
          </Box>
          {/* </View> */}
        </ScrollView>
      </View>
    </>
  );
};

export default RegisterPatientScreen;
