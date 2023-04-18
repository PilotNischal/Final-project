import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { NoTextLogo } from '../../assets/img/index';
import RangeSilder from '../../ResuableComponents/RangleSider';
import { useFilterConsumer } from '../../Services/useFilter';
import Button from '../../UI/Button/Button';
const Filter = () => {
  const location = useLocation();
  const filter = useFilterConsumer();

  const handleRangeSliderChange = (value) => {
    if (value.min) {
      filter.setRange((prev) => ({ ...prev, min: value.min }));
    } else {
      filter.setRange((prev) => ({ ...prev, max: value.max }));
    }
  };
  const handleApplyFilter = () => {};
  const handleChange = (e) => {
    filter.setStar(e.target.value);
  };

  const handleSelectFeatures = (e) => {
    if (filter.features.includes(e.target.value)) {
      filter.setFeatures(
        filter.features.filter((item) => item !== e.target.value)
      );
    } else {
      filter.setFeatures((prev) => [...prev, e.target.value]);
    }
  };
  return (
    <>
      <div className="container">
        <div className="absolute right-[3rem] top-72 flex h-fit w-fit rounded-lg bg-[#F5F5F5] p-2">
          <aside className="flex w-48 flex-col rounded-sm bg-light-gray py-2 px-4">
            <div className="flex  items-center justify-start">
              <div className="font-Poppins text-lg">Filter</div>
              <img alt="notextlog " className="h-10 w-10" src={NoTextLogo} />
            </div>

            <div className="py-3 ">
              <div className="pb-4">Price Range</div>
              <RangeSilder
                min={0}
                max={10000}
                value={filter.range}
                changeHandler={handleRangeSliderChange}
                step={100}
              />
            </div>
            {location.pathname === '/search/hotel' && (
              <div>
                <div>Ammenities</div>
                <ul>
                  <li className="flex gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      value={'Free wifi'}
                      name=""
                      id=""
                      onChange={(e) => handleSelectFeatures(e)}
                    />
                    <div>Free wifi</div>
                  </li>
                  <li className="flex gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      value={'Bar'}
                      name=""
                      id=""
                      onChange={(e) => handleSelectFeatures(e)}
                    />
                    <div>Bar</div>
                  </li>
                  <li className="flex gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      value={'pool'}
                      name=""
                      id=""
                      onChange={(e) => handleSelectFeatures(e)}
                    />
                    <div>Pool</div>
                  </li>
                  <li className="flex gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      value={'Lakeside'}
                      name=""
                      id=""
                      onChange={(e) => handleSelectFeatures(e)}
                    />
                    <div>Lakeside</div>
                  </li>
                  <li className="flex gap-2">
                    <input
                      type="checkbox"
                      className="accent-primary"
                      value={'Parking'}
                      name=""
                      id=""
                      onChange={(e) => handleSelectFeatures(e)}
                    />
                    <div>Free Parking</div>
                  </li>
                </ul>
              </div>
            )}
            <div className="pt-4">
              <Button text={'Apply Filter'} onClick={handleApplyFilter} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Filter;
