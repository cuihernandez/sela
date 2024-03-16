/* eslint-disable prettier/prettier */
import { React, useEffect, useState } from 'react';
import { View, Image, StyleSheet, BackHandler } from 'react-native';
import { Center, Modal, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const SplashScreen = () => {
  //State for AcitivityIndicator animation
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const getText = async () => {
      try {
        const snapshot = await firestore()
          .collection('mobileStatus')
          .get();
        const res = snapshot.docs;
        const mobileStatus = res[0]._data.status;
        console.log('The mobile status is', mobileStatus)
        if (mobileStatus === true) {
          navigation.navigate('Login');
        }
        else {
          setShowModal(true);
        }
      }
      catch (error) {
        console.error('This is error:', error)
      }
    }
    getText();
  }, [navigation]);
  const handleCloseApp = () => {
    BackHandler.exitApp(); // Exit the app
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/splash_screen.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {showModal && (
        <Center>
          <Modal isOpen={showModal}>
            <Modal.Content maxWidth="350" maxH="212">
              <Modal.CloseButton />
              <Modal.Header>Today is Holiday!</Modal.Header>
              <Modal.Body>
                Our Sela Company don't work on Holiday!
              </Modal.Body>
              <Modal.Footer>
                <Center>
                  <Button onPress={handleCloseApp}>Close App</Button>
                </Center>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    color: '#ffff00',
  },
});

export default SplashScreen;
