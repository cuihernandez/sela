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
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  Dimensions,
  Linking,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from './Components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from './Components/BackButton';
import {setStudents} from '../redux/actions/studentsAction';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function StudentsScreen() {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const userID = useSelector(state => state.user.userID);
  const [currentIndex, setCurrentIndex] = useState(null);

  const dispatch = useDispatch();

  const [studentsCount, setStudentsCount] = useState(null);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const navigation = useNavigation();
  const handleNavigateToFrame1Screen = () => {
    navigation.navigate('Frame1');
  };

  const updateInView = async (studentId, inView) => {
    if (!studentId) {
      return;
    }
    try {
      await firestore().collection('students').doc(studentId).update({
        inView: inView,
      });
    } catch (e) {
      console.error('Error updating student document: ', e);
    }
  };

  const getLastViewedIndex = async () => {
    try {
      const doc = await firestore()
        .collection('LastViewedUserIndex')
        .doc('lastStudentIndex')
        .get();
      if (doc.exists) {
        const index = doc.data().index;
        setCurrentIndex(index);
        return index;
      }
      return 0;
    } catch (error) {
      console.error('Failed to fetch last viewed index:', error);
      return 0;
    }
  };

  const updateLastViewedIndex = async index => {
    try {
      await firestore()
        .collection('LastViewedUserIndex')
        .doc('lastStudentIndex')
        .set({
          index,
        });
    } catch (error) {
      console.error('Failed to update last viewed index:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchStudentBySponsor = async () => {
        try {
          const colRef = firestore().collection('students');
          const querySnapshot = await colRef
            .where('sponsor', '==', userID)
            .get();

          if (!querySnapshot.empty) {
            const docs = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));

            setStudent(docs[0]);
            if (docs.length > 0) {
              updateInView(docs[0].id, true);
            }
          } else {
            await fetchEligibleStudents();
          }
        } catch (e) {
          console.error('Error fetching documents: ', e);
        }
      };

      const fetchEligibleStudents = async () => {
        try {
          const colRef = firestore().collection('students');
          const querySnapshot = await colRef
            .where('inView', 'in', [false, null])
            .where('sponsor', 'in', [null, ''])
            .orderBy('createdAt', 'asc')
            // .limit(1) // Limit to 10 to avoid too many documents
            .get();

          if (querySnapshot.empty) {
          } else {
            const lastIndex = await getLastViewedIndex();
            const doc = querySnapshot.docs[lastIndex] || querySnapshot.docs[0];

            if (!doc) return;

            const studentData = {id: doc?.id, ...doc?.data()};

            setStudentsCount(querySnapshot.docs.length);
            setStudent(studentData);
            updateLastViewedIndex(
              lastIndex <= studentsCount - 1 ? lastIndex + 1 : 0,
            );
            updateInView(studentData?.id, true);
          }
        } catch (e) {
          console.error('Error fetching document: ', e);
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
    }, [userID]),
  );
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (student) {
          updateInView(student.id, false);
        }
      };
    }, [student]),
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('🔥🔥🔥🔥App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('🔥🔥🔥🔥AppState', appState.current);
    });

    return () => {
      console.log('🔥🔥🔥🔥REMOVE_SUBSCRIPTION');
      if (student) {
        updateInView(student.id, false);
      }
      subscription.remove();
    };
  }, []);

  const updateStudentSponsor = async studentId => {
    try {
      await firestore().collection('students').doc(studentId).update({
        sponsor: userID,
      });
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
        <View style={{marginVertical: 20, width: '80%', alignSelf: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            פרטי האברך נבדקו ואומתו, נא ליצור קשר ישירות על מנת לקבל מס חשבון
            בנק (סכום מומלץ 700-1000 ₪ לחודש)
          </Text>
        </View>
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
              אין נתוני אברכים כרגע
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
