import React, { useState } from 'react';
import { div } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import { useFilterConsumer } from '../../Services/useFilter';
import Weather from './Weather';

const Switch = () => {
  const star = useFilterConsumer();
  const [weather, setWeather] = useState(star && star.star > 0 ? false : true);
  const [filter, setFilter] = useState(star && star.star > 0 ? true : false);
  const onClickHandler = () => {
    setWeather(true);
    setFilter(false);
  };
  const onClickHandler1 = () => {
    setFilter(true);
    setWeather(false);
  };

  return (
    <>
      <div className="hidden h-full w-40 justify-between lg:flex">
        <div
          onClick={onClickHandler}
          className="border-[.5px] border-transparent hover:border-[.5px] hover:border-black focus:border-[.5px] focus:border-black"
        >
          <i className="fa-regular fa-temperature-list cursor-pointer py-1 px-3 text-2xl"></i>
        </div>
        {weather === true && (
          <div className="hidden lg:grid">
            <Weather />
          </div>
        )}
        <div
          onClick={onClickHandler1}
          className="border-[.5px] border-transparent hover:border-[.5px] hover:border-black focus:border-[.5px] focus:border-black"
        >
          <i className="fa-regular fa-bars-filter cursor-pointer py-1 px-3 text-2xl"></i>
        </div>
        {filter === true && (
          <div className="hidden lg:grid">
            <Filter />
          </div>
        )}
      </div>
    </>
  );
};

export default Switch;
