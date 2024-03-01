/* eslint-disable prettier/prettier */

import { SET_USER_DATA, UPDATE_USER_DATA, UPDATE_NAME, UPDATE_MOTHER_NAME, UPDATE_EMAIL } from './types';
// Action Creators
export const setUserData = (data) => {
    return (
        {
            type: SET_USER_DATA,
            payload: data,
        });
};
export const updateUserData = (data) => ({
    type: UPDATE_USER_DATA,
    payload: data,
});

export const updateName = (name) => ({
    type: UPDATE_NAME,
    payload: name,
});

export const updateMotherName = (motherName) => ({
    type: UPDATE_MOTHER_NAME,
    payload: motherName,
});

export const updateEmail = (email) => ({
    type: UPDATE_EMAIL,
    payload: email,
});
