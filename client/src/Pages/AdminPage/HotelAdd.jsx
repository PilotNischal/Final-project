import { validate } from 'khalti-checkout-web';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Logo, Room2 } from '../../assets/img';
import InputField from '../../ResuableComponents/InputField';
import { doDelete, doGet, doPost } from '../../Services/Axios';
import { useForm } from '../../Services/useForm';
import SwitchHC from '../Header/SwitchHC';

const HotelAdd = () => {
  const switchs = ['Pokhara restaurant and bar', 'Saili vanxa'];
  const [value, setValue] = useState('Select a hotel');
  const [refresh, setRefresh] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const onOptionChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const { handleChange, states, validate } = useForm({
    name: '',
    location: '',
  });
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await doGet('/hotel/all');
        setHotels(response.data);
      } catch (error) {}
    };
    fetchHotel();
  }, [refresh]);
  const handleHotelChange = async (e) => {
    try {
      const hotel = await doGet(`/hotel/read/${e}`);
      setRooms(hotel.data.room);
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      console.log('====================================');
      console.log('Dle');
      console.log('====================================');
      if (
        validate() &&
        !!states.room_number &&
        !!states.hotel_id &&
        !!states.cost
      ) {
        const response = await doPost('/room/addroom', {
          hotel_id: states.hotel_id,
          room_number: states.room_number,
          cost: +states.cost,
        });
        toast.success('Room added successfully');
      } else {
        toast.error('Please fill all fields');
      }
    } catch (error) {
      if (typeof error.response.data === 'string')
        return toast.error(error.response.data);
      toast.error('Error while adding room');
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await doDelete(`/room/${id}`);
      window.location.reload();
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
        <div className="container mb-4 w-fit flex-col flex-wrap justify-between gap-5">
          <h1 className="text-3xl font-semibold">Add Room</h1>
          <p className="">Hotel Name</p>
          <select
            onChange={(e) => {
              handleChange(e);
              handleHotelChange(e.target.value);
            }}
            name={'hotel_id'}
            className="mb-5 w-full cursor-pointer border bg-transparent p-2 outline-none"
          >
            <option className="" value={false}>
              {value}
            </option>
            {hotels &&
              hotels.length > 0 &&
              hotels.map((item) => (
                <option value={item.hotel_id}>{item.name}</option>
              ))}
          </select>
          <InputField
            type="text"
            placeholder="000"
            name="room_number"
            id="fname"
            title="Room Number"
            customStyle={{
              width: '100%',
              margin: '1.25rem 0',
              gap: '5px',
            }}
            handleChange={handleChange}
          />
          <p className="">Add Cost</p>
          <div className="flex">
            <div className="mb-5 flex justify-between gap-2">
              <InputField
                type="text"
                placeholder="1000"
                name="cost"
                id="name"
                title=""
                customStyle={{ width: 'clamp(4rem, 20vw, 14rem)', gap: '5px' }}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="m-4 rounded-md bg-[#e3e9e9c6]  px-7 py-2 text-center text-black drop-shadow-lg"
          >
            Save
          </button>
          <button className="m-4 rounded-md bg-[#1D7874]  px-7 py-2 text-center text-white drop-shadow-lg">
            Cancel
          </button>
        </div>
        <div className="mt-14 grid gap-5">
          <h1 className="text-2xl font-bold">Added Rooms</h1>
          {rooms &&
            rooms.map((item) => (
              <div className="flex flex-wrap gap-5">
                <div className="flex w-[70vw] flex-wrap gap-3 rounded-lg bg-[#f5f5f5]">
                  <div className="grid h-36 w-full place-items-center rounded-lg sm:w-52">
                    <img
                      src={Room2}
                      alt=""
                      className="h-full w-full overflow-hidden rounded-lg object-cover"
                    />
                  </div>
                  <div className="m-auto grid p-2 sm:m-0">
                    <h1 className="text-xl font-semibold">
                      {item.room_number}
                    </h1>
                    <p className="text-lg">{item.offer_type}</p>
                    <h1 className="text-xl font-semibold">{item.cost}</h1>
                  </div>
                </div>
                <div className="ml-auto flex h-fit w-min flex-wrap gap-3">
                  <button
                    onClick={() => handleDelete(item.room_id)}
                    className="h-fit w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="w-12/12 grid place-items-center">
          <i className="fa-duotone fa-angles-down w-fit cursor-pointer py-5"></i>
        </div>
      </div>
    </>
  );
};

export default HotelAdd;
