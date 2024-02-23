/* eslint-disable prettier/prettier */
import React, {createContext, useContext, useState} from 'react';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({children}) => {
  const [data, setData] = useState({
    textData: '',
    textAreaData: '',
    buttonText: '',
    imageSource: null,
  });

  return (
    <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  );
};
