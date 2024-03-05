/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    ArrowBackIcon,
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Image,
    Input,
    View,
    Text,
    useToast,
    WarningOutlineIcon
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
    const [nameError, setNameError] = useState(false);
    const [motherNameError, setMotherNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const navigation = useNavigation();
    const ID = useSelector(state => state.user.userID);
    const userData = useSelector(state => state.user);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const toast = useToast();
    const dispatch = useDispatch();
    const db = firestore();
    const handleUpdateProfile = async () => {
        if (name === '' || mothername === '' || email === '') {
            if (name === '') {
                setNameError(true);
            } else {
                setNameError(false);
            }

            if (mothername === '') {
                setMotherNameError(true);
            } else {
                setMotherNameError(false);
            }

            if (email === '') {
                setEmailError(true);
            } else {
                setEmailError(false);
            }
        }
        else {
            const docRef = db.collection('users').doc(ID);
            docRef.update({
                name: name,
                mothername: mothername,
                email: email,
            })
                .then(() => {
                    toast.show({
                        render: () => {
                            return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                Profile successfully updated!
                            </Box>;
                        },
                    });
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
            dispatch(updateUserData({ userID: ID, name: name, mothername: mothername, email: email }))
        }

    };
    const test = () => {
        console.log("ID is:", ID, "user data:", userData);
    }
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
                <FormControl isInvalid={nameError} w="100%" >
                    <Text marginRight="4" color="#560FC9">שם פרטי</Text>
                    <Input placeholder="לוק" backgroundColor="#F1E6FF" onChangeText={setName} value={name} />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Please Enter Name
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={motherNameError} w="100%" >
                    <Text marginRight="4" color="#560FC9">שם האם</Text>
                    <Input placeholder="מרי" backgroundColor="#F1E6FF" onChangeText={setMotherName} value={mothername} />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Please Enter Mother Name
                    </FormControl.ErrorMessage>
                </FormControl>
                <Text marginRight="4" color="#560FC9">אמייל(אופציונלי)</Text>
                <FormControl isInvalid={emailError} w="100%" >
                    <Input placeholder="nexaluscube@gmail.com" backgroundColor="#F1E6FF" onChangeText={setEmail} value={email} color="#1E0050" />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Please Enter Email
                    </FormControl.ErrorMessage>
                </FormControl>
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
                    שמירה
                </Button>
            </View>
        </>
    );
};
export default EditProfileScreen;
