// PaymentScreen.js

import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {createPayment} from '../Utils/YaadpayService';
import {Button, Spinner, Text} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';

// 4557430402053712
// 06/26
// 887
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PaymentScreen = () => {
  const webViewRef = useRef();
  jsCode =
    "window.waitForBridge = function(fn) { return (window.postMessage.length === 1) ? fn() : setTimeout(function() { window.waitForBridge(fn) }, 5) }; window.waitForBridge(function() { window.postMessage(document.querySelector('body').textContent) });";

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [payment, setPayment] = useState({complete: false});
  const route = useRoute();
  const navigation = useNavigation();

  const paymentUrl = route.params.paymentUrl;
  // const paymentUrl =
  //   'https://icom.yaad.net/p/?Amount=10&ClientLName=Isareli&ClientName=Israel&Coin=1&FixTash=False&Info=test-api&J5=False&Masof=0010131918&MoreData=True&Order=12345678910&PageLang=HEB&Postpone=False&Pritim=True&SendHesh=True&ShowEngTashText=False&Sign=True&Tash=2&UTF8=True&UTF8out=True&UserId=203269535&action=pay&cell=050555555555&city=netanya&email=test%40yaad.net&heshDesc=%5B0~Item%201~1~8%5D%5B0~Item%202~2~1%5D&phone=098610338&sendemail=True&street=levanon%203&tmp=1&zip=42361&signature=908f05b9905e64bed97f3fbdb800151cb175069b5053bfda55d48d716db441c8';

  useEffect(() => {
    console.log({paymentUrl});
  }, [paymentUrl]);

  useEffect(() => {
    if (currentUrl.includes('thankYouPage'))
      setPayment(prev => ({...prev, complete: true}));
  }, [currentUrl]);

  const handlePayment = async () => {
    const paymentData = {
      amount,
      currency: 'ILS',
      description: 'Test Payment',
      redirectUrl: 'your-app://payment-success', // Replace with your app's redirect URL
    };

    try {
      const response = await createPayment(paymentData);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            zIndex: 10,
            alignSelf: 'center',
          }}>
          <Spinner color={'primary'} size={'lg'} />
        </View>
      )}
      {payment.complete && (
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            alignSelf: 'center',
            zIndex: 20,
          }}>
          <Button
            backgroundColor="#560FC9"
            onPress={() => {
              navigation.navigate('RegPatient', {paymentStatus: 'success'});
            }}
            style={{
              paddingHorizontal: 40,
              paddingVertical: 7,
              height: (screenHeight * 5) / 100,
              borderRadius: (screenWidth * 4) / 100, // 1.5% of screen width
              margin: (screenWidth * 0.75) / 100, // 0.75% of screen width
              width: screenWidth * 0.75,
              // padding: (screenWidth * 0.75) / 100, // 0.75% of screen width
            }}>
            <Text color="white" fontWeight={'semibold'}>
              Continue
            </Text>
          </Button>
        </View>
      )}
      {paymentUrl ? (
        <WebView
          source={{uri: paymentUrl}}
          style={{flex: 1}}
          javaScriptEnabled={true}
          injectedJavaScript={jsCode}
          onLoadEnd={() => setLoading(false)}
          onMessage={event => console.log('Received: ', event.nativeEvent.data)}
          ref={webViewRef}
          startInLoadingState={true}
          domStorageEnabled={true}
          onLoadProgress={({nativeEvent}) => {
            //your code goes here
          }}
          onNavigationStateChange={state => {
            //your code goes here
            console.log('URL: ', state.url);
            setCurrentUrl(state.url);
          }}
        />
      ) : (
        <>
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={{borderBottomWidth: 1, marginBottom: 20}}
          />
          <Button title="Pay" onPress={handlePayment} />
        </>
      )}
    </View>
  );
};

export default PaymentScreen;

// https://icom.yaad.net/p/?action=pay&Amount=2121&ClientLName=Bright%20Kingsley&ClientName=Bright%20Kingsley&Coin=1&FixTash=False&Info=test-api&J5=False&Masof=0010131918&MoreData=True&Order=12345678910&PageLang=HEB&Postpone=False&Pritim=True&SendHesh=True&ShowEngTashText=False&Sign=True&Tash=2&UTF8=True&UTF8out=True&UserId=203269535&action=pay&cell=050555555555&city=netanya&email=briggskvngzz%40gmail.com&heshDesc=%5B0~Item%201~1~8%5D%5B0~Item%202~2~1%5D&phone=098610338&sendemail=True&street=levanon%203&tmp=1&zip=42361&signature=8cef43e5f7c04a7a92adfcd9486341c69a2fcc90d2828e4e6f4d40d09fa2070a
