/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, BackHandler} from 'react-native';
import {Center, Modal, Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {firestore} from '../Utils/firebaseConfig'; // Assuming you have firebaseConfig for Firestore
import {collection, getDocs} from 'firebase/firestore';

const SplashScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkMobileStatus = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'mobileStatus'));
        const docs = snapshot.docs.map(doc => doc.data().time.seconds);
        const currentTime = Math.floor(Date.now() / 1000);

        if (
          docs.length === 2 &&
          docs[0] > currentTime &&
          currentTime > docs[1]
        ) {
          setShowModal(true);
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching mobile status:', error);
        navigation.navigate('Login');
      }
    };

    checkMobileStatus();
  }, [navigation]);
  const handleCloseApp = () => {
    BackHandler.exitApp(); // Exit the app
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {showModal && (
        <Center flex={1}>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="350" maxH="212">
              <Modal.CloseButton />
              <Modal.Header>
                <Text>היום שבת/יום טוב</Text>
              </Modal.Header>
              <Modal.Body>
                <Text>האפליקציה תחזור לעבור בצאת השבת/יום טוב</Text>
              </Modal.Body>
              <Modal.Footer>
                <Center>
                  <Button onPress={handleCloseApp}>סגור אפליקציה</Button>
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
});

export default SplashScreen;
