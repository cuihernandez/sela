import React, { useState } from 'react';
import { Box, Pressable, Text, NativeBaseProvider, StatusBar, HStack, Menu, HamburgerIcon, CloseIcon, ArrowBackIcon, Flex, VStack, Icon } from 'native-base';

function MenuIcon() {
    const [isOpen, setIsOpen] = useState(true);

    // Function to toggle the menu state
    const toggleMenu = () => {
        console.log(!isOpen);
        setIsOpen(!isOpen)
    };

    const handleClose = () => {
        setIsOpen(true);
    }

    return (
        <Box h="80%">
            <Menu shadow={2} w="190" onClose={handleClose} trigger={triggerProps => {
                return (
                    <Pressable onPressOut={toggleMenu} accessibilityLabel="More options menu" {...triggerProps}>
                        {isOpen ? (
                            <HamburgerIcon size="6" color="white" />
                        ) : (
                            <CloseIcon size="6" color="white" />
                        )}
                    </Pressable>
                );
            }}>
                {/** Menu Items */}
                <Menu.Item onPress={() => setIsOpen(true)}>רישום חולה לתפילה</Menu.Item>
                <Menu.Item onPress={() => setIsOpen(true)}>נתוני תפילותיי ותרומותיי</Menu.Item>
                <Menu.Item onPress={() => setIsOpen(true)}>עדויות של מחלימים</Menu.Item>
                <Menu.Item onPress={() => setIsOpen(true)}>מי אנחנו? צור קשר</Menu.Item>
                <Menu.Item onPress={() => setIsOpen(true)}>עריכת חשבון</Menu.Item>
                <Menu.Item onPress={() => setIsOpen(true)}>המלץ לחברים</Menu.Item>
                {/** Add more items as needed */}
            </Menu>
        </Box>
    );
}

export default () => {
    return (
        <NativeBaseProvider>
            <StatusBar bg="#3700B3" barStyle="light-content" />
            <Box safeAreaTop bg="violet.600" />
            <VStack backgroundColor={"#560FC9"} borderBottomRadius={"40"} height={"1/6"}>
                <HStack px="3" py="3" justifyContent="space-between" alignItems="center" w="100%" >
                    <MenuIcon />
                    <Text color="white" >סך הכל 1000 מתפללים</Text>
                </HStack>
                <Flex px="3" py="3" w="100%" alignItems="center" p={4} direction="row" justifyContent="space-between">
                    <ArrowBackIcon color='white' size={6} />
                    <Text color="white" alignItems={'center'} fontSize={"lg"} width="1/2" px="3" marginTop={"5"}>מומלץ לקרוא בדיבור:</Text>
                    <HStack />
                </Flex>
            </VStack>
        </NativeBaseProvider>
    );
};
