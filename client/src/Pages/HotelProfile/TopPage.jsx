import React, { useState } from 'react';
import { Logo, profile, Room1, Room2, Room3, Room4 } from '../../assets/img';
import { useEffect } from 'react';
import { doGet } from '../../Services/Axios';
const TopPages = () => {
  const [value, setValue] = useState('Nepal');
  const options = ['China', 'India', 'Australia', 'America', 'Russia'];
  const onOptionChangeHandler = (event) => {
    setValue(event.target.value);
  };
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
      <div className="grid place-items-left">
        <img
          src={Logo}
          alt="logo"
          className="relative top-3 left-16 text-black w-52"
        />
        <div className="flex w-36 px-2 py-1 bg-[#F5F5F5] justify-evenly items-center absolute top-14 right-[20rem] rounded-xl text-black">
          <i className="fa-solid fa-globe"></i>
          <select
            onChange={onOptionChangeHandler}
            className="outline-none bg-transparent"
          >
            <option className="bg-black">{value}</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className="w-20 px-2 py-1 bg-[#F5F5F5] absolute top-14 right-[14rem] rounded-xl text-black">
          <p className="px-5">Ajju</p>
        </div>
        <div>
          <img
            src={profile}
            alt="logo"
            className="absolute top-12 right-40 bg-red-300 rounded-full h-12 w-12"
          />
        </div>
      </div>
      <div className="mt-5 border bg-light-gray">
        <div className=" flex pt-8 px-24">
          <img src={Room2} alt="Room-1" className="absolute h-38 w-92" />
          <img src={Room1} alt="Room-1" className="h-54 mt-56" />
          <img src={Room4} alt="Room-1" className="relative px-5 h-1/4" />
          <img src={Room3} alt="Room-1" className="" />
        </div>

        <div className="px-24 mt-8">
          <div>
            <span className="text-2xl mr-3 font-semibold">Pokhreli Home</span>
            <i class=" fa-solid fa-star text-primary "></i>
            <i class="fa-solid fa-star text-primary"></i>
            <i class="fa-solid fa-star text-primary"></i>
            <i class="fa-solid fa-star text-primary"></i>
          </div>
          <i className="  fa-solid fa-location-dot"></i>
          <span className="p-2 text-sm">Pokhara, Chapagau</span>
          <br />
          <i class=" fa-solid fa-message-pen"></i>
          <span className="p-2 text-sm">55 review</span>
          <br />
          <i class=" fa-regular fa-water"></i>
          <span className="p-2 text-sm mr-8">lake side</span>
          <i class=" fa-regular fa-bed-pulse"></i>
          <span className="p-2 text-sm">Free Cancelation</span>
        </div>
      </div>
    </>
  );
};
export default TopPages;
