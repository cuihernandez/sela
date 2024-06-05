// yaadpayService.js

import axios from 'axios';

export const createPayment = async ({userId, amount}) => {
  try {
    const url = `https://icom.yaad.net/p/?action=APISign&What=SIGN&KEY=7110eda4d09e062aa5e4a390b0a572ac0d2c0220&PassP=yaad&Masof=0010131918&Order=12345678910&Info=test-api&Amount=${amount}&UTF8=True&UTF8out=True&UserId=000000000&Tash=2&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&SendHesh=True&PageLang=HEB&tmp=1`;

    const response = await axios.get(url);

    const data = response.data;
    console.log('PAYMENT_DATA: ', data);
    return {paymentUrl: `https://icom.yaad.net/p/?action=pay&${data}`};
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
