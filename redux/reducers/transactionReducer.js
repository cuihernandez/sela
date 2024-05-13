/* eslint-disable prettier/prettier */
import { SET_TRANSACTION_DATA } from '../actions/types';

const initialState = {

    donorID: '',
    date: '',
    doneeName: '',
    doneeMotherName: '',
    doneeEmail: '',
    transactionAmount: '',

};

const transactionReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TRANSACTION_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default transactionReducer;

