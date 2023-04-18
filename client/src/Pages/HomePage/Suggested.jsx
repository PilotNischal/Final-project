import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { image1, image2, image3, image4 } from '../../assets/img';
import { baseUrl, doGet } from '../../Services/Axios';
import { Link } from 'react-router-dom';
import Card from './Card';

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Suggested = () => {
  const [hotels, setHotels] = useState([]);
  const handleGetOfferHotels = async () => {
    try {
      const response = await doGet('/hotel/all');

      setHotels(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleGetOfferHotels();
  }, []);
  const swiper = useSwiper();
  const datas = [
    {
      id: 1,
      image: image1,
      place: 'Pokhara',
      restName: 'Pokha Restro',
      review: '450',
      price: 10000,
    },
    {
      id: 1,
      image: image2,
      place: 'Pokhara',
      restName: 'Pokha Restro',
      review: '450',
      price: 10000,
    },
    {
      id: 1,
      image: image3,
      place: 'Pokhara',
      restName: 'Pokha Restro',
      review: '450',
      price: 10000,
    },
    {
      id: 1,
      image: image4,
      place: 'Pokhara',
      restName: 'Pokha Restro',
      review: '450',
      price: 10000,
    },
  ];

  return (
    <>
      <div className="px-5">
        <h1 className="my-10 text-center text-2xl sm:text-4xl md:text-5xl">
          Suggested Hotel and Location
        </h1>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          breakpoints={{
            0: { slidesPerView: 1 },
            580: { slidesPerView: 2 },
            1000: { slidesPerView: 3 },
            1366: { slidesPerView: 4 },
          }}

          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {hotels.map((item) => (
            <SwiperSlide key={item}>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Suggested;
