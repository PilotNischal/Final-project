import React, { useState } from 'react';
import NavBar from '../../Header/NavBar';
import SideBar from '../../Header/SideBar';
import InputField from '../../../ResuableComponents/InputField';
import axios from 'axios';

const HotelOffers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    offerName: '',
    discountAfterBooking: {
      singleRoom: false,
      doubleRoom: false,
      suiteRoom: false,
      Delux: false,
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post('https://example.com/offers', formData);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        discountAfterBooking: {
          ...prevState.discountAfterBooking,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="container">
        <div className="mt-32  h-fit flex-wrap justify-between px-20">
          <h1 className="font-lato leading-12 text-2xl font-bold tracking-wider">
            Offers
          </h1>

          <div>
            <InputField
              type="text"
              placeholder="Winter offer / Seasonal offer"
              name="Name"
              id="name"
              title="Offer Name"
              // value={formdata.offerName}
              // onChange={handleInputChange}
              customStyle={{ width: '25%' }}
            />
          </div>
          <div className="mt-4 pl-20">
            <h1>Discount Percent</h1>
            <div className="flex  ">
              <div className="mb-4 pr-4">
                <button
                  className="m-4 w-full rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg"
                  onClick={handleDecrement}
                >
                  -
                </button>
              </div>
              <div>
                <button className="m-4 w-full rounded-md  bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg">
                  {count}
                </button>
              </div>
              <div className="pl-4">
                <button
                  className="m-4 w-full rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <p>Discount Apply after booking</p>
              <label>
                <input
                  type="checkbox"
                  name="singleRoom"
                  checked={formData.discountAfterBooking.singleRoom}
                  onChange={handleInputChange}
                />
                Single
              </label>
              <label>
                <input
                  type="checkbox"
                  name="doubleRoom"
                  checked={formData.discountAfterBooking.doubleRoom}
                  onChange={handleInputChange}
                />
                Double Room
              </label>
              <label>
                <input
                  type="checkbox"
                  name="suiteRoom"
                  checked={formData.discountAfterBooking.suiteRoom}
                  onChange={handleInputChange}
                />
                Suite Room
              </label>
              <label className="mb-4">
                <input
                  type="checkbox"
                  name="Delux"
                  checked={formData.discountAfterBooking.Delux}
                  onChange={handleInputChange}
                />
                Delux
              </label>
              <div className="flex justify-end">
                <button
                  className="m-4 w-1/12 rounded-md  bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isLoading ? 'Loading...' : 'submit'}
                </button>
                <button className="m-4 w-1/12 rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOffers;
