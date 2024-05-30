import {SET_PSALMS_DATA} from './types';

export const setPsalms = array => {
  return {
    type: SET_PSALMS_DATA,
    payload: array,
  };
};
