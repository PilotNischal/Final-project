import React, { useEffect, useMemo, useState } from 'react';
import NavBar from '../Header/NavBar';
import SideBar from '../Header/SideBar';
import SwitchHC from '../Header/SwitchHC';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { useCurrentTypeConsumer } from '../../Services/useType';
import { doGet } from '../../Services/Axios';
import { toast } from 'react-toastify';
import moment from 'moment';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [type, setType] = useCurrentTypeConsumer();

  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Nobember',
      'December',
    ],
    []
  );
  const [value, setValue] = useState('January');
  const onOptionChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 50,
        ticks: {
          stepSize: 2,
          callback: (value) => value,
        },
        grid: {
          borderDash: [10],
          display: false,
        },
      },
    },
  };

  const [users, setUsers] = useState();
  const [bookingList, setBookingList] = useState({});
  const [monthlyBooking, setMonthlyBooking] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [monthlyCarBooking, setMonthlyCarBooking] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [monthlyBookingCanc, setMonthlyBookingCanc] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const resp = await doGet('/user/all');

        setUsers(resp.data);

        let i = [];

        months.forEach((item, index) => {
          let value = 0;

          for (let m = 0; m < resp.data.length; m++) {
            if (+moment(resp.data[m].createdAt).month() === index) {
              value = value + 1;
            }
          }

          i.push(value);
        });

        setMonthlyUsers(i);
      } catch (error) {
        toast.error('Error while fetching information');
      }
    }
    getUsers();
  }, [months]);
  useEffect(() => {
    async function getUsers() {
      try {
        const resps = await doGet('/bookinglist');

        setBookingList(resps.data);

        let j = [];
        let k = [];
        let m = [];

        months.forEach((item, index) => {
          let valuea = 0;
          let valueb = 0;
          let valuec = 0;

          resps.data.carBooking.forEach((el) => {
            if (+moment(el.createdAt).month() === index) {
              valuea = valuea + 1;
            }
          });
          resps.data.hotelBooking.forEach((el) => {
            if (+moment(el.createdAt).month() === index) {
              valueb = valueb + 1;
            }
          });
          resps.data.cancelled.forEach((el) => {
            if (+moment(el.createdAt).month() === index) {
              valuec = valuec + 1;
            }
          });

          j.push(valuea);
          k.push(valueb);
          m.push(valuec);
        });

        setMonthlyBooking(j);
        setMonthlyCarBooking(k);
        setMonthlyBookingCanc(m);
      } catch (error) {
        toast.error('Error while fetching information');
      }
    }
    getUsers();
  }, [months]);

  return (
    <>
      <NavBar />
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]"></div>
      <div className="w-cotent absolute top-14 right-[13rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[31rem] md:right-[34rem]">
        {/* <SwitchHC /> */}
      </div>
      <SideBar />
      <div className="container">
        <div className="mt-36 flex h-fit flex-wrap justify-between gap-3 px-20 sm:mt-32">
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">Total Users</h1>
              <h1 className="mt-auto text-3xl font-semibold">
                {users && users.length}
              </h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-solid fa-users text-5xl text-slate-500"></i>
            </div>
          </div>
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">Car Booking</h1>
              <h1 className="mt-auto text-3xl font-semibold">
                {bookingList.carBooking && bookingList.carBooking.length}
              </h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-solid fa-calendar-lines-pen text-5xl text-slate-500"></i>
            </div>
          </div>
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">Hotel Booking</h1>
              <h1 className="mt-auto text-3xl font-semibold">
                {bookingList.hotelBooking && bookingList.hotelBooking.length}
              </h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-solid fa-calendar-days text-5xl text-slate-500"></i>
            </div>
          </div>
          <div className="flex h-32 w-52 items-end justify-between rounded-md bg-[#F5F5F5] p-3">
            <div className="grid h-full">
              <h1 className="text-lg">Total Cancellation</h1>
              <h1 className="mt-auto text-3xl font-semibold">
                {bookingList.cancelled && bookingList.cancelled.length}
              </h1>
            </div>
            <div className="mx-3 flex-col">
              <i className="fa-sharp fa-solid fa-ban text-5xl text-slate-500"></i>
            </div>
          </div>
        </div>
        <div className="my-10 w-full flex-col pl-20">
          <p className="text-xl font-semibold">Total Users</p>
          <Line
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'Nobember',
                'December',
              ],
              datasets: [
                {
                  data: monthlyUsers,
                  backgroundColor: 'transparent',
                  borderColor: 'black',
                  pointBorderColor: 'white',
                  pointBorderWidth: 1,
                  tension: 0.3,
                },
              ],
            }}
            options={options}
          ></Line>
        </div>
        <div className="my-10 w-full flex-col pl-20">
          <p className="text-xl font-semibold">Total Booking</p>
          <Line
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'Nobember',
                'December',
              ],
              datasets: [
                {
                  data: monthlyCarBooking,
                  backgroundColor: 'transparent',
                  borderColor: 'black',
                  pointBorderColor: 'white',
                  pointBorderWidth: 1,
                  tension: 0.3,
                  label: 'Hotel Bookings',
                },
                {
                  data: monthlyBooking,
                  backgroundColor: 'transparent',
                  borderColor: 'black',
                  pointBorderColor: 'white',
                  pointBorderWidth: 1,
                  tension: 0.3,
                  label: 'Car Booking',
                },
              ],
            }}
            options={options}
          ></Line>
        </div>
        <div className="my-10 flex w-full flex-wrap justify-between pl-20">
          <p className="text-xl font-semibold">Total Cancellation</p>
          <Line
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'Nobember',
                'December',
              ],
              datasets: [
                {
                  data: monthlyBookingCanc,
                  backgroundColor: 'transparent',
                  borderColor: 'black',
                  pointBorderColor: 'white',
                  pointBorderWidth: 1,
                  tension: 0.3,
                },
              ],
            }}
            options={options}
          ></Line>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
