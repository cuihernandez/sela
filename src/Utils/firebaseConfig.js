// import {initializeApp} from 'firebase/app';
// import 'firebase/analytics';
// import {getFirestore} from 'firebase/firestore';
// import {getAuth, initializeAuth} from 'firebase/auth';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyD1HUcvmYv6rpgCIJHfHoYEhXCgEIbnSFQ',
//   authDomain: 'sela-238dc.firebaseapp.com',
//   databaseURL: 'https://sela-238dc-default-rtdb.firebaseio.com',
//   projectId: 'sela-238dc',
//   storageBucket: 'sela-238dc.appspot.com',
//   messagingSenderId: '195049554939',
//   appId: '1:195049554939:web:d9b4503f81208b9924815e',
//   measurementId: 'G-8C1JGQ33JH',
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);

// export const auth = getAuth();

import {initializeApp, getApps} from 'firebase/app';
import 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {getAuth, initializeAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1HUcvmYv6rpgCIJHfHoYEhXCgEIbnSFQ',
  authDomain: 'sela-238dc.firebaseapp.com',
  databaseURL: 'https://sela-238dc-default-rtdb.firebaseio.com',
  projectId: 'sela-238dc',
  storageBucket: 'sela-238dc.appspot.com',
  messagingSenderId: '195049554939',
  appId: '1:195049554939:web:d9b4503f81208b9924815e',
  measurementId: 'G-8C1JGQ33JH',
};

// Check if any Firebase apps have been initialized, and initialize if not
if (!getApps().length) {
  console.log('APPS_LENGTH: ', getApps().length);
  initializeApp(firebaseConfig);
}

// Get the initialized app instance
const app = getApps()[0];

export const firestore = getFirestore(app);

export const auth = getAuth();
