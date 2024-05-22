import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  CloseIcon,
  HStack,
  IconButton,
  Image,
  ScrollView,
  SearchIcon,
  Text,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from './Components/Header';
import {useNavigation} from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function StudentsScreen() {
  const [students, setStudents] = useState([]);
  const [previewImage, setPreviewImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };

  useEffect(() => {
    (async () => {
      try {
        // Reference to the collection
        const colRef = await firestore().collection('students'); // Replace 'collectionName' with your collection name

        // Get all documents from the collection
        const querySnapshot = await colRef.get();

        // Process and log each document
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} =>`, doc.data());
        });

        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStudents(docs);
      } catch (e) {
        console.error('Error fetching documents: ', e);
      }
    })();
  }, []);

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
        height={(screenHeight * 14) / 100}>
        <Box position={'absolute'} top={5}>
          <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
            <ArrowBackIcon color="white" size={4} marginLeft="2" />
          </TouchableOpacity>
        </Box>
        <Center width="100%" height="100">
          {/* <Image source={require('../Image/edit.png')} alt="edit image" /> */}
          <Text
            style={{
              color: 'white',
              fontSize: 26,
              textAlign: 'center',
            }}
            numberOfLines={1}>
            תלמידי חסות
          </Text>
        </Center>
        <Box />
      </HStack>
      <View
        backgroundColor="#F1E6FF"
        margin="3"
        borderRadius="20"
        style={{
          flex: 1,
          padding: 3,
        }}
        // height={(screenHeight * 55) / 100}
      >
        {/* <ScrollView>
          {students.map(({name, phone, photo}, i) => ( */}
        {students[currentIndex] ? (
          <View
            margin="1"
            marginBottom="0"
            backgroundColor="white"
            // flexDirection="row"
            borderRadius={10}
            justifyContent="space-between"
            style={{
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <Pressable
              style={{alignSelf: 'center'}}
              onPress={() => {
                setPreviewImage(prev => !prev);
              }}>
              <View
                style={{
                  borderRadius: 100,
                  width: 100,
                  height: 100,
                  overflow: 'hidden',
                  backgroundColor: '#560FC9',
                  borderColor: '#560FC9',
                  borderWidth: 2,
                  marginLeft: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {students[currentIndex]?.photo ? (
                  <>
                    <Image
                      source={{uri: students[currentIndex]?.photo}}
                      alt={students[currentIndex]?.name}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </>
                ) : (
                  <SearchIcon color="white" size={5} />
                )}
              </View>
            </Pressable>

            <View
              flexDirection="row"
              marginTop={30}
              justifyContent="space-between"
              alignItems="center"
              width={'100%'}
              marginRight={3}>
              {/* <Text color="#8F80A7">{name}</Text> */}
              <Button
                backgroundColor="#560FC9"
                borderRadius="2xl"
                size="sm"
                onPress={() =>
                  Linking.openURL(`tel:${students[currentIndex]?.phone}`)
                }>
                <Text color="white" fontSize="md" title="donate">
                  {students[currentIndex]?.phone}
                </Text>
              </Button>

              <View
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                marginRight={3}>
                <Text color="#8F80A7">{students[currentIndex]?.name}</Text>
              </View>
            </View>
          </View>
        ) : (
          <Center style={{marginTop: 30}}>
            <ActivityIndicator color={'#560FC9'} size={50} />
          </Center>
        )}
      </View>
      {previewImage && (
        <View
          style={{
            borderRadius: 20,
            position: 'absolute',
            height: screenHeight * 0.8,
            width: '96%',
            backgroundColor: '#560FC9',
            bottom: screenHeight * 0.1,
            zIndex: 20,
            overflow: 'hidden',
            borderColor: 'white',
            borderWidth: 2,
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <IconButton
            position={'absolute'}
            color={'red'}
            backgroundColor={'yellow'}
            zIndex={10}
            top={4}
            right={4}
            size={30}
            onPress={() => {
              setPreviewImage(false);
            }}>
            <CloseIcon />
          </IconButton>

          {students[currentIndex]?.photo ? (
            <Image
              width={400}
              height={screenHeight * 0.8}
              style={{objectFit: 'cover'}}
              source={{
                uri: students[currentIndex]?.photo,
              }}
              alt="screenshot"
            />
          ) : (
            <Center>
              <SearchIcon color="#560FC9" size={40} />
            </Center>
          )}
        </View>
      )}
      <Button
        onPress={() => {
          if (currentIndex < students.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            setCurrentIndex(0);
          }
        }}
        style={{
          width: screenWidth * 0.6,
          marginLeft: 'auto',
          borderRadius: 20,
          backgroundColor: '#560FC9',
          bottom: 20,
          right: 10,
        }}>
        <Text color={'white'}>הַבָּא</Text>
      </Button>
    </>
  );
}
