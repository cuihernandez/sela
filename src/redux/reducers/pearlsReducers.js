/* eslint-disable prettier/prettier */
import {SET_PEARLS_DATA} from '../actions/types';

const initialState = {
  pearlsData: [],
  currentIndex: 0,
};

const pearlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PEARLS_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default pearlsReducer;
