/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  useToast,
  FormControl,
  WarningOutlineIcon,
  KeyboardAvoidingView,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
// import { setUser } from '../store/userSlice';
import {setUserData} from '../redux/actions/userAction';
import {connect} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mothername, setMotherName] = useState('');
  const [email, setEmail] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const toast = useToast();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const handleRegister = async () => {
    console.log('Handle Register Button');
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('name', '==', name)
        .where('mothername', '==', mothername)
        .where('email', '==', email)
        .get();
      if (querySnapshot.empty) {
        const timestamp = Date.now();
        const res = await firestore().collection('users').add({
          name: name,
          mothername: mothername,
          email: email,
          registertime: timestamp,
        });
        auth().signInAnonymously();

        const documentSnapshot = await res.get();
        const userArrayID = res._documentPath._parts;
        const userID = userArrayID[1];
        const data = documentSnapshot.data();
        if (documentSnapshot.exists) {
          const payload = {
            userID: userID,
            name: data.name,
            mothername: data.mothername,
            email: data.email,
          };
          dispatch(setUserData(payload));
        } else {
          console.log('Document does not exist!');
        }
        handleNavigateToLoginScreen();
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Register Success
              </Box>
            );
          },
        });
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                This User is already exist!
              </Box>
            );
          },
        });
      }
    } catch (error) {
      console.log('error is:', error);
    }
  };

  const handleNavigateToLoginScreen = () => {
    navigation.navigate('Login'); // Navigate to the 'FrameScreen' page
  };
  return (
    <NativeBaseProvider isSSR={false}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={require('../Image/bg_reg.png')}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={styles.safearea}>
              <FormControl isInvalid={'name' in errors}>
                <Text style={styles.text}>שם פרטי</Text>
                <Input
                  placeholder="שם פרטי"
                  value={name}
                  onChangeText={setName}
                  color="black"
                  borderRadius={20}
                  backgroundColor="#F1E6FF"
                  variant="unstyled"
                />
                {'name' in errors && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.name}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={'motherName' in errors}>
                <Text style={styles.text}>שם האם</Text>
                <Input
                  placeholder="שם האם"
                  value={mothername}
                  color="black"
                  onChangeText={setMotherName}
                  borderRadius={20}
                  backgroundColor="#F1E6FF"
                  variant="unstyled"
                />
                {'motherName' in errors && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.motherName}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={'email' in errors}>
                <Text style={styles.text}>אמייל (אופציונלי)</Text>
                <Input
                  placeholder="אמייל"
                  value={email}
                  color="black"
                  onChangeText={setEmail}
                  borderRadius={20}
                  backgroundColor="#F1E6FF"
                  variant="unstyled"
                />
                {'email' in errors && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.email}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <HStack space={10} justifyContent="center">
                <Checkbox
                  style={styles.termstext}
                  accessibilityLabel="checkbox"
                  shadow={2}
                  checked={isCheckboxChecked}
                  onChange={setIsCheckboxChecked}>
                  תנאי שירות (Terms & Conditions)
                </Checkbox>
              </HStack>

              <HStack justifyContent="center">
                <Button
                  titel="register"
                  width="100%"
                  backgroundColor="#560FC9"
                  size="lg"
                  rounded="lg"
                  isDisabled={!isCheckboxChecked}
                  onPress={handleRegister}>
                  המשך
                </Button>
              </HStack>
              {/* <Button
                onPress={() => navigation.navigate('Students')}
                variant={'link'}
                style={{paddingVertical: 10}}>
                <Text color={'#560FC9'}>Sponsor a Student</Text>
              </Button> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default connect(null, {setUserData})(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  safearea: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 0,
    width: '100%',
    padding: 20,
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
    // color: '#1E0050',
  },
  termstext: {
    fontSize: 14,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
