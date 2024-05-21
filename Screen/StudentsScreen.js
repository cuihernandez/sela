import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  SearchIcon,
  Text,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions, Linking, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from './Components/Header';
import {useNavigation} from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

export default function StudentsScreen() {
  const [students, setStudents] = useState([
    {name: 'Bright', phone: '08021248576'},
  ]);

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
        <Box>
          <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
            <ArrowBackIcon color="white" size={4} marginLeft="2" />
          </TouchableOpacity>
        </Box>
        <Center width="100" height="100">
          {/* <Image source={require('../Image/edit.png')} alt="edit image" /> */}
          <Text
            style={{
              color: 'white',
              fontSize: 26,
            }}>
            תלמידים
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
        <ScrollView>
          {students.map(({name, phone, photo}, i) => (
            <View
              key={i}
              margin="1"
              marginBottom="0"
              backgroundColor="white"
              flexDirection="row"
              padding="2"
              borderRadius={10}
              justifyContent="space-between">
              <Button
                backgroundColor="#560FC9"
                borderRadius="2xl"
                size="sm"
                onPress={() => Linking.openURL(`tel:${phone}`)}>
                <Text color="white" fontSize="md" title="donate">
                  {phone}
                </Text>
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  marginRight={3}>
                  <Text color="#8F80A7">{name}</Text>
                </View>
                <View
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  marginRight={3}>
                  {/* <Text color="#8F80A7">{name}</Text> */}

                  <View
                    style={{
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                      overflow: 'hidden',
                      backgroundColor: '#560FC9',
                      marginLeft: 'auto',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {photo ? (
                      <Image
                        source={{uri: photo}}
                        alt={name}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    ) : (
                      <SearchIcon color="white" size={5} />
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
