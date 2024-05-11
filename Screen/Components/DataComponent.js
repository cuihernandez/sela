/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Checkbox, View, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

function DataComponent(props) {
  const navigation = useNavigation();

  return (
    <View
      margin="1"
      marginBottom="0"
      backgroundColor="white"
      flexDirection="row"
      padding="2"
      justifyContent="space-between">
      <View flexDirection="row" justifyContent="flex-end" alignItems="center">
        <Text color="#8F80A7">יעקב בנימין</Text>
      </View>
      <Button
        onPress={() =>
          navigation.navigate('RegPatient', {
            name: props.name,
            motherName: props.motherName,
          })
        }
        backgroundColor="#560FC9"
        borderRadius="2xl"
        size="sm">
        <Text color="white" fontSize="md" title="donate">
          {props.name}
        </Text>
      </Button>
    </View>
  );
}

export default DataComponent;
