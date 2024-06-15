import {TouchableOpacity} from 'react-native';
import React from 'react';
import {ArrowForwardIcon, Box} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function BackButton({action, ...boxProps}) {
  const navigation = useNavigation();

  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };

  return (
    <Box position={'absolute'} zIndex={10} left={6} {...boxProps}>
      <TouchableOpacity
        onPress={() => action?.() || handleNavigateToFrame1Screen()}>
        <ArrowForwardIcon color="white" size={4} />
      </TouchableOpacity>
    </Box>
  );
}
