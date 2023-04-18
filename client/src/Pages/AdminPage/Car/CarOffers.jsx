import React, { useState } from "react";
import InputField from "../../../ResuableComponents/InputField";
import SwitchHC from "../../Header/SwitchHC";

const CarOffers = () => {
  const [count, setCount] = useState(0);
  const onClickAdd = () => {
    setCount(count + 1);
  };
  const onClickMinus = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        <SwitchHC />
      </div>
      <div className="pl-20">
        <div className="mt-32 h-fit flex-wrap justify-between">
          <h1 className="font-lato leading-12 text-2xl font-bold tracking-wider">
            Offers
          </h1>
          <InputField
            type="text"
            placeholder="Winter offer / Seasonal offer"
            name="Name"
            id="name"
            title="Offer Name"
            customStyle={{ width: "25%" }}
          />
        </div>
        <div className="mt-4">
          <h1>Discount Percent</h1>
          <div className="flex ">
            <div className="mb-4 flex gap-3 pr-4">
              <button
                onClick={onClickMinus}
                className="w-full rounded-md bg-[#1D7874] px-5 py-2 text-center text-white drop-shadow-lg"
              >
                -
              </button>
            </div>
            <div>
              <button className="w-full rounded-md bg-[#e3e9e9c6] px-5 py-2 text-center text-black drop-shadow-lg">
                {count}
              </button>
            </div>
            <div className="pl-4">
              <button
                onClick={onClickAdd}
                className="w-full rounded-md bg-[#1D7874]  px-5 py-2 text-center text-white drop-shadow-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <p className="font-semibold">Discount Apply after booking</p>

            <div className="flex gap-2">
              <input type="checkbox" name="option1" />
              One car
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="option1" />
              Two car
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="option1" />
              Three car
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="option1" />
              Four car
            </div>

            <div className="flex justify-end">
              <button className="m-4 w-1/12 rounded-md  bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg">
                Save
              </button>
              <button className="m-4 w-1/12 rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarOffers;
