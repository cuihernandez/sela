/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Dimensions, Image, View, StyleSheet} from 'react-native';
import {
  ArrowBackIcon,
  Text,
  Input,
  Button,
  Center,
  Box,
  HStack,
} from 'native-base';
import Header from './Components/Header';

const RegisterScreen = () => {
  const buttontext = [10, 20, 50, 100, 200];
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonSelect = buttonNumber => {
    setSelectedButton(buttonNumber);
  };

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderTopLeftRadius: (screenWidth * 5) / 100, // 5% of screen width
      borderTopRightRadius: (screenWidth * 5) / 100, // 5% of screen width
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
      backgroundColor: '#F1E6FF',
      color: '#D6B7FF',
      borderRadius: (screenWidth * 5) / 100, // 1.5% of screen width
    },
    button: {
      borderRadius: (screenWidth * 4) / 100, // 1.5% of screen width
      margin: (screenWidth * 0.75) / 100, // 0.75% of screen width
      padding: (screenWidth * 0.75) / 100, // 0.75% of screen width
    },
  });

  return (
    <>
      <View>
        <View>
          <Image
            source={require('../Image/reg_patient.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <Header />
          <Box
            position="relative"
            bg="#560FC9"
            marginBottom={(screenWidth * 4) / 100}>
            <ArrowBackIcon
              color="white"
              marginTop={(screenWidth * 4) / 100}
              marginLeft={(screenWidth * 6) / 100}
            />
            <Text
              textAlign="center"
              fontSize={(screenWidth * 9.5) / 100}
              color="white"
              fontWeight="bold">
              רישום חולה לתפילה
            </Text>
          </Box>
        </View>

        <View style={styles.container}>
          <Box margin={(screenWidth * 3) / 100}>
            <Text margin={(screenWidth * 2) / 100}>שם פרטי</Text>
            <Input
              variant="unstyled"
              placeholder="שם פרטי"
              style={styles.input}
            />
            <Text margin={(screenWidth * 2) / 100}>שם האם</Text>
            <Input
              variant="unstyled"
              placeholder="שם האם"
              style={styles.input}
            />
            <Text margin={(screenWidth * 2) / 100}>אימייל</Text>
            <Input
              variant="unstyled"
              placeholder="הזן אימייל"
              style={styles.input}
            />
          </Box>

          <View padding={(screenWidth * 1) / 100}>
            <Text padding={(screenWidth * 2) / 100} textAlign="center">
              בחר מחיר (שקלים)
            </Text>
            <View style={styles.buttongroup} justifyContent="space-evenly">
              {buttontext.map(buttonNumber => (
                <Button
                  key={buttonNumber}
                  variant="outline"
                  onPress={() => handleButtonSelect(buttonNumber)}
                  colorScheme={
                    selectedButton === buttonNumber ? 'purple' : 'white'
                  }
                  size="sm"
                  width={(screenWidth * 12) / 100}
                  style={styles.button}>
                  {buttonNumber}
                </Button>
              ))}
            </View>
            <View style={styles.buttongroup}>
              <Input
                variant="rounded"
                style={styles.input}
                placeholder="הזן סכום מותאם אישית"
                width="50%"
              />
              <Button style={styles.button} backgroundColor="#560FC9">
                שמור צילום מסך
              </Button>
            </View>
            <Center padding={(screenWidth * 2) / 100}>
              <Button
                style={styles.button}
                backgroundColor="#560FC9"
                width="50%"
                height={(screenHeight * 5.6) / 100}
                _text={{fontSize: (screenWidth * 4) / 100}}>
                <HStack space="2" alignItems="center">
                  <Text color="white">בצע תשלום</Text>
                  <Image
                    source={require('../Image/bit.png')}
                    alt="Image"
                    size={8} // Adjust the size as needed
                    ml={2} // Add margin to separate text and image
                  />
                </HStack>
              </Button>
            </Center>
            <Center padding={(screenWidth * 3) / 100}>
              <Text>תנאי שירות(Terms & conditions)</Text>
            </Center>
          </View>
        </View>
      </View>
    </>
  );
};

export default RegisterScreen;
