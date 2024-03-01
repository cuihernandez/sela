/* eslint-disable prettier/prettier */
import { React, useState, useEffect } from 'react';
import { ArrowBackIcon, Box, Button, Center, HStack, Image, Input, Text, View, ScrollView, FormControl, Modal } from 'native-base';
import { TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { firestore } from '@react-native-firebase/firestore';

import Header from './Components/Header.js';
import TestimonalsText from './Components/TestimonalsText.js';

const TestimonialsScreens = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [content, setContent] = useState([]);
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const [showModal, setShowModal] = useState(false);

  const handleButtonPress = () => {
    setShowModal(false);
    let newContent = {
      name,
      text: inputValue,
    };
    setContent(previousContent => [
      ...previousContent,
      newContent,
    ]);
    setInputValue(''); // Clear input after pushing value
  };

  useEffect(() => {
    // Logic to handle array content change
    // For example, you can map over arrayContent here
    // and render Text components for each item
  }, [content]);

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
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowBackIcon color="white" size={4} />
        </TouchableOpacity>
        <Text
          color="white"
          alignItems={'center'}
          fontSize={'lg'}
          px="3"
          marginTop={'5'}>
          תודה
        </Text>
        <Box />
      </HStack>
      <Box flex={1} alignItems="center">
        <ScrollView backgroundColor="amber.200">
          <View
            borderRadius="30"
            backgroundColor="#F1E6FF"
            marginLeft={10}
            marginRight={10}
            marginTop={10}>
            <Image
              marginLeft={2}
              source={require('../Image/bi_quote.png')}
              resizeMode="cover"
              alt="quote"
            />
            <View
              borderRadius="30"
              backgroundColor="#F1E6FF"
              marginLeft="2"
              marginRight="2"
              marginBottom="2"
              paddingLeft="2"
              paddingRight="2"
              paddingBottom="3">
              <Text color="#560FC9" fontSize="16" marginBottom={1}>
                פרטים
              </Text>
              <Text color="#8F80A7">
                י שמח לעזור ע"י תפילה ומרגיש ממש טוב לדעת שבכל יום ניתנת צדקה בשמי
                לנזקקים - תודה לחברת סלה
              </Text>
              <Text color="#560FC9" fontSize="16" marginRight="3">
                פלוני אלמוני
              </Text>
            </View>
          </View>
          <View
            borderRadius="30"
            backgroundColor="#F1E6FF"
            marginLeft={10}
            marginRight={10}
            marginTop={10}>
            <Image
              marginLeft={2}
              source={require('../Image/bi_quote.png')}
              resizeMode="cover"
              alt="quote"
            />
            <View
              borderRadius="30"
              backgroundColor="#F1E6FF"
              marginLeft="2"
              marginRight="2"
              marginBottom="2"
              paddingLeft="2"
              paddingRight="2"
              paddingBottom="3">
              <Text color="#560FC9" fontSize="16" marginBottom={1}>
                פרטים
              </Text>
              <Text color="#8F80A7">
                י שמח לעזור ע"י תפילה ומרגיש ממש טוב לדעת שבכל יום ניתנת צדקה בשמי
                לנזקקים - תודה לחברת סלה
              </Text>
              <Text color="#560FC9" fontSize="16" marginRight="3">
                פלוני אלמוני
              </Text>
            </View>
          </View>
          <View
            borderRadius="30"
            backgroundColor="#F1E6FF"
            marginLeft={10}
            marginRight={10}
            marginTop={10}>
            <Image
              marginLeft={2}
              source={require('../Image/bi_quote.png')}
              resizeMode="cover"
              alt="quote"
            />
            <View
              borderRadius="30"
              backgroundColor="#F1E6FF"
              marginLeft="2"
              marginRight="2"
              marginBottom="2"
              paddingLeft="2"
              paddingRight="2"
              paddingBottom="3">
              <Text color="#560FC9" fontSize="16" marginBottom={1}>
                פרטים
              </Text>
              <Text color="#8F80A7">
                י שמח לעזור ע"י תפילה ומרגיש ממש טוב לדעת שבכל יום ניתנת צדקה בשמי
                לנזקקים - תודה לחברת סלה
              </Text>
              <Text color="#560FC9" fontSize="16" marginRight="3" >
                פלוני אלמוני
              </Text>
            </View>
          </View>
          {/* Render array content */}
          {content.map((item, index) => (
            <TestimonalsText key={index} text={item.text} name={item.name} />
          ))}
        </ScrollView>
        <View>
          {/* <Input
            placeholder="Enter value"
            onChangeText={handleInputChange}
            value={inputValue}
          />
          <Button onPress={handleButtonPress}>
            <Text>Add to Array</Text>
          </Button> */}
          {/* Plus Button */}
          <Center>
            <Button onPress={() => setShowModal(true)}>+</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Add Testimonals</Modal.Header>
                <Modal.Body>
                  <FormControl mt="3">
                    <FormControl.Label>Name</FormControl.Label>
                    <Input
                      placeholder="Enter Your Name"
                      onChangeText={setName}
                      value={name}
                    />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>FeedBack</FormControl.Label>
                    <Input
                      placeholder="Enter FeedBack"
                      onChangeText={handleInputChange}
                      value={inputValue}
                    />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                      setShowModal(false);
                    }}>
                      Cancel
                    </Button>
                    <Button onPress={handleButtonPress}>
                      Saved
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
          {/* End Plus Button */}
        </View>
      </Box>
    </>
  );
};
export default TestimonialsScreens;
