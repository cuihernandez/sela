import {SET_PATIENTS_DATA} from './types';

export const setPatients = data => {
  return {
    type: SET_PATIENTS_DATA,
    payload: data,
  };
};
