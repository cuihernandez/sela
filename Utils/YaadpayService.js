// yaadpayService.js

import axios from 'axios';

const API_BASE_URL = 'https://api.yaadpay.co.il'; // Replace with the actual YaadPay API base URL

export const createPayment = async ({
  clientName,
  clientLName,
  userId,
  email,
  phone,
  amount,
}) => {
  try {
    // const response = await axios.post(`${API_BASE_URL}/payments`, paymentData, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer YOUR_API_KEY`, // Replace with your YaadPay API key
    //   },
    // });
    const response = await axios.get(
      `https://icom.yaad.net/p/?action=APISign&What=SIGN&KEY=7110eda4d09e062aa5e4a390b0a572ac0d2c0220&PassP=yaad&Masof=0010131918&Order=12345678910&Info=test-api&Amount=${amount}&UTF8=True&UTF8out=True&UserId=${203269535}&street=levanon+3&city=netanya&zip=42361&phone=${
        phone || '098610338'
      }&cell=050555555555&Tash=2&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&Pritim=True&PageLang=ENG&tmp=1`,
    );

    // &SendHesh=True&heshDesc=[0~Item 1~1~8][0~Item 2~2~1]

    const data = response.data;
    console.log('PAYMENT_DATA: ', data);
    return {paymentUrl: `https://icom.yaad.net/p/?action=pay&${data}`};
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
