// PaymentScreen.js

import React, {useState} from 'react';
import {View, Button, TextInput, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {createPayment} from './yaadpayService';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    const paymentData = {
      amount,
      currency: 'ILS',
      description: 'Test Payment',
      redirectUrl: 'your-app://payment-success', // Replace with your app's redirect URL
    };

    try {
      const response = await createPayment(paymentData);
      setPaymentUrl(response.paymentUrl);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
      {paymentUrl ? (
        <WebView source={{uri: paymentUrl}} style={{flex: 1}} />
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
