import React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Services/Axios';

const Card = ({ item }) => {
  return (
    <Link to={`/hoteldescription/${item.hotel_id}`}>
      <div className="h-96 cursor-pointer overflow-hidden rounded-lg bg-[#F5F5F5] shadow-md hover:bg-slate-500 hover:bg-opacity-50">
        <img
          src={`${baseUrl}/image/hotel/${item.hotelImages[0]}`}
          alt=""
          className="w-full rounded-lg"
        />
        <div className="px-10 py-1">
          <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
          <span className="text-[10px]">{item.location}</span>
          <h2 className="text-xl">{item.name}</h2>
          <small>{item.totalReviews} reviews</small>
        </div>
        <div className="flex justify-evenly py-1">
          <div>Rs.{item.averageCost ? item.averageCost.toFixed(0) : 0}</div>
          <div className="">
            {Array.from(Array(5)).map((el, index) => (
              <i
                className={` fa-star   ${
                  index < item.averageRating
                    ? 'fa-solid text-primary '
                    : 'fa-regular text-black'
                }`}
              ></i>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
