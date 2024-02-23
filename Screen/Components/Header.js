/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Box,
  Pressable,
  Text,
  HStack,
  Menu,
  HamburgerIcon,
  CloseIcon,
  ArrowBackIcon,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
function MenuIcon() {
  const [isOpen, setIsOpen] = useState(true);

  // Function to toggle the menu state
  const toggleMenu = () => {
    console.log(!isOpen);
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(true);
  };
  const navigation = useNavigation();
  const handleNavigateToRegisterPatientScreen = () => {
    navigation.navigate('RegPatient');
  };
  const handleNavigateToTestimonialsScreen = () => {
    navigation.navigate('Testimonials');
  };
  const handleNavigateToAboutScreen = () => {
    navigation.navigate('About');
  };
  const handleNavigateToUserProfileScreen = () => {
    navigation.navigate('UserProfile');
  };

  return (
    <Box h="80%">
      <Menu
        shadow={2}
        w="190"
        onClose={handleClose}
        trigger={triggerProps => {
          return (
            <Pressable
              onPressOut={toggleMenu}
              accessibilityLabel="More options menu"
              {...triggerProps}>
              {isOpen ? (
                <HamburgerIcon size="6" color="white" />
              ) : (
                <CloseIcon size="6" color="white" />
              )}
            </Pressable>
          );
        }}>
        {/** Menu Items */}
        <Menu.Item onPress={handleNavigateToRegisterPatientScreen}>
          רישום חולה לתפילה
        </Menu.Item>
        <Menu.Item onPress={handleNavigateToUserProfileScreen}>
          נתוני תפילותיי ותרומותיי
        </Menu.Item>
        <Menu.Item onPress={handleNavigateToTestimonialsScreen}>
          עדויות של מחלימים
        </Menu.Item>
        <Menu.Item onPress={handleNavigateToAboutScreen}>
          מי אנחנו? צור קשר
        </Menu.Item>
        <Menu.Item onPress={() => setIsOpen(true)}>עריכת חשבון</Menu.Item>
        <Menu.Item onPress={() => setIsOpen(true)}>המלץ לחברים</Menu.Item>
        {/** Add more items as needed */}
      </Menu>
    </Box>
  );
}

export default () => {
  return (
    <Box>
      {/* <StatusBar bg="#3700B3" barStyle="light-content" />
            <Box safeAreaTop bg="violet.600" /> */}
      <HStack
        backgroundColor={'#560FC9'}
        px="3"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <MenuIcon />
        <Text color="white" fontSize={14}>
          סך הכל 1000 מתפללים
        </Text>
      </HStack>
    </Box>
  );
};
