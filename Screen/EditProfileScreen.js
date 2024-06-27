/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  View,
  Text,
  useToast,
  WarningOutlineIcon,
  Row,
  Icon,
  DeleteIcon,
} from 'native-base';
import {Alert, Dimensions, TouchableOpacity} from 'react-native';
import Header from './Components/Header.js';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData, updateUserData} from '../redux/actions/userAction.js';
import firestore from '@react-native-firebase/firestore';
import BackButton from './Components/BackButton.js';

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [mothername, setMotherName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  const ID = useSelector(state => state.user.userID);

  const userID = useSelector(state => state.user.userID);

  const route = useRoute();

  useEffect(() => {
    if (!userID) navigation.navigate('Login');
  }, [route.name]);

  const userData = useSelector(state => state.user);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const toast = useToast();
  const dispatch = useDispatch();
  const db = firestore();
  const handleUpdateProfile = async () => {
    if (name === '' || mothername === '' || email === '') {
      if (name === '') {
        setNameError(true);
      } else {
        setNameError(false);
      }

      if (mothername === '') {
        setMotherNameError(true);
      } else {
        setMotherNameError(false);
      }

      if (email === '') {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    } else {
      const docRef = db.collection('users').doc(ID);
      docRef
        .update({
          name: name,
          mothername: mothername,
          email: email,
        })
        .then(() => {
          toast.show({
            render: () => {
              return (
                <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  הפרופיל עודכן בהצלחה
                </Box>
              );
            },
          });
        })
        .catch(error => {
          console.error('Error updating document:', error);
        });
      dispatch(
        updateUserData({
          userID: ID,
          name: name,
          mothername: mothername,
          email: email,
        }),
      );
    }
  };
  const user = useSelector(state => state.user);

  useEffect(() => {
    setName(user.name);
    setMotherName(user.mothername);
    setEmail(user.email);
  }, [user.name, user.mothername, user.email]);

  const deleteAccount = async () => {
    try {
      const docRef = firestore().collection('users').doc(ID);

      await docRef.delete();
      toast.show({
        render: () => (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            החשבון נמחק בהצלחה
          </Box>
        ),
      });

      // Navigate to the login screen after 2 seconds
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        p={4}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}
        height={(screenHeight * 14) / 100}>
        <BackButton marginTop={5} />

        <Center width="100%" height="100%">
          <Image source={require('../Image/edit.png')} alt="edit image" />
        </Center>

        <Box />
      </HStack>
      <View margin="5" marginTop="10" flex="1">
        <FormControl isInvalid={nameError} w="100%">
          <Text marginRight="4" color="#560FC9">
            שם פרטי
          </Text>
          <Input
            placeholder="Please enter your name"
            backgroundColor="#F1E6FF"
            onChangeText={setName}
            value={name}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            נא להזין שם
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={motherNameError} w="100%">
          <Text marginRight="4" color="#560FC9">
            שם האם
          </Text>
          <Input
            placeholder="Please enter your mother name"
            backgroundColor="#F1E6FF"
            onChangeText={setMotherName}
            value={mothername}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            נא להזין את שם האם
          </FormControl.ErrorMessage>
        </FormControl>
        <Text marginRight="4" color="#560FC9">
          אמייל(אופציונלי)
        </Text>
        <FormControl isInvalid={emailError} w="100%">
          <Input
            placeholder="Please enter your email"
            backgroundColor="#F1E6FF"
            onChangeText={setEmail}
            value={email}
            color="#1E0050"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            נא להזין אימייל
          </FormControl.ErrorMessage>
        </FormControl>
      </View>
      <View alignItems="center" justifyContent="center" marginBottom="4">
        <Button
          backgroundColor="#560FC9"
          borderRadius="2xl"
          margin="2"
          width={(screenWidth * 90) / 100}
          height={(screenHeight * 5.7) / 100}
          onPress={handleUpdateProfile}>
          שמירה
        </Button>
        <Row
          style={{
            marginHorizontal: 20,
            borderColor: 'red',
            borderWidth: 1,
            borderRadius: 15,
            overflow: 'hidden',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'flex-start',
              paddingLeft: 8,
              justifyContent: 'center',
              width: 50,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
            onPress={() => {
              Alert.alert(
                'מחק חשבון',
                'מחק חשבון',
                [
                  {
                    text: 'Confirm',
                    onPress: deleteAccount,
                    style: 'default',
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                },
              );
            }}>
            <DeleteIcon color="red.500" size={4} marginLeft="2" />
          </TouchableOpacity>
          <Box w={1} />
          <Button
            backgroundColor="#F5DCDC"
            borderTopLeftRadius="xl"
            borderBottomLeftRadius="xl"
            // borderWidth={1}
            borderColor={'red.400'}
            flex={1}
            // width={(screenWidth * 90) / 100}
            height={(screenHeight * 5.7) / 100}
            onPress={() => {
              dispatch(setUserData(null));
              navigation.navigate('Login');
            }}>
            <Text color={'red.400'}>להתנתק</Text>
          </Button>
        </Row>
      </View>
    </>
  );
};
export default EditProfileScreen;
