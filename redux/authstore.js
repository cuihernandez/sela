import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/auth';

const authStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default authStore;
