import {React, useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const SplashScreen = () => {
  //State for AcitivityIndicator animation

  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        ),
      );
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/splash_screen.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.centeredContent}>
        <Image source={require('../Image/splash_icon.png')} style={styles.icon} />
        <Text style={styles.text}>סֶלָה</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    color:'#ffff00',
  },
});

export default SplashScreen;
