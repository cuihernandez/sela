import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  CloseIcon,
  HStack,
  IconButton,
  Image,
  SearchIcon,
  Text,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from './Components/Header';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BackButton from './Components/BackButton';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function StudentsScreen() {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const userID = useSelector(state => state.user.userID);

  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };
  useEffect(() => {
    const fetchStudentBySponsor = async () => {
      try {
        const colRef = firestore().collection('students');
        const querySnapshot = await colRef.where('sponsor', '==', userID).get();

        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log('SPONSORED STUDENT: ', docs);
          setStudent(docs[0]);
          if (docs.length > 0) {
            console.log('NO_DOCS');
            updateInView(docs[0].id, true);
          }
        } else {
          await fetchFirstEligibleStudent();
        }
      } catch (e) {
        console.error('Error fetching documents: ', e);
      }
    };

    const fetchFirstEligibleStudent = async () => {
      try {
        const colRef = firestore().collection('students');
        const querySnapshot = await colRef
          .where('inView', 'in', [false, null])
          .where('sponsor', 'in', [null, ''])
          .limit(1) // Limit to 10 to avoid too many documents
          .get();

        if (querySnapshot.empty) {
          console.log('No eligible student found');
        } else {
          const doc = querySnapshot.docs[0];
          const studentData = {id: doc.id, ...doc.data()};
          setStudent(studentData);
          updateInView(studentData.id, true);
        }
      } catch (e) {
        console.error('Error fetching document: ', e);
      }
    };

    const updateInView = async (studentId, inView) => {
      try {
        await firestore().collection('students').doc(studentId).update({
          inView: inView,
        });
        console.log(`Student ${studentId} updated with inView: ${inView}`);
      } catch (e) {
        console.error('Error updating student document: ', e);
      }
    };

    (async () => {
      setLoading(true);
      try {
        await fetchStudentBySponsor();
      } catch (error) {
        console.error({error});
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      if (student) {
        console.log({student});
        updateInView(student.id, false);
      }
    };
  }, [userID, student?.id]);

  const updateStudentSponsor = async studentId => {
    try {
      await firestore().collection('students').doc(studentId).update({
        sponsor: userID,
      });
      console.log(`Student ${studentId} updated with sponsor ${userID}`);
      setStudent(prev => ({...prev, sponsor: userID}));
      Alert.alert(`Student ${student?.name} updated with sponsor`);
    } catch (e) {
      console.error('Error updating student document: ', e);
    }
  };

  return (
    <>
      <Header />
      <HStack
        px="3"
        py="3"
        w="100%"
        p={4}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        backgroundColor={'#560FC9'}
        borderBottomRadius={'40'}
        height={(screenHeight * 14) / 100}>
        <BackButton marginTop={5} left={4} />
        <Center width="100%" height="100">
          <Text
            style={{
              color: 'white',
              fontSize: 24,
            }}
            numberOfLines={1}>
            פרטי אברך
          </Text>
        </Center>
        <Box />
      </HStack>
      <View
        backgroundColor="#F1E6FF"
        margin="3"
        borderRadius="20"
        style={{
          flex: 1,
          padding: 3,
        }}>
        {loading ? (
          <Center style={{marginTop: 30}}>
            <ActivityIndicator color={'#560FC9'} size={50} />
          </Center>
        ) : student ? (
          <View
            margin="1"
            marginBottom="0"
            backgroundColor="white"
            borderRadius={10}
            justifyContent="space-between"
            style={{
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <View style={{marginVertical: 10}}>
              <Text style={{textAlign: 'center'}}>
                פרטי האברך נבדקו ואומתו, נא ליצור קשר ישירות על מנת לקבל מס
                חשבון בנק (סכום מומלץ 700-1000 ₪ לחודש)
              </Text>
            </View>
            <Pressable
              style={{alignSelf: 'center'}}
              onPress={() => {
                setPreviewImage(prev => !prev);
              }}>
              <View
                style={{
                  borderRadius: 100,
                  width: 100,
                  height: 100,
                  overflow: 'hidden',
                  backgroundColor: '#560FC9',
                  borderColor: '#560FC9',
                  borderWidth: 2,
                  marginLeft: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {student?.photo ? (
                  <>
                    <Image
                      source={{uri: student?.photo}}
                      alt={student?.name}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </>
                ) : (
                  <SearchIcon color="white" size={5} />
                )}
              </View>
            </Pressable>

            <View
              flexDirection="row"
              marginTop={30}
              justifyContent="space-between"
              alignItems="center"
              width={'100%'}
              marginRight={3}>
              {/* <Text color="#8F80A7">{name}</Text> */}
              <Button
                backgroundColor="#560FC9"
                borderRadius="2xl"
                size="sm"
                onPress={() => Linking.openURL(`tel:${student?.phone}`)}>
                <Text color="white" fontSize="md" title="donate">
                  {student?.phone}
                </Text>
              </Button>

              <View
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                marginRight={3}>
                <Text color="#8F80A7">{student?.name}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{marginTop: 40}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              אין נתוני תלמידים זמינים
            </Text>
          </View>
        )}
      </View>
      {previewImage && (
        <View
          style={{
            borderRadius: 20,
            position: 'absolute',
            height: screenHeight * 0.8,
            width: '96%',
            backgroundColor: '#560FC9',
            bottom: screenHeight * 0.1,
            zIndex: 20,
            overflow: 'hidden',
            borderColor: 'white',
            borderWidth: 2,
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <IconButton
            position={'absolute'}
            zIndex={10}
            top={4}
            right={4}
            size={30}
            onPress={() => {
              setPreviewImage(false);
            }}>
            <CloseIcon />
          </IconButton>

          {student?.photo ? (
            <Image
              width={400}
              height={screenHeight * 0.8}
              style={{objectFit: 'cover'}}
              source={{
                uri: student?.photo,
              }}
              alt="screenshot"
            />
          ) : (
            <Center>
              <SearchIcon color="#560FC9" size={40} />
            </Center>
          )}
        </View>
      )}
      {student && !loading && student?.sponsor !== userID && (
        <Button
          disabled={!student}
          onPress={() => {
            updateStudentSponsor(student?.id);
          }}
          style={{
            width: screenWidth * 0.9,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: '#560FC9',
            bottom: 20,
          }}>
          <Text fontSize={14} color={'white'} numberOfLines={1}>
            ברצוני לתמוך באברך
          </Text>
        </Button>
      )}
    </>
  );
}
