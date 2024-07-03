import {SET_STUDENTS_DATA} from './types';

export const setStudents = data => {
  return {
    type: SET_STUDENTS_DATA,
    payload: data,
  };
};
