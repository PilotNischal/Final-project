import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { image7, image8 } from '../../assets/img';
import { baseUrl, doGet } from '../../Services/Axios';
import OfferCard from './OfferCard';

const Offer = () => {
  const [hotelWithOffers, setHotelsWithOffer] = useState([]);
  const handleGetOfferHotels = async () => {
    try {
      const response = await doGet('/hotel/readlimitedofferhotels');

      setHotelsWithOffer(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleGetOfferHotels();
  }, []);

  return (
    <>
      <h1 className="my-10 text-center text-2xl sm:text-4xl md:text-5xl">
        Limited Offer
      </h1>
      <div className="flex flex-wrap justify-evenly">
        {hotelWithOffers.map((item) => (
          <OfferCard item={item} />
        ))}
      </div>
    </>
  );
};

export default Offer;
