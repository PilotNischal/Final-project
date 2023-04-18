import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { cloud } from '../../assets/img';
const Weather = () => {
  const [weather, setWeather] = useState();
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
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}&hourly=temperature_2m&current_weather=true`
      );
      setWeather(response.data);
    };
    fetchWeather();
  }, [position.latitude, position.longitude]);
  return (
    <>
      {weather && (
        <div className="container">
          <div className="w-content absolute right-[2rem] top-72 flex h-52 rounded-lg bg-[#F5F5F5] p-2">
            <div className="flex">
              <div className="my-8">
                <img src={cloud} alt="cloud" className="" />
              </div>
              <div className="mx-2 my-auto">
                <h1 className="text-xl">
                  <strong className="text-3xl font-normal">
                    {weather.current_weather.temperature}
                    <sup className="text-xl font-light">0</sup>
                  </strong>
                  C
                </h1>
                <h2 className="text-lg">{moment().format('dddd')}</h2>
                <h2 className="text-lg">Mostly Sunny</h2>
                <h2 className="text-lg">
                  {weather.current_weather.windspeed < 10
                    ? 'Normal Wind'
                    : weather.current_weather.windspeed < 20
                    ? 'Moderate Wind'
                    : weather.current_weather.windspeed < 30
                    ? 'Windy'
                    : 'Extreme Windy'}
                </h2>

                <h2 className="text-lg font-medium">
                  {moment().format('YYYY-MM-DD HH')}
                </h2>
              </div>
              <i className="fa-duotone fa-angles-down rotate-[320deg] cursor-pointer self-end"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Weather;
