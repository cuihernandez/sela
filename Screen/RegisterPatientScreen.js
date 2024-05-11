/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
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
  ScrollView,
} from 'native-base';

import Header from './Components/Header';
import ScreenCaptureButton from '../Utils/ScreenCaptureButton';
import {useNavigation} from '@react-navigation/native';

const RegisterPatientScreen = ({navigation, route}) => {
  const toast = useToast();
  // const navigation = useNavigation();
  const buttontext = [10, 20, 50, 100, 200];
  const [patientName, setPatientName] = useState(route.params.name || '');
  const [patientMotherName, setPatientMotherName] = useState(
    route.params.motherName || '',
  );
  const [patientEmail, setPatientEmail] = useState('');
  const [price, setPrice] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmitClick = () => {
    setSubmitClicked(true);
    setPatientName('');
    setPatientMotherName('');
    setPrice('');
    setSelectedButton(null);
  };

  const handleButtonSelect = buttonNumber => {
    setSelectedButton(buttonNumber);
  };

  useEffect(() => {
    console.log({route});
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderTopLeftRadius: (screenWidth * 5) / 100, // 5% of screen width
      borderTopRightRadius: (screenWidth * 5) / 100, // 5% of screen width
      marginTop: (screenHeight * 16.5) / 100, // 1% of screen height
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
      flexDirection: 'row',
      justifyContent: 'center',
      padding: (screenWidth * 1) / 100, // 1% of screen width
    },
    input: {
      padding: (screenWidth * 1) / 100, // 1% of screen width
      height: (screenHeight * 5) / 100,
      backgroundColor: '#F1E6FF',
      color: '#D6B7FF',
      borderRadius: (screenWidth * 5) / 100, // 1.5% of screen width
    },
    button: {
      height: (screenHeight * 5) / 100,
      borderRadius: (screenWidth * 4) / 100, // 1.5% of screen width
      margin: (screenWidth * 0.75) / 100, // 0.75% of screen width
      padding: (screenWidth * 0.75) / 100, // 0.75% of screen width
    },
  });

  const handleSubmit = () => {
    console.log('The transaction value is:', price);
    console.log('selected button number is:', selectedButton);

    if (price === '') {
      console.log('okay');
      if (selectedButton == null) {
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
      }
    } else {
      console.log('no');
    }
  };
  return (
    <ScrollView>
      <View>
        <View>
          <Image
            source={require('../Image/reg_patient.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
            alt="background"
          />
          <Header />
          <Box
            position="relative"
            bg="#560FC9"
            marginBottom={(screenWidth * 4) / 100}>
            <TouchableOpacity onPress={navigation.goBack}>
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
        </View>

        <View style={styles.container}>
          <Box margin={(screenWidth * 3) / 100}>
            <Text
              marginRight={(screenWidth * 5) / 100}
              marginBottom={(screenHeight * 1) / 100}
              color="#1E0050">
              שם פרטי
            </Text>
            <Input
              variant="unstyled"
              placeholder="שם פרטי"
              style={styles.input}
              value={patientName}
              onChangeText={setPatientName}
            />
            <Text
              marginRight={(screenWidth * 5) / 100}
              marginTop={(screenHeight * 2) / 100}
              marginBottom={(screenHeight * 1) / 100}
              color="#1E0050">
              שם האם
            </Text>
            <Input
              variant="unstyled"
              placeholder="שם האם"
              style={styles.input}
              value={patientMotherName}
              onChangeText={setPatientMotherName}
            />
            <Text
              marginRight={(screenWidth * 5) / 100}
              marginTop={(screenHeight * 2) / 100}
              marginBottom={(screenHeight * 1) / 100}
              color="#1E0050">
              אימייל
            </Text>
            <Input
              variant="unstyled"
              placeholder="הזן אימייל"
              style={styles.input}
              value={patientEmail}
              onChangeText={setPatientEmail}
            />
          </Box>

          <View padding={(screenWidth * 1) / 100}>
            <Text
              padding={(screenWidth * 2) / 100}
              textAlign="center"
              color="#1E0050">
              כל שקל שתתרמו יזכה את החולה בחמש תפילות
            </Text>
            <View style={styles.buttongroup} justifyContent="space-evenly">
              {buttontext.map(buttonNumber => (
                <Button
                  key={buttonNumber}
                  onPress={() => handleButtonSelect(buttonNumber)}
                  backgroundColor={
                    selectedButton === buttonNumber ? '#560FC9' : '#FFFFFF'
                  }
                  borderColor="#8F80A7"
                  borderWidth={1}
                  _text={{
                    color:
                      selectedButton === buttonNumber ? '#FFFFFF' : '#8F80A7',
                  }}
                  // size="sm"
                  width={(screenWidth * 12) / 100}
                  height={(screenHeight * 6.5) / 100}
                  style={styles.button}>
                  {buttonNumber}
                </Button>
              ))}
            </View>
            <View style={styles.buttongroup}>
              <Input
                variant="unstyled"
                style={styles.input}
                placeholder="הזן סכום מותאם אישית"
                width="50%"
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
              />
              {/* Screen Capture Button */}
              <ScreenCaptureButton />
            </View>
            <Center padding={(screenWidth * 2) / 100}>
              <Button
                style={styles.button}
                backgroundColor="#560FC9"
                width="50%"
                height={(screenHeight * 5.6) / 100}
                _text={{fontSize: (screenWidth * 4) / 100}}
                onPress={() =>
                  submitClicked ? handleSubmit() : handleSubmitClick()
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
            <Center padding={(screenWidth * 3) / 100}>
              <Text color="#1E0050">תנאי שירות(Terms & conditions)</Text>
            </Center>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterPatientScreen;
