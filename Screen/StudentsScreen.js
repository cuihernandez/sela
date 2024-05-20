import {Button, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function StudentsScreen() {
  const [students, setStudents] = useState([
    {name: 'Bright', phone: '08021248576'},
  ]);

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

  return students.map(({name, phone}, i) => (
    <View
      key={i}
      margin="1"
      marginBottom="0"
      backgroundColor="white"
      flexDirection="row"
      padding="2"
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
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        marginRight={3}>
        <Text color="#8F80A7">{name}</Text>
      </View>
    </View>
  ));
}
