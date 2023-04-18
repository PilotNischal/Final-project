import React, { useState } from 'react';

const RangeSilder = ({ min, max, step, gap, changeHandler, value }) => {
  return (
    <div className="relative w-[14.5rem] py-4">
      <div
        className={
          'absolute left-0 top-0 h-1 w-full  rounded-md bg-slate-500 bg-none'
        }
      ></div>
      <div
        className={`absolute   right-0 top-0  h-1 rounded-md bg-white`}
        style={{ width: `${(+max - +value.max) / 1000}%` }}
      ></div>
      <div
        className={`z-1 absolute  left-0 top-0   h-1 rounded-md bg-white`}
        style={{ width: `${(value.min - min) / 1000}%` }}
      ></div>
      <input
        type={'range'}
        className={`absolute left-0 -top-2 w-1/2`}
        defaultValue={min}
        min={+min}
        max={+max / 2}
        name="min"
        step={step}
        onChange={(e) => changeHandler(e)}
      />
      <input
        type={'range'}
        name="max"
        className={`absolute right-0 -top-2 w-1/2`}
        min={+max / 2}
        max={+max}
        defaultValue={+max}
        step={step}
        onChange={(e) => changeHandler(e)}
      />
      <div className="flex justify-between p-2">
        <div>{value.min}</div>
        <div>{value.max}</div>
      </div>
    </div>
  );
};

export default RangeSilder;
