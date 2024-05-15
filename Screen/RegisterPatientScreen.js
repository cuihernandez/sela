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
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {setTransaction} from '../redux/actions/transactionAction';
import Header from './Components/Header';

const RegisterPatientScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [patientName, setPatientName] = useState('');
  const [patientMotherName, setPatientMotherName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [price, setPrice] = useState('');

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
    console.log({route});
  }, []);

  const userID = useSelector(state => state.user.userID);
  const trans = useSelector(state => state.transaction);
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();

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

  const handleSubmit = async () => {
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
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Please Enter the Donate Price!
            </Box>
          );
        },
      });
    } else {
      const transactionDatas = {
        donorID: userID,
        date: timestamp,
        doneeName: patientName,
        doneeMotherName: patientMotherName,
        doneeEmail: patientEmail,
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
      dispatch(setTransaction(transactionDatas));
      console.log('transactionInfo', trans);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Payment Successfully!
            </Box>
          );
        },
      });
      setPatientName('');
      setPatientMotherName('');
      setPatientEmail('');
      setPrice('');
    }
  };
  const route = useRoute();

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
              <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
                <ArrowBackIcon
                  color="#ffffff"
                  marginTop={(screenWidth * 4) / 100}
                  marginLeft={(screenWidth * 6) / 100}
                />
              </TouchableOpacity>
              <Text
                textAlign="center"
                fontSize={(screenWidth * 9.5) / 100}
                color="#ffffff"
                fontWeight="bold">
                רישום חולה לתפילה
              </Text>
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
                    Please Enter Name
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
                    Please Enter Mother Name
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
                    אימייל
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
                    Pleae Enter Email
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
                  placeholder="ןזהוכסם"
                  width="50%"
                  value={price}
                  keyboardType="numeric"
                  onChangeText={setPrice}
                />
              </Box>
              <Center padding={(screenWidth * 2) / 100}>
                <Button
                  style={styles.button}
                  backgroundColor="#560FC9"
                  width="50%"
                  height={(screenHeight * 5.6) / 100}
                  _text={{fontSize: (screenWidth * 4) / 100}}
                  onPress={() =>
                    // submitClicked ? handleSubmit() : handleSubmitClick()
                    navigation.navigate("Payment")
                  }>
                  <HStack space="2" alignItems="center">
                    <Text color="white">המשך</Text>
                    <Image
                      source={require('../Image/bit.png')}
                      alt="bit"
                      size={8} // Adjust the size as needed
                      ml={2} // Add margin to separate text and image
                    />
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
