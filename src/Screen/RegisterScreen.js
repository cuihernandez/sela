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
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {setUserData} from '../redux/actions/userAction';
import {auth, firestore} from '../Utils/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import {signInAnonymously} from 'firebase/auth';

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

  const handleRegister = async () => {
    try {
      const usersRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(
        query(
          usersRef,
          where('name', '==', name),
          where('mothername', '==', mothername),
          where('email', '==', email),
        ),
      );

      if (querySnapshot.empty) {
        const timestamp = Date.now();
        const res = await addDoc(usersRef, {
          name: name,
          mothername: mothername,
          email: email,
          deleted: false,
          registertime: timestamp,
        });

        // Sign in anonymously using Firebase Auth
        await signInAnonymously(auth);

        const documentSnapshot = await getDoc(res);
        const userArrayID = res.id; // Assuming you want to get the document ID
        const data = documentSnapshot.data();

        if (documentSnapshot.exists()) {
          const payload = {
            userID: userArrayID,
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
          render: () => (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Register Success
            </Box>
          ),
        });
      } else {
        toast.show({
          render: () => (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              This User already exists!
            </Box>
          ),
        });
      }
    } catch (error) {
      console.error('error is:', error);
    }
  };

  const handleNavigateToLoginScreen = () => {
    navigation.navigate('Login'); // Navigate to the 'Login' screen
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={require('../Image/register-screen.png')}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={styles.safearea}>
              <FormControl isInvalid={'name' in errors}>
                <Text style={styles.text}>שם פרטי</Text>
                <Input
                  autoCapitalize="none"
                  placeholder="שם פרטי"
                  value={name}
                  onChangeText={e => setName(e.trim())}
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
                  autoCapitalize="none"
                  placeholder="שם האם"
                  value={mothername}
                  color="black"
                  onChangeText={e => setMotherName(e.trim())}
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
                <Text style={styles.text}>אמייל (אופציונלי)</Text>
                <Input
                  autoCapitalize="none"
                  placeholder="אמייל"
                  value={email}
                  color="black"
                  type="text"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={e => setEmail(e.trim())}
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
                  isChecked={isCheckboxChecked}
                  onChange={e => setIsCheckboxChecked(e)}>
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
