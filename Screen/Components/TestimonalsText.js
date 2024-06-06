/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image} from 'native-base';

function TestimonalsText(props) {
  return (
    <View
      borderRadius="30"
      backgroundColor="#F1E6FF"
      marginLeft={10}
      marginRight={10}
      marginTop={10}>
      <Image
        marginLeft={2}
        source={require('../../Image/bi_quote.png')}
        resizeMode="cover"
        alt="quote"
      />
      <View
        borderRadius="30"
        backgroundColor="#F1E6FF"
        marginLeft="2"
        marginRight="2"
        marginBottom="2"
        paddingLeft="2"
        paddingRight="2"
        paddingBottom="3">
        <Text color="#560FC9" fontSize="16" marginBottom={1}>
          פרטים
        </Text>
        <Text color="#8F80A7">{props.text}</Text>
        <Text color="#560FC9" fontSize="16" marginRight="3">
          {props.name}
        </Text>
      </View>
    </View>
  );
}

export default TestimonalsText;
