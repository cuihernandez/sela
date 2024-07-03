import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Text,
  Input,
  Link,
  Button,
  HStack,
  useToast,
} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../redux/actions/userAction';
import {useNavigation} from '@react-navigation/native';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import firebaseConfig from '../Utils/firebaseConfig';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [formData, setFormData] = useState({
    name: user.name,
    mothername: user.mothername,
    email: user.email,
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      mothername: user.mothername,
      email: user.email,
    });
  }, [user.name, user.mothername, user.email]);

  const handleInputChange = (valueName, value) => {
    setFormData({
      ...formData,
      [valueName]: value,
    });
  };

  const toast = useToast();
  const dispatch = useDispatch();
  const db = getFirestore(firebaseConfig);

  const handleNavigateToFrameScreen = () => {
    navigation.navigate('Frame1');
  };

  const handleNavigationToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const handleSubmit = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('name', '==', formData.name),
        where('mothername', '==', formData.mothername),
        where('deleted', '!=', true),
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const uid = doc.id;

        const payload = {
          userID: uid,
          name: formData.name.trim(),
          mothername: formData.mothername.trim(),
          email: formData.email.trim(),
        };

        dispatch(setUserData(payload));
        handleNavigateToFrameScreen();
      } else {
        toast.show({
          render: () => (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              This user does not exist!
            </Box>
          ),
        });
      }
    } catch (error) {
      console.error('LOGIN: ', error);
      toast.show({
        render: () => (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            Please Fill Inputs Again!
          </Box>
        ),
      });
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={require('../Image/bg_reg.png')}
              style={styles.backgroundImage}
              resizeMode="cover"
              alt="background"
            />
            <View style={styles.safearea}>
              <ScrollView>
                <Text style={styles.text}>שם פרטי</Text>
                <Input
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={text => handleInputChange('name', text.trim())}
                  variant="unstyled"
                  value={formData.name}
                  placeholder="שם פרטי"
                />
                <Text style={styles.text}>שם האם</Text>
                <Input
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={text =>
                    handleInputChange('mothername', text.trim())
                  }
                  variant="unstyled"
                  value={formData.mothername}
                  placeholder="שם האם"
                />
                <Text style={styles.text}>אימייל (אופציונלי)</Text>
                <Input
                  autoCapitalize="none"
                  style={styles.input}
                  variant="unstyled"
                  inputMode="email"
                  keyboardType="email-address"
                  placeholder="אמייל (אופציונלי)"
                  onChangeText={text => handleInputChange('email', text.trim())}
                  value={formData.email}
                />

                <HStack justifyContent="center" marginTop="10">
                  <Button
                    width="100%"
                    backgroundColor="#560FC9"
                    size="lg"
                    rounded="lg"
                    onPress={handleSubmit}>
                    המשך
                  </Button>
                </HStack>
                <HStack justifyContent="center" alignItems="center">
                  <Text
                    fontSize="md"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    I'm a new user.
                  </Text>
                  <Link
                    style={styles.signup}
                    _text={{
                      fontSize: 'md',
                      fontWeight: '500',
                      color: 'indigo.500',
                    }}
                    alignSelf="flex-end"
                    mt="1"
                    onPress={handleNavigationToRegisterScreen}>
                    sign up
                  </Link>
                </HStack>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default LoginScreen;

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
  input: {
    padding: 10,
    borderRadius: 27,
    backgroundColor: '#F1E6FF',
    color: 'black',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
    color: '#1E0050',
  },
  signup: {
    fontSize: 14,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
