
import React from 'react';
import { useSelector } from 'react-redux';
const Const = () => {
    const donorData = useSelector(state => state.user);
    const donorID = donorData.userID;
    const donorName = donorData.name;
    const donorMotherName = donorData.mothername;
    const donorEmail = donorData.email;
    return {
        donorData, donorID, donorName, donorMotherName, donorEmail
    };
};


export default Const;
