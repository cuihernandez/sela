// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUserId: state => {
      state.userId = null;
    },
  },
});

export const {setUserId, clearUserId} = userSlice.actions;

export const loginUser = userId => async dispatch => {
  try {
    // await AsyncStorage.setItem('userId', userId);
    dispatch(setUserId(userId));
  } catch (error) {
    console.error('Failed to save userId to storage:', error);
  }
};

export const loadUser = () => async dispatch => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      dispatch(setUserId(userId));
    }
  } catch (error) {
    console.error('Failed to load userId from storage:', error);
  }
};

export default userSlice.reducer;
