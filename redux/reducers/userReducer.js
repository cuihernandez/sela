/* eslint-disable prettier/prettier */
import { SET_USER_DATA, UPDATE_USER_DATA, UPDATE_NAME, UPDATE_MOTHER_NAME, UPDATE_EMAIL } from '../actions/types';

const initialState = {
    userID: '',
    name: '',
    mothername: '',
    email: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case UPDATE_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case UPDATE_MOTHER_NAME:
            return {
                ...state,
                mothername: action.payload,
            };
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
