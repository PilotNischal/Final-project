import React, { useState } from "react";
import { image12, Logo, Room2 } from "../../../assets/img";
import InputField from "../../../ResuableComponents/InputField";
import SwitchHC from "../../Header/SwitchHC";

const CarAdd = () => {
  const switchs = ["Toyota", "Ford"];
  const [value, setValue] = useState("Toyota");
  const onOptionChangeHandler = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        <SwitchHC />
      </div>
      <div className="mt-32 mr-10 h-fit flex-wrap justify-between pl-20">
        <div className="container mb-4 w-fit flex-col flex-wrap justify-between gap-5">
          <h1 className="text-3xl font-semibold">Add Car</h1>
          <p className="">Car Name</p>
          <select
            onChange={onOptionChangeHandler}
            className="mb-5 w-full cursor-pointer border bg-transparent p-2 outline-none"
          >
            <option className="">{value}</option>
            {switchs.map((switc, index) => {
              return <option key={index}>{switc}</option>;
            })}
          </select>
          <InputField
            type="text"
            placeholder="000"
            name="Location"
            id="fname"
            title="Car Number"
            customStyle={{
              width: "100%",
              margin: "1.25rem 0",
              gap: "5px",
            }}
          />
          <p className="">Add Car Type and Cost</p>
          <div className="flex">
            <div className="mb-5 flex justify-between gap-2">
              <InputField
                type="text"
                placeholder="Car"
                name="Name"
                id="name"
                title=""
                customStyle={{ width: "clamp(4rem, 20vw, 14rem)", gap: "5px" }}
              />
              <InputField
                type="text"
                placeholder="1000"
                name="Name"
                id="name"
                title=""
                customStyle={{ width: "clamp(4rem, 20vw, 14rem)", gap: "5px" }}
              />
              <button className="rounded-md bg-primary py-1 px-7 text-center text-white">
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="m-4 rounded-md bg-[#e3e9e9c6]  px-7 py-2 text-center text-black drop-shadow-lg">
            Save
          </button>
          <button className="m-4 rounded-md bg-[#1D7874]  px-7 py-2 text-center text-white drop-shadow-lg">
            Cancel
          </button>
        </div>
        <div className="mt-14 grid gap-5">
          <h1 className="text-2xl font-bold">Added Cars</h1>
          <div className="flex flex-wrap gap-5">
            <div className="flex w-[70vw] flex-wrap gap-3 rounded-lg bg-[#f5f5f5]">
              <div className="grid h-36 w-full place-items-center rounded-lg sm:w-52">
                <img
                  src={image12}
                  alt=""
                  className="h-full w-full overflow-hidden rounded-lg object-cover"
                />
              </div>
              <div className="m-auto grid p-2 sm:m-0">
                <h1 className="text-xl font-semibold">ba 1 pa 2223</h1>
                <p className="text-lg">Toyota Yaris</p>
                <h1 className="text-xl font-semibold">2000</h1>
              </div>
            </div>
            <div className="ml-auto flex h-fit w-min flex-wrap gap-3">
              <button className="h-fit w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg">
                Delete
              </button>
              <button className="h-fit w-24 rounded-md bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                Edit
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="flex w-[70vw] flex-wrap gap-3 rounded-lg bg-[#f5f5f5]">
              <div className="grid h-36 w-full place-items-center rounded-lg sm:w-52">
                <img
                  src={image12}
                  alt=""
                  className="h-full w-full overflow-hidden rounded-lg object-cover"
                />
              </div>
              <div className="m-auto grid p-2 sm:m-0">
                <h1 className="text-xl font-semibold">123</h1>
                <p className="text-lg">Toyota Yaris</p>
                <h1 className="text-xl font-semibold">2000</h1>
              </div>
            </div>
            <div className="ml-auto flex h-fit w-min flex-wrap gap-3">
              <button className="h-fit w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg">
                Delete
              </button>
              <button className="h-fit w-24 rounded-md bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                Edit
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="flex w-[70vw] flex-wrap gap-3 rounded-lg bg-[#f5f5f5]">
              <div className="grid h-36 w-full place-items-center rounded-lg sm:w-52">
                <img
                  src={image12}
                  alt=""
                  className="h-full w-full overflow-hidden rounded-lg object-cover"
                />
              </div>
              <div className="m-auto grid p-2 sm:m-0">
                <h1 className="text-xl font-semibold">123</h1>
                <p className="text-lg">Toyota Yaris</p>
                <h1 className="text-xl font-semibold">2000</h1>
              </div>
            </div>
            <div className="ml-auto flex h-fit w-min flex-wrap gap-3">
              <button className="h-fit w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg">
                Delete
              </button>
              <button className="h-fit w-24 rounded-md bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                Edit
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="flex w-[70vw] flex-wrap gap-3 rounded-lg bg-[#f5f5f5]">
              <div className="grid h-36 w-full place-items-center rounded-lg sm:w-52">
                <img
                  src={image12}
                  alt=""
                  className="h-full w-full overflow-hidden rounded-lg object-cover"
                />
              </div>
              <div className="m-auto grid p-2 sm:m-0">
                <h1 className="text-xl font-semibold">123</h1>
                <p className="text-lg">Toyota Yaris</p>
                <h1 className="text-xl font-semibold">2000</h1>
              </div>
            </div>
            <div className="ml-auto flex h-fit w-min flex-wrap gap-3">
              <button className="h-fit w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg">
                Delete
              </button>
              <button className="h-fit w-24 rounded-md bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="w-12/12 grid place-items-center">
          <i className="fa-duotone fa-angles-down w-fit cursor-pointer py-5"></i>
        </div>
      </div>
    </>
  );
};

export default CarAdd;
