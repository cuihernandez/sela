/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Dimensions, Image, View, StyleSheet} from 'react-native';
import {
  NativeBaseProvider,
  Text,
  Input,
  Button,
  HStack,
  Checkbox,
} from 'native-base';

import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [mam_name, onChangeMam] = useState('');
  const [email, onChangeEmail] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const handleNavigateToFrameScreen = () => {
    navigation.navigate('Login'); // Navigate to the 'FrameScreen' page
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
          <HStack space={10} justifyContent="center">
            <Checkbox
              style={styles.termstext}
              accessibilityLabel="checkbox"
              shadow={2}
              checked={isChecked}
              onChange={setIsChecked}>
              תנאי שירות (Terms & Conditions)
            </Checkbox>
          </HStack>

          <HStack justifyContent="center">
            <Button
              width="100%"
              colorScheme="purple"
              size="lg"
              rounded="lg"
              isDisabled={!isChecked}
              onPress={handleNavigateToFrameScreen}>
              המשך
            </Button>
          </HStack>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default RegisterScreen;

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
  termstext: {
    fontSize: 14,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
