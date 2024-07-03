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
import BackButton from './Components/BackButton.js';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../Utils/firebaseConfig.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

  const route = useRoute();

  useEffect(() => {
    if (!ID) navigation.navigate('Login');
  }, [ID, route.name]);

  const user = useSelector(state => state.user);

  const toast = useToast();
  const dispatch = useDispatch();
  const handleUpdateProfile = async () => {
    if (name === '' || mothername === '' || email === '') {
      setNameError(name === '');
      setMotherNameError(mothername === '');
      setEmailError(email === '');
    } else {
      try {
        const docRef = doc(firestore, 'users', ID);
        await updateDoc(docRef, {
          name: name,
          mothername: mothername,
          email: email,
        });
        toast.show({
          render: () => (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              הפרופיל עודכן בהצלחה
            </Box>
          ),
        });
        dispatch(
          updateUserData({
            userID: ID,
            name: name,
            mothername: mothername,
            email: email,
          }),
        );
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };

  useEffect(() => {
    setName(user.name);
    setMotherName(user.mothername);
    setEmail(user.email);
  }, [user.name, user.mothername, user.email]);

  const deleteAccount = async () => {
    try {
      const docRef = doc(firestore, 'users', ID);
      await deleteDoc(docRef);
      toast.show({
        render: () => (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            החשבון נמחק בהצלחה
          </Box>
        ),
      });
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
        borderBottomRadius={40}
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
          <Button
            backgroundColor="#F5DCDC"
            borderTopLeftRadius="xl"
            borderBottomLeftRadius="xl"
            borderColor={'red.400'}
            flex={1}
            height={(screenHeight * 5.7) / 100}
            onPress={() => {
              dispatch(setUserData(null));
              navigation.navigate('Login');
            }}>
            <Text color={'red.400'}>להתנתק</Text>
          </Button>
        </Row>

        <Button
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            overflow: 'hidden',
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
          }}
          backgroundColor="transparent"
          borderTopLeftRadius="xl"
          borderBottomLeftRadius="xl"
          borderColor={'red.400'}>
          <Text marginLeft={5} color={'red.600'}>
            מחק את החשבון לצמיתות
          </Text>
        </Button>
      </View>
    </>
  );
};

export default EditProfileScreen;
