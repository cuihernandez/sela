/* eslint-disable prettier/prettier */
import React from 'react';
import {
    ArrowBackIcon,
    Box,
    Button,
    Center,
    HStack,
    Image,
    Input,
    View,
    Text,
} from 'native-base';
import { Dimensions } from 'react-native';
import Header from './Components/Header.js';

const EditProfileScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
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
                borderBottomRadius={'40'}
                height={screenHeight * 14 / 100}>
                <Box>
                    <ArrowBackIcon color="white" size={4} marginLeft="2" />
                </Box>
                <Center width="100" height="100">
                    <Image
                        source={require('../Image/edit.png')}
                        alt="edit image"
                    />
                </Center>
                <Box />
            </HStack>
            <View margin="5" marginTop="10" flex="1">
                <Text marginRight="4">שם פרטי</Text>
                <Input placeholder="לוק" backgroundColor="#F1E6FF" />
                <Text marginRight="4">שם האם</Text>
                <Input placeholder="מרי" backgroundColor="#F1E6FF" />
                <Text marginRight="4">אמייל(אופציונלי)</Text>
                <Input placeholder="nexaluscube@gmail.com" backgroundColor="#F1E6FF" underlineColorAndroid="black" />
            </View>
            <View alignItems="center" justifyContent="center" marginBottom="4">
                <Button
                    backgroundColor="#560FC9"
                    borderRadius="2xl"
                    margin="2"
                    width={(screenWidth * 90) / 100}
                    height={(screenHeight * 5.7) / 100}
                >עדכן</Button>
            </View>
        </>
    );
};
export default EditProfileScreen;
