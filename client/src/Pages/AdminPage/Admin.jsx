import React, { useState } from 'react';
import NavBar from '../Header/NavBar';
import SideBar from '../Header/SideBar';
import { Outlet, useLocation } from 'react-router';

const Admin = (props) => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <SideBar />
      <Outlet context={props} />
    </>
  );
};

export default Admin;
