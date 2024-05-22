/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Checkbox, View, Text} from 'native-base';

function DataComponent({name, onNavigate}) {
  return (
    <View
      margin="1"
      marginBottom="0"
      backgroundColor="white"
      flexDirection="row"
      padding="2"
      borderRadius={8}
      justifyContent="space-between">
      <Button
        backgroundColor="#560FC9"
        borderRadius="2xl"
        size="sm"
        onPress={onNavigate}>
        <Text color="white" fontSize="md" title="donate">
          לִתְרוֹם
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
  );
}

export default DataComponent;
