// yaadpayService.js

import axios from 'axios';
import {getSecretKey} from './storage';

export const createPayment = async ({userId, amount}) => {
  try {
    const apiKey = await getSecretKey('api_key');
    const masof = await getSecretKey('masof');

    const url = `https://icom.yaad.net/p/?action=APISign&What=SIGN&KEY=${'d436809aa701e136b5a671c58cf86709cd4ebc56'}&PassP=yaad.net&Masof=${'4501647632'}&Order=12345678910&Info=אישור-תרומה
&Amount=${amount}&UTF8=True&UTF8out=True&UserId=000000000&Tash=2&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&SendHesh=True&PageLang=HEB&tmp=1`;

    const response = await axios.get(url);

    const data = response.data;
    return {paymentUrl: `https://icom.yaad.net/p/?action=pay&${data}`};
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
