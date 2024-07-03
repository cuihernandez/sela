/* eslint-disable prettier/prettier */
import {SET_PATIENTS_DATA} from '../actions/types';

const initialState = {
  patients: [],
  patientsCount: undefined,
};

const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PATIENTS_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default patientsReducer;
