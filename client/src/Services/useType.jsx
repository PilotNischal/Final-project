import React from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
const ReviewTypeContext = createContext(null);
const UserType = ({ children }) => {
  const [type, setType] = useState('car');
  return (
    <ReviewTypeContext.Provider value={[type, setType]}>
      {children}
    </ReviewTypeContext.Provider>
  );
};
export const useCurrentTypeConsumer = () => useContext(ReviewTypeContext);
export default UserType;
