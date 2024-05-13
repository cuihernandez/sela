import { SET_PEARLS_DATA } from "./types";

export const setPearls = (array) => {
    return (
        {
            type: SET_PEARLS_DATA,
            payload: array,
        }
    );
};