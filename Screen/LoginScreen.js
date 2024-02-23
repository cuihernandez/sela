/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Dimensions, Image, View, StyleSheet} from 'react-native';
import {
  NativeBaseProvider,
  Text,
  Input,
  Link,
  Button,
  HStack,
} from 'native-base';

import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [mam_name, onChangeMam] = useState('');
  const [email, onChangeEmail] = useState('');

  const handleNavigateToFrameScreen = () => {
    navigation.navigate('Frame1'); // Navigate to the 'FrameScreen' page
  };
  const handleNavigationToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image
          source={require('../Image/bg_reg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.safearea}>
          <Text style={styles.text}>שם פרטי</Text>
          <Input
            style={styles.input}
            onChangeText={onChangeName}
            variant="unstyled"
            value={name}
            placeholder="שם פרטי"
          />
          <Text style={styles.text}>שם האם</Text>
          <Input
            style={styles.input}
            onChangeText={onChangeMam}
            variant="unstyled"
            value={mam_name}
            placeholder="שם האם"
          />

          <Text style={styles.text}>אמייל (אופציונלי)</Text>
          <Input
            style={styles.input}
            variant="unstyled"
            placeholder="אמייל (אופציונלי)"
            onChangeText={onChangeEmail}
            value={email}
          />

          <HStack justifyContent="center" marginTop="10">
            <Button
              width="100%"
              colorScheme="purple"
              size="lg"
              rounded="lg"
              onPress={handleNavigateToFrameScreen}>
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
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#D6B7FF',
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
