import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useLocation } from 'react-router';
import { doGet } from './Axios';
const UserProfileContext = createContext(null);
const UserProfile = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const fetchUser = async () => {
    try {
      const userres = await doGet(`/user`);
      setUser(userres.data);
    } catch (error) {}
  };
  useEffect(() => {
    !location.pathname.includes('register') &&
      !location.pathname.includes('/login') &&
      !location.pathname.includes('/user/verifyotp') &&
      !location.pathname.includes('/sendmail') &&
      !location.pathname.includes('/forgotpassword') &&
      !location.pathname.includes('/otp') &&
      !location.pathname.includes('reset') &&
      !location.pathname.includes('/user/verifyfpotp') &&
      fetchUser();
  }, [refresh, location]);

  return (
    <UserProfileContext.Provider value={{ user, setRefresh }}>
      {children}
    </UserProfileContext.Provider>
  );
};
export const useProfileConsumer = () => useContext(UserProfileContext);
export default UserProfile;
