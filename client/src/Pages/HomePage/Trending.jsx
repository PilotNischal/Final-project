import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {} from '../../App.css';
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from '../../assets/img';
import { baseUrl, doGet } from '../../Services/Axios';
import Card from './Card';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const handleGetOfferHotels = async () => {
    try {
      const response = await doGet('/hotel/all');

      setTrending(
        response.data && response.data.length > 0
          ? response.data.sort((a, b) => {
              if (a.totalReviews - b.totalReviews < 0) {
                return 1;
              } else {
                return -1;
              }
            })
          : []
      );
    } catch (error) {}
  };
  useEffect(() => {
    handleGetOfferHotels();
  }, []);
  console.log(trending);
  return (
    <>
      <h1 className="my-10 text-center text-2xl sm:text-4xl md:text-5xl">
        Local place and attraction
      </h1>
      <div className="grid-template-column">
        {trending.map((item) => (
          <Card item={item} />
        ))}
        {/* <div className="rounded-lg bg-[#F5F5F5]">
          <img src={image1} alt="" className="w-full rounded-lg" />
          <div className="px-10 py-1">
            <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
            <span className="text-[10px]">Pokhara</span>
            <h2 className="text-xl">Pokha Restro</h2>
            <small>450 reviews</small>
          </div>
          <div className="flex justify-evenly py-1">
            <div className="">
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#F5F5F5]">
          <img src={image2} alt="" className="w-full rounded-lg" />
          <div className="px-10 py-1">
            <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
            <span className="text-[10px]">Kathmandu</span>
            <h2 className="text-xl">Kathmandu sekuwa Ghar</h2>
            <small>500 reviews</small>
          </div>
          <div className="flex justify-evenly py-1">
            <div className="">
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-white"></i>
              <i className="fa-solid fa-star text-white"></i>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#F5F5F5]">
          <img src={image3} alt="" className="w-full rounded-lg" />
          <div className="px-10 py-1">
            <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
            <span className="text-[10px]">Pokhara</span>
            <h2 className="text-xl">Pokha Restro</h2>
            <small>450 reviews</small>
          </div>
          <div className="flex justify-evenly py-1">
            <div className="">
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-white"></i>
              <i className="fa-solid fa-star text-white"></i>
              <i className="fa-solid fa-star text-white"></i>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#F5F5F5]">
          <img src={image4} alt="" className="w-full rounded-lg" />
          <div className="px-10 py-1">
            <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
            <span className="text-[10px]">Pokhara</span>
            <h2 className="text-xl">Pokha Restro</h2>
            <small>450 reviews</small>
          </div>
          <div className="flex justify-evenly py-1">
            <div className="">
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-white"></i>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#F5F5F5]">
          <img src={image5} alt="" className="w-full rounded-lg" />
          <div className="px-10 py-1">
            <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
            <span className="text-[10px]">Pokhara</span>
            <h2 className="text-xl">Pokha Restro</h2>
            <small>450 reviews</small>
          </div>
          <div className="flex justify-evenly py-1">
            <div className="">
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-white"></i>
              <i className="fa-solid fa-star text-white"></i>
              <i className="fa-solid fa-star text-white"></i>
              <i className="fa-solid fa-star text-white"></i>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#F5F5F5]">
          <img src={image6} alt="" className="w-full rounded-lg" />
          <div className="px-10 py-1">
            <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
            <span className="text-[10px]">Pokhara</span>
            <h2 className="text-xl">Pokha Restro</h2>
            <small>450 reviews</small>
          </div>
          <div className="flex justify-evenly py-1">
            <div className="">
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Trending;
