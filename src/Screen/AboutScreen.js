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
import BackButton from './Components/BackButton.js';

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
        <BackButton />
        <Box width={'100%'}>
          <Text
            color="white"
            style={{
              fontSize: 24,
            }}
            textAlign={'center'}
            lineHeight={30}>
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
                סלה הוקמה על מנת לאחד את השורות בעם ישראל ולקרב בין יהודים
                יקרים, כמו שנאמר על ישראל ערבים זה לזה וזה בזה.
              </Text>

              <Text color="#8F80A7">
                יצרנו דרך לקשר ולקרב בין אברכים שתורתם אומנותם וזקוקים לתמיכה
                כספית לאנשים שמבינים את הזכות הגדולה בתמיכה באברך ותמיכה בקיום
                ולימוד תורתנו הקדושה שבע"ה לא תישכח. באופן טבעי וללא תנאי מוקדם
                אברכים אלו מוקירים תודה עמוקה לתורמיהם ומתפללים להצלחתם
              </Text>

              <Text color="#8F80A7" marginTop={4}>
                כמו כן הוספנו לפלטפורמה אפשרות להתפלל על מי שזקוק לסייעתא דשמיא
                כגון: חולים, נשים הרות, מעוכבי זיווג, זקוקים לפרנסה וכל סיבה
                שבגינה מעוניין שיתפללו עליו.
              </Text>

              <Text color="#8F80A7" marginTop={4}>
                על כל תפילה שתתפללו, תינתן תרומה בשימכם שתועבר ע"י האדם שבעבורו
                התפללתם, כך יוצא למעשה שגם התורמים וגם המתפללים מקיימים מצוות
                מתן צדקה בסתר ובכל יום מתקיים בע"ה הפסוק מספר משלי "לֹא-יוֹעִיל
                הוֹן, בְּיוֹם עֶבְרָה; וּצְדָקָה, תַּצִּיל מִמָּוֶת".
              </Text>

              <Text color="#8F80A7" marginTop={4}>
                100% מהכספים שמתקבלים ניתנים לתרומה(לאחר עלויות סליקה וחיובי
                תשלום עפ"י חוק). תשלום עפ"י חוק).
              </Text>

              <Text color="#8F80A7" marginTop={4}>
                כוחנו באחדותנו!
              </Text>
            </View>
          </ScrollView>
        </View>
      </Box>
    </>
  );
};
export default AboutScreen;
