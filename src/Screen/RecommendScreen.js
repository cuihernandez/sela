/* eslint-disable prettier/prettier */
import React from 'react';
import {Alert, Dimensions, Share, TouchableOpacity} from 'react-native';
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Center,
  HStack,
  Image,
  Link,
  View,
  Text,
  Button,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Header from './Components/Header.js';
import avatar_facebook from '../Image/logos_facebook.png';
import avatar_twitter from '../Image/logos_twitter.png';
import avatar_whatsapp from '../Image/logos_whatsapp.png';
import avatar_instagram from '../Image/logos_instagram.png';
import avatar_gmail from '../Image/logos_gmail.png';
import icon_copy from '../Image/icon_copy.png';
import BackButton from './Components/BackButton.js';
import {G, Path, Svg} from 'react-native-svg';

const shareOptions = async (url, message) => {
  try {
    const result = await Share.share({
      message: `${message} ${url}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type of: ', result.activityType);
      } else {
        console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Dismissed');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An error occurred while trying to share.');
  }
};

const RecommendScreen = () => {
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };

  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        alignItems="center"
        p={4}
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}>
        <BackButton />
        <Box
          style={{
            marginHorizontal: 'auto',
            width: '100%',
          }}>
          <Text
            textAlign={'center'}
            color="white"
            style={{
              fontSize: 24,
              lineHeight: 30,
            }}
            px="3"
            marginTop={'5'}>
            המלץ לחברים
          </Text>
        </Box>
      </HStack>

      <Box flex={1} alignItems="center">
        <View margin="10" padding="5">
          <Button
            onPress={() =>
              shareOptions(
                'https://play.google.com/store/apps/details?id=com.usesela',
                'אפליקציית סלה מאפשרת לקרוא תהילים בעבור מי שצריך ולתמוך באברך',
              )
            }
            style={{backgroundColor: '#1E005032', borderRadius: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 40, height: 40}}>
                <Svg class="kOqhQd" aria-hidden="true" viewBox="0 0 40 40">
                  <Path fill="none" d="M0,0h40v40H0V0z" />
                  <G>
                    <Path
                      d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z"
                      fill="#EA4335"
                    />
                    <Path
                      d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z"
                      fill="#FBBC04"
                    />
                    <Path
                      d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z"
                      fill="#4285F4"
                    />
                    <Path
                      d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z"
                      fill="#34A853"
                    />
                  </G>
                </Svg>
              </View>
              <Text color="#1E0050" marginRight="4" marginLeft="4">
                www.hebrewsparys.co
              </Text>
              <Image source={icon_copy} alt="copy" />
            </View>
          </Button>

          <Button
            onPress={() =>
              shareOptions(
                'https://apps.apple.com/app/sela/id6504740006',
                'אפליקציית סלה מאפשרת לקרוא תהילים בעבור מי שצריך ולתמוך באברך',
              )
            }
            style={{
              backgroundColor: '#1E005032',
              borderRadius: 20,
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 40, height: 40}}>
                <Svg
                  viewBox="0 0 256 315"
                  version="1.1"
                  preserveAspectRatio="xMidYMid">
                  <G>
                    <Path
                      d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"
                      fill="#000000"
                    />
                  </G>
                </Svg>
              </View>
              <Text color="#1E0050" marginRight="4" marginLeft="4">
                www.hebrewsparys.co
              </Text>
              <Image source={icon_copy} alt="copy" />
            </View>
          </Button>
        </View>
        <HStack justifyContent="center" space={2}>
          <Link href="https://mail.google.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_gmail} alt="avatar_gmail" />
            </Avatar>
          </Link>
          <Link href="https://www.facebook.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_facebook} alt="avatar_facebook" />
            </Avatar>
          </Link>
          <Link href="https://twitter.com">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_twitter} alt="avatar_twitter" />
            </Avatar>
          </Link>
          <Link href="https://www.whatsapp.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_whatsapp} alt="avatar_whatsapp" />
            </Avatar>
          </Link>
          <Link href="https://instagram.google.com/">
            <Avatar bg="#F1E6FF">
              <Image source={avatar_instagram} alt="avatar_instagram" />
            </Avatar>
          </Link>
        </HStack>
      </Box>
    </>
  );
};
export default RecommendScreen;
