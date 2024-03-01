/* eslint-disable prettier/prettier */
import React from 'react';
import { captureScreen } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { Button, useToast, Box, HStack, Image, Text } from 'native-base';
import { Dimensions, PermissionsAndroid, Platform, StyleSheet } from 'react-native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CaptureScreen = () => {
    const toast = useToast();
    const captureAndSaveScreen = async () => {
        try {
            // Request storage permission for Android
            // if (Platform.OS === 'android' && !(await requestStoragePermission())) {
            //     console.log('Storage permission is not granted.');
            //     return;
            // }

            const folderPath = `${RNFS.PicturesDirectoryPath}/payment`;
            const fileName = `screenshot_${new Date().toISOString().replace(/:/g, '-')}.jpg`;
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
            }
            ).then(
                uri => {
                    console.log('Screenshot captured', uri);
                    saveImage(uri, filePath);
                },
                error => console.error('Oops, snapshot failed', error),
            );
        } catch (error) {
            console.error('Error capturing screen:', error);
        }
    };

    const saveImage = async (uri, filePath) => {
        try {
            await RNFS.copyFile(uri, filePath);
            console.log('Screenshot saved to', filePath);
            toast.show({
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        Screen Capture Successfully to {filePath}
                    </Box>;
                },
            });

        } catch (error) {
            console.error('Error saving screenshot:', error);
        }
    };

    const requestStoragePermission = async () => {
        if (Platform.OS !== 'android') { return true; }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to your storage to save the screenshot',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    return <Button style={styles.button} onPress={captureAndSaveScreen}>
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

    </Button>;
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
