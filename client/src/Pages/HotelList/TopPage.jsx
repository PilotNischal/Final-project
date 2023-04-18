import React, { useState } from 'react';
import { Logo, profile } from '../../assets/img';
import { useEffect } from 'react';
import { doGet } from '../../Services/Axios';
import SearchFor from './SearchFor';
import Switch from './Switch';
import { Link } from 'react-router-dom';
import SearchBar from '../../ResuableComponents/SearchBar';
import NavBar from '../Header/NavBar';

const TopPages = ({ setFilterTerm , state}) => {
  useEffect(() => {
    const getAllHotels = async () => {
      try {
        const resp = await doGet('/hotel/all');
      } catch (error) {}
    };
    getAllHotels();
  }, []);

  return (
    <>
      <NavBar />
      <SearchBar setFilterTerm={setFilterTerm} state={state} />
      <div className="mx-5 mt-52 flex justify-between sm:mt-48 md:mx-14 lg:mx-20">
        <SearchFor />
        <Switch />
      </div>
    </>
  );
};
export default TopPages;
