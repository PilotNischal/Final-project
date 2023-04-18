import React from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import TopPages from './TopPage.jsx';
import { useState } from 'react';

const Landing = () => {
  const { state } = useLocation();
  const [filterTerm, setFilterTerm] = useState('');
  return (
    <>
      <TopPages setFilterTerm={setFilterTerm} state={state} />
      <Outlet context={{ state, filterTerm }} />
    </>
  );
};

export default Landing;
