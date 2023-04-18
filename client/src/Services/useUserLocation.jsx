import React, { createContext, useContext, useState } from 'react';
const CurrentUserContext = createContext(null);

const UserLocationProvider = ({ children }) => {
  const options = [
    { country: 'Nepal', currency: 'NPR' },
    { country: 'China', currency: 'CNY' },
    { country: 'India', currency: 'INR' },
    { country: 'Australia', currency: 'AUD' },
    { country: 'USA', currency: 'USD' },
    { country: 'Russia', currency: 'RUB' },
  ];
  const [location, setLocation] = useState('Nepal');
  return (
    <CurrentUserContext.Provider
      value={{
        options,
        location,
        setLocation,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContextConsumer = () =>
  useContext(CurrentUserContext);
export default UserLocationProvider;
