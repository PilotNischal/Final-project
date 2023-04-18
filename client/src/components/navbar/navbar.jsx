import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets/img';
import { getUserEmailFromLocalStorage } from '../../Services/Helpers';

const Navbar = () => {
  return (
    <>
      <nav className="flex h-[60px] justify-end bg-primary px-2 tracking-wider text-white md:px-6">
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-envelope" />
          <div className="text-md from-neutral-50 font-light">
            {getUserEmailFromLocalStorage()}
          </div>
        </div>
      </nav>
      <div className="pl-4 md:px-16">
        <div className="w-40">
          <Link to={'/'}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
