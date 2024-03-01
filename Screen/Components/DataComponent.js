/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Button,
  Checkbox,
  View,
  Text,
} from 'native-base';

function DataComponent(props) {
  return (
    <View margin="1" marginBottom="0" backgroundColor="white" flexDirection="row" padding="2" justifyContent="space-between">
      <Button backgroundColor="#560FC9"
        borderRadius="2xl"
        size="sm">
        <Text color="white" fontSize="md" title="donate">{props.name}</Text>
      </Button>
      <View flexDirection="row" justifyContent="flex-end" alignItems="center">
        <Text color="#8F80A7">יעקב בנימין</Text>
        <Checkbox borderRadius="5" margin="2" accessibilityLabel="This is  checkbox" />
      </View>
    </View>
  );
}


export default DataComponent;
