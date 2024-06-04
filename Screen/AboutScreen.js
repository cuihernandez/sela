/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ArrowBackIcon,
  Box,
  HStack,
  Image,
  View,
  Text,
  ScrollView,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Header from './Components/Header.js';
import {useNavigation} from '@react-navigation/native';

const AboutScreen = () => {
  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        alignItems="center"
        p={4}
        direction="row"
        justifyContent="space-between"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}>
        <Box position={'absolute'} right={6}>
          <TouchableOpacity onPress={handleNavigateToFrame1Screen}>
            <ArrowBackIcon color="white" size={4} marginLeft="2" />
          </TouchableOpacity>
        </Box>
        <Box width={'100%'}>
          <Text
            color="white"
            fontSize={'lg'}
            textAlign={'center'}
            px="3"
            marginTop={'5'}>
            עלינו
          </Text>
        </Box>
      </HStack>
      <Box flex={1} alignItems="center">
        <View>
          <Image
            source={require('../Image/logo.png')}
            marginTop={3}
            alt="logo"
            width={100}
            height={100}
          />
        </View>

        <View flex={1}>
          <ScrollView>
            <View margin="3" padding="5">
              <Text color="#8F80A7">
                סלה הוקמה על מנת לאחד את השורות בעם ישראל ולקרב לבבות בין יהודים
                יקרים, כמו שנאמר כל ישראל ערבים זה בזה וזה לזה.
              </Text>
              <Text color="#8F80A7" marginTop={4}>
                יצרנו פלטפורמה שמאפשרת לאנשים להתפלל על חולים ובמקביל לתרום כסף
                לנזקקים וכך יוצא למעשה שגם התורמים שמעוניינים שיתפללו על יקיריהם
                וגם המתפללים מקיימים מצוות מתן צדקה בכל יום ובע"ה מתקיים המאמר
                "צדקה תציל ממות".
              </Text>
              <Text color="#8F80A7" marginTop={4}>
                על כל תפילה שמתפללים עוברת צדקה לנזקקים וראוי לציין ש 100% מהכסף
                שנתרם ומתקבל ממתפללי סלה יינתן לתרומה (לאחר עלויות סליקה
                ורשויות).
              </Text>
              <Text color="#8F80A7" marginTop={4}>
                במקביל יצרנו דרך לקשר ולקרב לבבות בין אברכים שעוסקים בתורה
                כאומנותם וזקוקים לתמיכה כספית לאנשים שמבינים את הזכות הגדולה
                בתמיכה באברך ותמיכה בלימוד תורתנו הקדושה. באופן טבעי וללא תנאי
                מוקדם מסתבר שאברכים אלו מוקירים תודה עמוקה ומתפללים בכל יום
                להצלחת האנשים שתומכים בהם.{' '}
              </Text>
              <Text color="#8F80A7" marginTop={4}>
                "כוחנו באחדותנו"{' '}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Box>
    </>
  );
};
export default AboutScreen;
