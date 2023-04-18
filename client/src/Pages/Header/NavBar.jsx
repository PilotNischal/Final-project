import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, profile } from '../../assets/img';
import {
  getUserFromLocalStorage,
  isRemoveUserFromLocalStorage,
} from '../../Services/Helpers';
import { useCurrentUserContextConsumer } from '../../Services/useUserLocation';

const NavBar = () => {
  const { options, location, setLocation } = useCurrentUserContextConsumer();
  const onOptionChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const [display, setDisplay] = useState(true);
  const onClickHandler = () => {
    display === true ? setDisplay(false) : setDisplay(true);
  };

  const [show, setShow] = useState(true);
  const onClickHandler1 = () => {
    show === true ? setShow(false) : setShow(true);
  };

  const handlegOut = () => {
    isRemoveUserFromLocalStorage();
    window.location.href = '/';
  };
  return (
    <>
      <div className="place-items-left grid bg-red-300">
        <Link to={'/'}>
          <img
            src={Logo}
            alt="logo"
            className="absolute top-3 left-16 w-52 text-black"
          />
        </Link>
        <div
          className={
            display === true
              ? 'fixed z-40 hidden h-screen w-screen place-items-center bg-black bg-opacity-75'
              : 'fixed z-40 grid h-screen w-screen place-items-center bg-black bg-opacity-75'
          }
        >
          <div className="w-[25rem] rounded-xl bg-white px-5 py-2 pb-10">
            <div className="my-3 flex items-center justify-between">
              <h2 className="text-3xl">Regional Setting</h2>
              <span
                className="cursor-pointer bg-transparent"
                onClick={onClickHandler}
              >
                &#x274C;
              </span>
            </div>
            <hr className="h-[2px] w-full bg-black" />
            <div className="my-3 flex items-center justify-start">
              <i className="fa-solid fa-globe mr-3"></i>
              <h2 className="text-2xl">Country Name</h2>
            </div>
            <p>
              Selecting the country you're inwill give you local deals and
              information.
            </p>
            <select
              onChange={onOptionChangeHandler}
              className="w-full border-2 bg-transparent px-3 py-1 text-xl outline-none "
            >
              <option className="">{location}</option>
              {location &&
                options.map((option, index) => {
                  return (
                    <option key={index} valuw={option.country}>
                      {option.country}
                    </option>
                  );
                })}
            </select>
            <div className="my-3 flex items-center justify-start">
              <i className="fa-solid fa-sack-dollar mr-3"></i>
              <h2 className="text-xl">Currency</h2>
            </div>
            <div className="w-full border-2 bg-transparent px-3 py-1 text-xl outline-none">
              <input
                type="text"
                name=""
                id=""
                value={
                  location &&
                  options.filter((item) => item.country === location)[0]
                    .currency
                }
                className="w-full border-none bg-transparent text-slate-400 outline-none"
              />
            </div>
          </div>
        </div>
        <div
          className="w-cotent absolute top-24 right-[10rem] z-50 flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:top-14 sm:right-[11rem] md:right-[13rem]"
          onClick={onClickHandler}
        >
          <i className="fa-solid fa-globe"></i>&nbsp;
          <span>
            {location &&
              options.filter((item) => item.country === location)[0].country}
            &nbsp;{' '}
            {location &&
              options.filter((item) => item.country === location)[0].currency}
            &emsp;&emsp;&#x25BC;
          </span>
        </div>
        <div className="absolute top-24 right-[4rem] w-20 rounded-xl bg-[#F5F5F5] px-2 py-1 text-black sm:top-14 sm:right-[5rem] md:right-[7rem] lg:right-[7rem]">
          <p className="px-5">{getUserFromLocalStorage()}</p>
        </div>
        <div className="absolute top-20 right-[.1rem] sm:top-12 sm:right-[1rem] md:right-[3rem]">
          <img
            src={profile}
            alt="profile"
            className=" h-12 w-12 cursor-pointer rounded-full bg-black"
            onClick={onClickHandler1}
          />
          <div
            className={
              show === true
                ? 'top-15 absolute right-5 z-20 hidden w-max rounded-lg bg-white py-2 shadow shadow-black'
                : 'top-15 absolute right-5 z-20 grid w-max rounded-lg bg-white py-2 shadow shadow-black'
            }
          >
            <Link
              to="/profile"
              className="font-regular cursor-pointer rounded-lg px-5 py-1 text-lg hover:bg-[#F5F5F5]"
            >
              View Profile
            </Link>
            <h2 className="font-regular cursor-pointer rounded-lg px-5 py-1 text-lg hover:bg-[#F5F5F5]">
              Booking
            </h2>
            {getUserFromLocalStorage() ? (
              <h2
                className="font-regular cursor-pointer rounded-lg px-5 py-1 text-lg hover:bg-[#F5F5F5]"
                onClick={handlegOut}
              >
                Sign Out
              </h2>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
