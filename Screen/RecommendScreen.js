/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions } from 'react-native';
import { ArrowBackIcon, Avatar, Box, Center, HStack, Image, Link, View, Text } from 'native-base';
import Header from './Components/Header.js';
import avatar_facebook from '../Image/logos_facebook.png';
import avatar_twitter from '../Image/logos_twitter.png';
import avatar_whatsapp from '../Image/logos_whatsapp.png';
import avatar_instagram from '../Image/logos_instagram.png';
import avatar_gmail from '../Image/logos_gmail.png';
import dot from '../Image/dot.png';
import icon_copy from '../Image/icon_copy.png';
const RecommendScreen = () => {
    const screenHeight = Dimensions.get('window').height;
    return (
        <>
            <Header />
            <HStack
                px="3"
                py="3"
                w="100%"
                alignItems="flex-start"
                p={4}
                direction="row"
                justifyContent="space-between"
                backgroundColor={'#560FC9'}
                borderBottomRadius={'40'}
                height={(screenHeight * 12) / 100}>
                <ArrowBackIcon color="white" size={4} marginLeft="1" />
                <Center>
                    <Text
                        color="white"
                        alignItems={'center'}
                        fontSize={'lg'}
                        px="3"
                        marginTop={'5'}>
                        המלץ לחברים
                    </Text>
                </Center>
                <Box />
            </HStack>
            <Box flex={1} alignItems="center">
                <View margin="10" padding="5">
                    <Link href="https://docs.nativebase.io/link" alignItems="center" justifyContent="space-around" backgroundColor="#F1E6FF">
                        <Text color="#1E0050" marginRight="4" marginLeft="4">www.hebrewsparys.co</Text>
                        <Image source={icon_copy} />
                    </Link>
                </View>
                <HStack justifyContent="center" space={2}>
                    <Avatar bg="#F1E6FF">
                        <Image source={avatar_gmail} alt="avatar_gmail" />
                    </Avatar>
                    <Avatar bg="#F1E6FF">
                        <Image source={avatar_facebook} alt="avatar_facebook" />
                    </Avatar>
                    <Avatar bg="#F1E6FF">
                        <Image source={avatar_twitter} alt="avatar_twitter" />
                    </Avatar>
                    <Avatar bg="#F1E6FF">
                        <Image source={avatar_whatsapp} alt="avatar_whatsapp" />
                    </Avatar>
                    <Avatar bg="#F1E6FF">
                        <Image source={avatar_instagram} alt="avatar_instagram" />
                    </Avatar>
                    <Avatar bg="rgba(0, 0, 0, 0)">
                        <Image source={dot} />
                    </Avatar>
                </HStack>
            </Box>

            <View alignItems="center" justifyContent="center" marginBottom="4">
                <Text color="#D6B7FF" margin="3">תנאי שירות</Text>
            </View>
        </>
    );
};
export default RecommendScreen;
