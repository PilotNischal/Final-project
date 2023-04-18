import React, { useState } from "react";
import SwitchHC from "../../Header/SwitchHC";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Nobember",
    "December",
  ];
  const [value, setValue] = useState("January");
  const onOptionChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const data = {
    labels: [
      "febraury 1",
      "febraury 2",
      "febraury 3",
      "febraury 4",
      "febraury 5",
      "febraury 6",
      "febraury 7",
      "febraury 8",
      "febraury 9",
      "febraury 10",
      "febraury 12",
      "febraury 13",
      "febraury 14",
    ],
    datasets: [
      {
        data: [5, 5.1, 6, 8, 1, 10.5, 7, 8, 9, 0, 11, 12, 50],
        backgroundColor: "transparent",
        borderColor: "black",
        pointBorderColor: "white",
        pointBorderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 10,
        ticks: {
          stepSize: 2,
          callback: (value) => value + "K",
        },
        grid: {
          borderDash: [10],
          display: false,
        },
      },
    },
  };

  return (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        <select
          onChange={onOptionChangeHandler}
          className="w-full cursor-pointer border-none bg-transparent outline-none"
        >
          <option className="">{value}</option>
          {months.map((month, index) => {
            return <option key={index}>{month}</option>;
          })}
        </select>
      </div>
      <div className="w-cotent absolute top-14 right-[13rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[31rem] md:right-[34rem]">
        <SwitchHC />
      </div>
      <div className="container">
        <div className="mt-36 flex h-fit flex-wrap justify-between gap-3 px-20 sm:mt-32">
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">New Visitors</h1>
              <h1 className="mt-auto text-3xl font-semibold">899</h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-solid fa-users text-5xl text-slate-500"></i>
            </div>
          </div>
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">Total Booking</h1>
              <h1 className="mt-auto text-3xl font-semibold">50</h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-solid fa-calendar-lines-pen text-5xl text-slate-500"></i>
            </div>
          </div>
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">Advance Booking</h1>
              <h1 className="mt-auto text-3xl font-semibold">25</h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-solid fa-calendar-days text-5xl text-slate-500"></i>
            </div>
          </div>
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">Total Cancellation</h1>
              <h1 className="mt-auto text-3xl font-semibold">5</h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-sharp fa-solid fa-ban text-5xl text-slate-500"></i>
            </div>
          </div>
        </div>
        <div className="my-10 w-full flex-col pl-20">
          <p className="text-xl font-semibold">New Visitors</p>
          <Line data={data} opitons={options}></Line>
        </div>
        <div className="my-10 w-full flex-col pl-20">
          <p className="text-xl font-semibold">Total Booking</p>
          <Line data={data} opitons={options}></Line>
        </div>
        <div className="my-10 flex w-full flex-wrap justify-between pl-20">
          <div className="w-5/12 flex-col">
            <p className="text-xl font-semibold">Advance Booking</p>
            <Line data={data} opitons={options}></Line>
          </div>
          <div className="w-5/12 flex-col">
            <p className="text-xl font-semibold">Total Cancellation</p>
            <Line data={data} opitons={options}></Line>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
