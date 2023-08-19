'use client';
import { createContext, useContext, useState } from 'react';

export const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [myState, setMyState] = useState(true);
  const [chartData, setChartData] = useState([]);

  const contextValue = {
    myState,
    setMyState,
    chartData,
    setChartData,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
