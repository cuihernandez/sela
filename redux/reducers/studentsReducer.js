/* eslint-disable prettier/prettier */
import {SET_STUDENTS_DATA} from '../actions/types';

const initialState = {
  students: [],
  studentsCount: undefined,
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default studentsReducer;
