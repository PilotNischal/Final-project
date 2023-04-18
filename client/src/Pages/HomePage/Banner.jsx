import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cloud } from '../../assets/img';

const Banner = () => {
  const [position, setPostiion] = useState({
    longitude: 85.34,
    latitude: 27.72,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) =>
      setPostiion((prev) => ({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }))
    );
  }

  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}&hourly=temperature_2m&current_weather=true`
      );
      setWeather(response.data.current_weather);
    };
    fetchWeather();
  }, []);

  return (
    <>
      {
        <div className="my-10 flex flex-wrap place-items-center justify-evenly gap-4">
          <Link to="/search/hotel">
            <div className=" hotel flex w-[17rem] cursor-pointer items-center justify-center bg-[#F5F5F5] py-2 px-3">
              <div className="">
                <h1 className="text-center text-[1.5rem]">Hotel Book</h1>
                <p className="mx-2 flex text-justify">
                  Book Best Hotels from different locations
                  <img
                    src="https://i.pinimg.com/236x/dc/87/a8/dc87a8f8ebb246fcc5a7e811e7629de9.jpg"
                    alt=""
                    className="mx-3 h-full w-10"
                  />
                </p>
              </div>
            </div>
          </Link>
          <Link to={'/search/car'}>
            <div className="car flex w-[17rem] cursor-pointer items-center justify-center bg-[#F5F5F5] py-2 px-3">
              <div>
                <h1 className="text-center text-[1.5rem]">Car Rent</h1>
                <p className="mx-2 flex text-justify">
                  Best Cars near your location to visit places
                  <img
                    src="https://i.pinimg.com/236x/dc/87/a8/dc87a8f8ebb246fcc5a7e811e7629de9.jpg"
                    alt=""
                    className="mx-3 h-full w-10"
                  />
                </p>
              </div>
            </div>
          </Link>
          <Link to={'/offer'}>
            <div className="car flex flex-col w-[17rem] cursor-pointer items-center justify-center bg-[#F5F5F5] py-6 px-3">
              <h1 className="py-1 text-lg font-medium"> Local Offers</h1>
              <div>Check out local offers in your area</div>
            </div>
          </Link>

          <Link to={'/search/car'}>
            <div className="weather flex w-[17rem] cursor-pointer items-center justify-center bg-[#F5F5F5] py-2 px-3">
              <div>
                <h1 className="text-center text-[1.5rem]">Weather</h1>
                <p className="mx-2 flex text-justify">
                  {weather && weather.temperature}
                  <div>
                    <sup>o</sup>C
                  </div>
                  <img src={cloud} alt="" className="mx-3 h-full w-16" />
                </p>
              </div>
            </div>
          </Link>
        </div>
      }
    </>
  );
};

export default Banner;
