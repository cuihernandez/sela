import { SET_TRANSACTION_DATA } from "./types";

export const setTransaction = (data) => {
    return (
        {
            type: SET_TRANSACTION_DATA,
            payload: data,
        }
    );
};