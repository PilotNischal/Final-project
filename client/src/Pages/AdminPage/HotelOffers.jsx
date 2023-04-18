import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputField from '../../ResuableComponents/InputField';
import { doGet, doPost, doPut } from '../../Services/Axios';
import Button from '../../UI/Button/Button';
import SwitchHC from '../Header/SwitchHC';

const HotelOffers = () => {
  const [count, setCount] = useState(0);
  const [offer_type, setOffer] = useState('');
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState();
  const onClickAdd = () => {
    setCount(count + 1);
  };
  const onClickMinus = () => {
    setCount(count - 1);
  };
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await doGet('/hotel/all');
        setHotels(response.data);
      } catch (error) {}
    };
    fetchHotel();
  }, []);

  const handleHotelChange = async (e) => {
    try {
      const hotel = await doGet(`/hotel/read/${e}`);

      setRooms(hotel.data.room); setRoom(hotel.data.room[0].room_id);
    } catch (error) {}
  };
  const handleRoomChange = (e) => {
    setRoom(e);
  };
  useEffect(() => {
    hotels && hotels.length > 0 && handleHotelChange(hotels[0].hotel_id);
  }, [hotels.length]);
  const handleSubmit = async () => {
    try {
      if (!offer_type || count < 1 || !offer_type)
        return toast.error('Please fill all fields');
      const respose = await doPut('/room/addoffer', {
        room_number: room,
        offer: count,
        offer_type,
      });
      toast.success('Offer added successfully');
    } catch (error) {
      console.log(error)
      toast.error('Error while Adding offer');
    }
  };

  return (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        {/* <SwitchHC /> */}
      </div>
      <div className="pl-20">
        <div className="mt-32 h-fit flex-wrap justify-between">
          <h1 className="font-lato leading-12 text-2xl font-bold tracking-wider">
            Offers
          </h1>
          <InputField
            type="text"
            placeholder="Winter offer / Seasonal offer"
            name="Name"
            id="name"
            title="Offer Name"
            handleChange={(e) => setOffer(e.target.value)}
            customStyle={{ width: '25%' }}
          />
        </div>
        <div className="mt-4">
          <h1>Discount Percent</h1>
          <div className="flex ">
            <div className="mb-4 flex gap-3 pr-4">
              <button
                onClick={onClickMinus}
                className="w-full rounded-md bg-[#1D7874] px-5 py-2 text-center text-white drop-shadow-lg"
              >
                -
              </button>
            </div>
            <div>
              <button className="w-full rounded-md bg-[#e3e9e9c6] px-5 py-2 text-center text-black drop-shadow-lg">
                {count}
              </button>
            </div>
            <div className="pl-4">
              <button
                onClick={onClickAdd}
                className="w-full rounded-md bg-[#1D7874]  px-5 py-2 text-center text-white drop-shadow-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-52">
            <select
              className="py-4 px-2"
              onChange={(e) => handleHotelChange(e.target.value)}
            >
              {hotels &&
                hotels.length > 0 &&
                hotels.map((item) => (
                  <option value={item.hotel_id}>{item.name}</option>
                ))}
            </select>
            {rooms && rooms.length > 0 && (
              <select
                className="py-4 px-2"
                onChange={(e) => handleRoomChange(e.target.value)}
                defaultValue={rooms[0].room_id}
              >
                {rooms &&
                  rooms.length > 0 &&
                  rooms.map((item) => (
                    <option value={item.room_id}>{item.room_number}</option>
                  ))}
              </select>
            )}
            <div className="w-48">
              <Button onClick={handleSubmit} text={'Apply'}></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelOffers;
