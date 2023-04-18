import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logo } from '../../assets/img';
import InputField from '../../ResuableComponents/InputField';
import { baseUrl, doDelete, doGet, doPost } from '../../Services/Axios';
import { useForm } from '../../Services/useForm';
import NavBar from '../Header/NavBar';
import SideBar from '../Header/SideBar';
import SwitchHC from '../Header/SwitchHC';

const HotelDetails = () => {
  const [hotels, setHotels] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [ammenities, setAmmenities] = useState([]);
  const [review, setReview] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);
  const { handleChange, states } = useForm({
    name: '',
    location: '',
    description: '',
    type: 'Twin',
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Array.from(hotelImages).map((item) =>
        formData.append('hotelImage', item)
      );
      formData.append('review_permission', review);
      formData.append('hotel_features', ammenities);
      formData.append('name', states.name);
      formData.append('location', states.location);
      formData.append('description', states.description);
      formData.append('type', 'Twin');
      const response = await doPost('/hotel/admin', formData);
      toast.success('Hotel insert success!!!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.issues[0]
      ) {
        toast.error(error.response.data.issues[0].message);
      }
    }
  };
  const fetchHotels = async () => {
    try {
      const response = await doGet('/hotel/all');
      setHotels(response.data);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  useEffect(() => {
    fetchHotels();
  }, [refresh]);
  const handleDeleteHotel = async (id) => {
    try {
      const response = await doDelete(`hotel/${id}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  return (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        {/* <SwitchHC /> */}
      </div>
      <div className="mt-32 mr-10 h-fit flex-wrap justify-between pl-20">
        <div className="mx-auto">
          <h1 className="font-lato text-2xl font-bold leading-8 tracking-wider">
            Hotel Details
          </h1>
          <p className="mb-8">Add image</p>
        </div>
        <div className="mx-auto mb-8 flex h-32 w-fit flex-col justify-center rounded-md bg-[#F5F5F5] p-3 px-5 py-2 sm:px-20">
          <input
            type={'file'}
            name="hotelImages"
            onChange={(e) => setHotelImages(e.target.files)}
            multiple={true}
            className="my-4 mx-auto rounded-md bg-[#1D7874] px-10 py-2 text-center text-white drop-shadow-lg"
          />
        </div>
        <div className="container mb-4 flex flex-wrap justify-between gap-5">
          <InputField
            type="text"
            placeholder="Pokhreli Basti"
            name="name"
            id="name"
            title="Name"
            customStyle={{ width: '40%', gap: '5px' }}
            handleChange={handleChange}
          />
          <InputField
            type="text"
            placeholder="Pokhara"
            name="location"
            id="fname"
            title="location"
            customStyle={{ width: '40%', gap: '5px' }}
            handleChange={handleChange}
          />
          <InputField
            type="text"
            placeholder="Write something about hotel ..."
            name="description"
            id="name"
            title="Description"
            handleChange={handleChange}
            customStyle={{ width: '100%', gap: '5px' }}
          />
        </div>

        {/* <div className="mb-4 ">
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
            customStyle={{ width: "20%" }}
          />
        </div> */}

        <div className="flex flex-col gap-2  ">
          <p className="font-semibold">Properties Amenities</p>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Free Wifi'}
              onChange={(e) =>
                setAmmenities((prev) => [...prev, e.target.value])
              }
            />
            Free Wifi
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Pool'}
              onChange={(e) =>
                setAmmenities((prev) => [...prev, e.target.value])
              }
            />
            Pool
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Bar'}
              onChange={(e) =>
                setAmmenities((prev) => [...prev, e.target.value])
              }
            />
            Bar
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Kids'}
              onChange={(e) =>
                setAmmenities((prev) => [...prev, e.target.value])
              }
            />
            Kids Stay Free
          </div>

          <p className="font-semibold">Review</p>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <input
                type="radio"
                name="option"
                value={true}
                onChange={(e) => setReview(e.target.value)}
              />
              On
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="option"
                value={false}
                onChange={(e) => setReview(e.target.value)}
              />
              Off
            </div>
          </div>
        </div>
        <div className="my-5 flex justify-end gap-3">
          <button
            className="w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button className="w-24 rounded-md bg-[#1D7874] py-2 text-center text-white drop-shadow-lg">
            Cancel
          </button>
        </div>
        <div className="">
          <h1 className="text-xl font-semibold">Added Details</h1>
        </div>
        {hotels.map((item) => (
          <div className="mt-8 flex flex-wrap justify-between gap-2">
            <div className="flex w-full flex-wrap rounded-md bg-[#F5F5F5] lg:w-2/3">
              <div className="border-box w-full rounded-md sm:w-[18vw]">
                <Link to={`/hoteldescription/${item.hotel_id}`}>
                  <img
                    src={`${baseUrl}/image/hotel/${item.hotelImages[0]}`}
                    alt="List1"
                    className="h-full w-full rounded-md object-none"
                  />
                </Link>
              </div>
              <div className="w-full px-6 py-3 text-justify sm:w-3/6">
                <h1 className="font-semibold">{item.name}</h1>
                <p className="">{item.description}</p>
                <p className="mt-3 font-medium">{item.totalReviews} reviews</p>

                <div className="my-2">
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
                <div className="flex flex-wrap justify-between gap-3">
                  {item.hotel_features.map((item) => (
                    <div className="flex rounded-lg bg-white px-2 py-1">
                      <i className="fa-regular fa-water m-auto"></i>
                      <p className="mx-2">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex h-fit flex-wrap gap-3">
              <button
                onClick={(e) => handleDeleteHotel(item.hotel_id)}
                className="h-fit w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="w-12/12 grid place-items-center">
          <i className="fa-duotone fa-angles-down w-fit cursor-pointer py-5"></i>
        </div>
      </div>
    </>
  );
};

export default HotelDetails;
