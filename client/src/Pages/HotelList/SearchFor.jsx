import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Switch from './Switch';

const SearchFor = () => {
  const router = useLocation();

  return (
    <>
      <div>
        <div className="">
          <Link
            to="/search/hotel"
            className={`w-36 border-indigo-200/50 border-[#1D7874] bg-transparent px-1 py-2 hover:bg-[#e2e1e1]  ${
              router.pathname !== '/search/car' ? 'border-b-2 bg-[#e2e1e1]' : ''
            }`}
          >
            Hotel Rent
          </Link>
          <Link
            to="/search/car"
            className={`w-36 border-indigo-200/50 border-[#1D7874] bg-transparent px-1 py-2 hover:bg-[#e2e1e1] ${
              router.pathname === '/search/car' ? 'border-b-2 bg-[#e2e1e1]' : ''
            }`}
          >
            Car Rent
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchFor;
