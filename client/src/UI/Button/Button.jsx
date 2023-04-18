import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <div
      className="my-2 w-full cursor-pointer rounded-md bg-[#1D7874]   py-2 text-center text-white drop-shadow-lg 2xl:py-3"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
