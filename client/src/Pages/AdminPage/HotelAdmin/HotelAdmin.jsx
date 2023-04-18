import React, { useState } from 'react';
import NavBar from '../../Header/NavBar';
import SideBar from '../../Header/SideBar';
import InputField from '../../../ResuableComponents/InputField';
// import Button from "../../../UI/Button/Button";
import axios from 'axios';

const HotelAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    room: '',
    amenities: {
      wifi: false,
      pool: false,
      bar: false,
      kidsStayFree: false,
    },
    review: false,
  });
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://example.com/hotels', formData);

      setLoading(false);
    } catch (err) {}
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        amentities: {
          ...prevState.amenities,
          [name]: checked,
        },
      }));
    } else if (type === 'radio') {
      setFormData((prevState) => ({
        ...prevState,
        review: value === 'on',
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex">
          <SideBar />

          <div className="container">
            <div className="mt-32  h-fit flex-wrap justify-between px-20">
              <h1 className="font-lato leading-12 text-2xl font-bold tracking-wider">
                Hotel Details
              </h1>
              <p className="mb-8">Add image</p>

              <div className=" mx-auto mb-8 flex h-32  w-80 flex-col justify-center  rounded-md bg-[#F5F5F5] p-3">
                <button className="my-4 mx-auto w-1/2 rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                  Upload Photo
                </button>
                <p className="text-center">Drag and Drop the File</p>
              </div>
            </div>

            <div>
              <div className="mb-4 flex justify-evenly">
                <InputField
                  type="text"
                  placeholder="Pokhreli Basti"
                  name="Name"
                  id="name"
                  title="Name"
                  customStyle={{ width: '45%' }}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="Pokhara"
                  name="Location"
                  id="fname"
                  title="Location"
                  customStyle={{ width: '45%' }}
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4 pl-20">
                <h1>Available Room</h1>
                <div className="flex ">
                  <div className="mb-4 pr-4 ">
                    <button className="m-4 w-full rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                      +
                    </button>
                  </div>
                  <div>
                    <button className="m-4 w-full rounded-md  bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg">
                      1
                    </button>
                  </div>
                  <div className="pl-4">
                    <button className="m-4 w-full rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                      -
                    </button>
                  </div>
                </div>
                <InputField
                  type="text"
                  placeholder="2000"
                  name="room"
                  id="room"
                  title="Cost Per Room"
                  customStyle={{ width: '20%' }}
                  value={formData.room}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col pl-20">
                <p>Properties Amenities</p>
                <label>
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.amenities.wifi}
                    onChange={handleInputChange}
                  />
                  Free Wifi
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="pool"
                    checked={formData.amenities.pool}
                    onChange={handleInputChange}
                  />
                  Pool
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="Bar"
                    checked={formData.amenities.bar}
                    onChange={handleInputChange}
                  />
                  Bar
                </label>
                <label className="mb-4">
                  <input
                    type="checkbox"
                    name="kidsStayFree"
                    onChange={handleInputChange}
                  />
                  Kids Stay Free
                </label>

                <p>Review</p>
                <div className="flex">
                  <label>
                    <input
                      type="radio"
                      name="review"
                      value="on"
                      checked={formData.review === true}
                      onChange={handleInputChange}
                    />
                    On
                  </label>

                  <label className="pl-4">
                    <input
                      type="radio"
                      name="review"
                      value="off"
                      checked={formData.review === false}
                    />
                    Off
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    className="m-4 w-1/12 rounded-md  bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                  <button className="m-4 w-1/12 rounded-md  bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default HotelAdmin;
