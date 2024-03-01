/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
import { Dimensions, TouchableOpacity } from 'react-native';
import Header from './Components/Header.js';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../redux/actions/userAction.js';
import firestore from '@react-native-firebase/firestore';

const EditProfileScreen = () => {
    const [name, setName] = useState('');
    const [mothername, setMotherName] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const handleUpdateProfile = async () => {
        console.log('user data:', user);
        try {
            const querySnapShot = await firestore().collection('users')
                .where('name', '==', user.name)
                .where('mothername', '==', user.mothername)
                .where('email', '==', user.email)
                .get();
            if (!querySnapShot.empty) {
                querySnapShot.forEach(async doc => {
                    await doc.ref.update({
                        name: name,
                        mothername: mothername,
                        email: email,
                    });
                });
                dispatch(updateUserData({ name: name, mothername: mothername, email: email }));
                console.log(' Update Successful');
            }
            else {
                console.log('No matching document found in Firestore for the given criteria.');
            }
        }
        catch (error) {
            console.log('Error updating data:', error);
        }
    };

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
                    <TouchableOpacity onPress={navigation.goBack}>
                        <ArrowBackIcon color="white" size={4} marginLeft="2" />
                    </TouchableOpacity>
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
                <Text marginRight="4" color="#560FC9">שם פרטי</Text>
                <Input placeholder="לוק" backgroundColor="#F1E6FF" onChangeText={setName} value={name} />
                <Text marginRight="4" color="#560FC9">שם האם</Text>
                <Input placeholder="מרי" backgroundColor="#F1E6FF" onChangeText={setMotherName} value={mothername} />
                <Text marginRight="4" color="#560FC9">אמייל(אופציונלי)</Text>
                <Input placeholder="nexaluscube@gmail.com" backgroundColor="#F1E6FF" onChangeText={setEmail} value={email} />
            </View>
            <View alignItems="center" justifyContent="center" marginBottom="4">
                <Button
                    backgroundColor="#560FC9"
                    borderRadius="2xl"
                    margin="2"
                    width={(screenWidth * 90) / 100}
                    height={(screenHeight * 5.7) / 100}
                    onPress={handleUpdateProfile}
                >
                    עדכן
                </Button>
            </View>
        </>
    );
};
export default EditProfileScreen;
