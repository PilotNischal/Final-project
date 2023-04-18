import React from 'react';

function FormHeader() {
  return (
    <div className="flex justify-center items-center h-[94px] w-screen bg-[#1D7874]">
      <div className="flex justify-between w-full">
        <div className="left w-full"></div>
        <div className="right px-10 w-full flex justify-end items-center text-white">
          <i className="fa-solid fa-envelope mx-2"></i>
          <p>willowdale@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default FormHeader;
