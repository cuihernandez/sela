import React from 'react';
import { Menu, HamburgerIcon, Box, Pressable, Text, NativeBaseProvider, StatusBar, HStack } from 'native-base';

function MenuIcon() {
    return <Box h="80%" w="90%" alignItems="flex-start">

        <Menu shadow={2} w="190" trigger={triggerProps => {
            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                <HamburgerIcon color={"white"} />
            </Pressable>;
        }}>
            <Menu.Item>Arial</Menu.Item>
            <Menu.Item>Nunito Sans</Menu.Item>
            <Menu.Item>Roboto</Menu.Item>
            <Menu.Item>Poppins</Menu.Item>
            <Menu.Item>SF Pro</Menu.Item>
            <Menu.Item>Helvetica</Menu.Item>
            <Menu.Item isDisabled>Sofia</Menu.Item>
            <Menu.Item>Cookie</Menu.Item>
        </Menu>
    </Box>;
}

export default () => {
    return (
        <NativeBaseProvider>
            <StatusBar bg="#3700B3" barStyle="light-content" />
            <Box safeAreaTop bg="violet.600" />
            <HStack backgroundColor={"purple.600"} alignItems="center" padding="2">
                <MenuIcon />
                <Text>סך הכל 1000 מתפללים</Text>
            </HStack>

        </NativeBaseProvider>
    );
};