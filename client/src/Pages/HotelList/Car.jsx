import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router';
import { Link } from 'react-router-dom';
import { image10, image11, image12 } from '../../assets/img';
import { baseUrl, doGet } from '../../Services/Axios';
import { useFilterConsumer } from '../../Services/useFilter';

const Car = () => {
  const data = useOutletContext();
  const filter = useFilterConsumer();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  useEffect(() => {
    const handleGetCars = async () => {
      const response = await doGet('car/all');

      if (!data.filterTerm && !data.state) {
        setCars(response.data);
      } else if (!data.filterTerm) {
        setCars(
          response.data.filter(
            (item) =>
              item.car_type.toLowerCase().includes(data.state.toLowerCase()) ||
              item.model.toLowerCase().includes(data.state.toLowerCase()) ||
              item.name.toLowerCase().includes(data.state.toLowerCase()) ||
              item.description.toLowerCase().includes(data.state.toLowerCase())
          )
        );
      } else {
        setCars(
          response.data.filter(
            (item) =>
              item.car_type
                .toLowerCase()
                .includes(data.filterTerm.toLowerCase()) ||
              item.name.toLowerCase().includes(data.filterTerm.toLowerCase()) ||
              item.model
                .toLowerCase()
                .includes(data.filterTerm.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(data.filterTerm.toLowerCase())
          )
        );
      }
    };
    handleGetCars();
  }, [data.filterTerm, data.state]);

  const numbers = ['Economy', 'Mini', 'AC', 'Economy', 'Mini'];
  useEffect(() => {
    setFilteredCars(
      cars.filter(
        (item) => item.cost >= filter.range.min && item.cost <= filter.range.max
      )
    );
  }, [filter.range.min, filter.range.max, cars]);

  return (
    <>
      <p className="mx-5 mt-3 md:mx-14 lg:mx-20">
        Search Result "{data.state ?? data.filterTerm}"{' '}
      </p>
      {filteredCars.length > 0 &&
        filteredCars.map((item) => (
          <div className="my-2 mx-5 md:mx-14 lg:mx-20">
            <div>
              <div className="mt-5 flex w-full flex-wrap rounded-md bg-[#F5F5F5] lg:w-2/3">
                <div className="border-box w-full rounded-md bg-black sm:w-52">
                  <Link to={`/cardescription/${item.car_id}`}>
                    <img
                      src={`${baseUrl}/image/car/${item.car_images[0]}`}
                      alt="List1"
                      className="h-full w-full rounded-md object-none"
                    />
                  </Link>
                </div>
                <div className="w-full px-6 py-3 text-justify sm:w-4/6">
                  <div className="w-full text-justify sm:w-5/6">
                    <h1 className="font-semibold">{item.car_type}</h1>
                    <p className="my-3">
                      {item.seatnumber}seats |{item.name} {item.model}
                    </p>
                    <div className="flex w-full flex-wrap justify-between gap-3 sm:w-8/12">
                      <div className="flex rounded-lg bg-white px-2 py-1">
                        <i className="fa-solid fa-user m-auto"></i>
                        <p className="mx-2">6</p>
                      </div>
                      <div className="flex rounded-lg bg-white px-2 py-1">
                        <i className="fa-solid fa-bag-shopping m-auto"></i>
                        <p className="mx-2">2</p>
                      </div>
                      <div className="flex rounded-lg bg-white px-2 py-1">
                        <i className="fa-regular fa-snowflake m-auto"></i>
                        <p className="mx-2">AC</p>
                      </div>
                    </div>
                    <div className="my-2 flex">
                      <h2 className="mx-3 font-semibold">Rs {item.cost}</h2>
                      <p>a day</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap justify-between gap-3">
                    {item.free_includes.map((item) => (
                      <div className="flex rounded-lg bg-white px-2 py-1">
                        <i className="fa-solid fa-bed m-auto"></i>
                        <p className="m-auto mx-2">{item}</p>
                      </div>
                    ))}
                    {/* {item.bookedDays.filter((item) => {
                      return moment(item).day() === moment().day();
                    }).length === 0 && (
                      <div className="flex rounded-lg bg-primary px-14  py-1 text-white">
                        <button className="font-white font-semibold">
                          Rent Now
                        </button>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {/* {numbers.map((option, index) => {
        return (
          <>
            <div className="my-2 mx-5 md:mx-14 lg:mx-20">
              <div>
                <div className="mt-5 flex w-full flex-wrap rounded-md bg-[#F5F5F5] lg:w-2/3">
                  <div className="border-box w-full rounded-md bg-black sm:w-52">
                    <Link to="/cardescription">
                      <img
                        src={image10}
                        alt="List1"
                        className="h-full w-full rounded-md object-none"
                      />
                    </Link>
                  </div>
                  <div className="w-full px-6 py-3 text-justify sm:w-4/6">
                    <div className="w-full text-justify sm:w-5/6">
                      <h1 className="font-semibold">{option}</h1>
                      <p className="my-3">4-5 Doors | Toyota yaris</p>
                      <div className="flex w-full flex-wrap justify-between gap-3 sm:w-8/12">
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-solid fa-user m-auto"></i>
                          <p className="mx-2">6</p>
                        </div>
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-solid fa-bag-shopping m-auto"></i>
                          <p className="mx-2">2</p>
                        </div>
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-regular fa-snowflake m-auto"></i>
                          <p className="mx-2">AC</p>
                        </div>
                      </div>
                      <div className="my-2 flex">
                        <h2 className="mx-3 font-semibold">Rs 4000</h2>
                        <p>a day</p>
                      </div>
                    </div>
                    <div className="flex w-full flex-wrap justify-between gap-3">
                      <div className="flex rounded-lg bg-white px-2 py-1">
                        <i className="fa-solid fa-bed m-auto"></i>
                        <p className="m-auto mx-2">Free Cancellation</p>
                      </div>
                      <div className="flex rounded-lg bg-primary px-14  py-1 text-white">
                        <button className="font-white font-semibold">
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })} */}
      {/* <div className="my-8 mx-5 md:mx-14 lg:mx-20">
        <p className="mt-3">Suggested "CAR"</p>
        <div className="mt-5 flex w-full flex-wrap rounded-md bg-[#F5F5F5] lg:w-2/3">
          <div className="border-box w-full rounded-md bg-black sm:w-52">
            <img
              src={image12}
              alt="List1"
              className="h-full w-full rounded-md object-none"
            />
          </div>
          <div className="w-full px-6 py-3 text-justify sm:w-4/6">
            <div className="w-full text-justify sm:w-5/6">
              <h1 className="font-semibold">Mini</h1>
              <p className="my-3">4-5 Doors | Toyota yaris</p>
              <div className="flex w-full flex-wrap justify-between gap-3 sm:w-8/12">
                <div className="flex rounded-lg bg-white px-2 py-1">
                  <i className="fa-solid fa-user m-auto"></i>
                  <p className="mx-2">6</p>
                </div>
                <div className="flex rounded-lg bg-white px-2 py-1">
                  <i className="fa-solid fa-bag-shopping m-auto"></i>
                  <p className="mx-2">2</p>
                </div>
                <div className="flex rounded-lg bg-white px-2 py-1">
                  <i className="fa-regular fa-snowflake m-auto"></i>
                  <p className="mx-2">AC</p>
                </div>
              </div>
              <div className="my-2 flex">
                <h2 className="mx-3 font-semibold">Rs 4000</h2>
                <p>a day</p>
              </div>
            </div>
            <div className="flex w-full flex-wrap justify-between gap-3">
              <div className="flex rounded-lg bg-white px-2 py-1">
                <i className="fa-solid fa-bed m-auto"></i>
                <p className="m-auto mx-2">Free Cancellation</p>
              </div>
              <div className="flex rounded-lg bg-primary px-14  py-1 text-white">
                <button className="font-white font-semibold">Rent Now</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Car;
