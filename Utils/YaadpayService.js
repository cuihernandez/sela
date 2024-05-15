// yaadpayService.js

import axios from 'axios';

const API_BASE_URL = 'https://api.yaadpay.co.il'; // Replace with the actual YaadPay API base URL

export const createPayment = async paymentData => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments`, paymentData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_API_KEY`, // Replace with your YaadPay API key
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
