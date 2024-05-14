/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {captureScreen} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {Button, useToast, Box, HStack, Image, Text, View} from 'native-base';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Share,
} from 'react-native';
// import Share from 'react-native-share';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CaptureScreen = () => {
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    console.log('REACHED');
    const checkPermission = async () => {
      try {
        console.log('REACHED_ASYNC');
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (!hasPermission) {
          console.log('NOT_HAS_PERMISSION');
          await requestStoragePermission();
        }
      } catch (err) {
        console.warn(err);
      }
    };
    checkPermission();
  }, []);

  useEffect(() => {
    if (!imageUri) return;
    let timeout;
    timeout = setTimeout(() => {
      setImageUri('');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [imageUri]);

  const toast = useToast();
  const captureAndSaveScreen = async () => {
    try {
      const folderPath = `${RNFS.PicturesDirectoryPath}/payment`;
      const fileName = `screenshot_${new Date()
        .toISOString()
        .replace(/:/g, '-')}.jpg`;
      const filePath = `${folderPath}/${fileName}`;

      // Ensure the folder exists
      if (!(await RNFS.exists(folderPath))) {
        try {
          await RNFS.mkdir(folderPath);
        } catch (e) {
          console.error('Could not create the folder:', e);
        }
      }

      // Capture the screen
      captureScreen({
        format: 'jpg',
        quality: 0.8,
      }).then(
        uri => {
          setImageUri(uri);
          console.log('Screenshot captured', uri);
          saveImage(uri, filePath);
          Share.share({url: uri});
        },
        error => console.error('Oops, snapshot failed', error),
      );
    } catch (error) {
      console.error('Error capturing screen:', error);
    }
  };

  const saveImage = async (uri, filePath) => {
    try {
      console.log({uri, filePath});
      await RNFS.copyFile(uri, filePath);

      console.log('Screenshot saved to', filePath);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Screen Capture Successfully to {filePath}
            </Box>
          );
        },
      });
    } catch (error) {
      console.error('Error saving screenshot:', error);
    }
  };

  return (
    <>
      {imageUri && (
        <View
          style={{
            borderRadius: 20,
            position: 'absolute',
            height: screenHeight * 0.8,
            width: '98%',
            backgroundColor: '#560FC9',
            bottom: screenHeight * 0.1,
            zIndex: 20,
            overflow: 'hidden',
            borderColor: 'white',
            borderWidth: 2,
            elevation: 2,
          }}>
          <Image
            width={400}
            height={600}
            source={{
              uri: imageUri,
            }}
            alt="screenshot"
          />
        </View>
      )}
      <Button style={styles.button} onPress={captureAndSaveScreen}>
        <HStack alignItems="center">
          <Text color="#ffffff" marginRight="2">
            שמור צילום מסך
          </Text>
          <Image
            source={require('../Image/icon_download.png')}
            alignItems="center"
            alt="download"
          />
        </HStack>
      </Button>
    </>
  );
};

const requestStoragePermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to save the screenshot',
      },
    );
    console.log('GRANTED: ', granted);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default CaptureScreen;

const styles = StyleSheet.create({
  button: {
    height: (screenHeight * 5) / 100,
    borderRadius: (screenWidth * 4) / 100, // 1.5% of screen width
    margin: (screenWidth * 0.75) / 100, // 0.75% of screen width
    padding: (screenWidth * 0.75) / 100, // 0.75% of screen width
    backgroundColor: '#560FC9',
  },
});
