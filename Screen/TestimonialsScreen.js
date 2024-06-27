/* eslint-disable prettier/prettier */
import {React, useState, useEffect} from 'react';
import {
  ArrowBackIcon,
  AddIcon,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Text,
  View,
  ScrollView,
  FormControl,
  Modal,
} from 'native-base';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Header from './Components/Header.js';
import TestimonialsText from './Components/TestimonialsText.js';
import BackButton from './Components/BackButton.js';

const TestimonialsScreens = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [content, setContent] = useState([]);

  const userID = useSelector(state => state.user.userID);

  const route = useRoute();

  // useEffect(() => {
  //   if (!userID) navigation.navigate('Login');
  // }, [route.name]);

  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  const handleInputChange = text => {
    setInputValue(text);
  };
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveTestimonialToFirestore = async () => {
    const res = await firestore().collection('testimonials').add({
      userID: user.userID,
      name: name,
      text: inputValue,
    });
  };
  const handleSave = () => {
    setShowModal(false);
    saveTestimonialToFirestore();
  };

  useEffect(() => {
    const getText = async () => {
      setLoading(true);
      try {
        const snapshot = await firestore().collection('testimonials').get();
        const res = snapshot.docs;
        setLoading(false);
        setContent(res);
      } catch (error) {
        console.error('This is error:', error);
      } finally {
        setLoading(false);
      }
    };
    getText();
  }, []);

  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        alignItems="center"
        p={4}
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}>
        <BackButton />
        <Box
          style={{
            marginHorizontal: 'auto',
            width: '100%',
            marginTop: 20,
          }}>
          <Text
            textAlign={'center'}
            color="white"
            style={{
              fontSize: 24,
            }}
            lineHeight={30}>
            המלצות משתמשים
          </Text>
        </Box>
      </HStack>
      <Box flex={1} alignItems="center">
        <ScrollView width="100%">
          {loading ? (
            <View style={{marginTop: 50}}>
              <ActivityIndicator color={'#560FC9'} size={50} />
            </View>
          ) : !content.length ? (
            <View>
              <Text style={{fontSize: 16, textAlign: 'center'}}>
                אין המלצות זמינות כרגע
              </Text>
            </View>
          ) : (
            content.map((item, index) => (
              <TestimonialsText
                key={index}
                text={item._data.text}
                name={item._data.name}
              />
            ))
          )}
        </ScrollView>
        <View>
          {/* Plus Button */}
          <Center>
            {userID && (
              <Button
                bgColor={'#560FC9'}
                borderRadius={50}
                marginBottom="10"
                onPress={() => setShowModal(true)}>
                <AddIcon color={'white'} />
              </Button>
            )}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Add Testimonials</Modal.Header>
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
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </Button>
                    <Button onPress={handleSave}>Save</Button>
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
