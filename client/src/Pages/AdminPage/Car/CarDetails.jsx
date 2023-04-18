import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { image12, Logo } from '../../../assets/img';
import InputField from '../../../ResuableComponents/InputField';
import { baseUrl, doDelete, doGet, doPost } from '../../../Services/Axios';
import { useForm } from '../../../Services/useForm';
import SwitchHC from '../../Header/SwitchHC';

const CarDetails = () => {
  const [refresh, setRefresh] = useState([]);
  const [cars, setCars] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const { handleChange, states, errors, validate } = useForm({
    name: '',
    seatnumber: '',
    car_type: '',
    car_number: '',
    cost: '',
    discount: '',
  });
  const [free_includes, setFreeIncludes] = useState([]);
  const [hireIncludes, setHireIncludes] = useState([]);
  const [review, setReview] = useState(false);
  const fetchCars = async () => {
    try {
      const response = await doGet('/car/all');
      setCars(response.data);
      console.log('====================================');
      console.log(response);
      console.log('====================================');
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  useEffect(() => {
    fetchCars();
  }, [refresh]);
  const handleDelete = async (item) => {
    try {
      const response = await doDelete(`/car/deletecar/${item.car_id}`);
      setRefresh((prev) => !prev);
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      if (validate()) {
        const formData = new FormData();
        Array.from(carImages).map((item) => formData.append('carImages', item));

        formData.append('car_type', states.car_type);
        formData.append('car_number', states.car_number);
        formData.append('door_number', 5);
        formData.append('seatnumber', states.seatnumber);
        formData.set('name', states.name);
        formData.append('trunkspace', 4);
        formData.append('free_includes', [...new Set(free_includes)]);
        formData.append('hire_Includes', [...new Set(hireIncludes)]);
        formData.append('review_permission', review);
        formData.append('cost', states.cost);
        formData.append('ac_system', true);
        formData.append('transmission', 'auto');
        const response = await doPost('/car/addcar', formData);
        setRefresh((prev) => !prev);
        toast.success('Car successfully added');
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.issues &&
        error.response.data.issues[0]
      ) {
        return toast.error(error.response.data.issues[0].message);
      }
      if (error && error.response && typeof error.response.data === 'string') {
        return toast.error(error.response.data);
      }
      toast.error('Validation error');
    }
  };
  console.log(errors, states);

  return (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        {/* <SwitchHC /> */}
      </div>
      <div className="mt-32 mr-10 h-fit flex-wrap justify-between pl-20">
        <div className="mx-auto">
          <h1 className="font-lato text-2xl font-bold leading-8 tracking-wider">
            Car Details
          </h1>
          <p className="mb-8">Add image</p>
        </div>
        <div className="mx-auto mb-8 flex h-32 w-fit flex-col justify-center rounded-md bg-[#F5F5F5] p-3 px-5 py-2 sm:px-20">
          <input
            id="carImage"
            onChange={(e) => setCarImages(e.target.files)}
            type="file"
            multiple={true}
            className="my-4 mx-auto rounded-md bg-[#1D7874] px-10 py-2 text-center text-white drop-shadow-lg"
          />

          <label className="text-center" htmlFor="carImage">
            Insert Images{' '}
          </label>
        </div>
        <div className="container mb-4 flex flex-wrap justify-between gap-5">
          <InputField
            type="text"
            placeholder="Toyota Yaris"
            name="name"
            id="name"
            handleChange={handleChange}
            title="Name"
            customStyle={{ width: '40%', gap: '5px' }}
            error={errors.name}
          />
          <InputField
            type="text"
            placeholder="Mini"
            name="car_type"
            id="name"
            handleChange={handleChange}
            title="Type"
            customStyle={{ width: '40%', gap: '5px' }}
            error={errors.car_type}
          />
          <InputField
            type="text"
            placeholder="5"
            name="seatnumber"
            id="name"
            handleChange={handleChange}
            title="Seat number"
            customStyle={{ width: '40%', gap: '5px' }}
            error={errors.seatnumber}
          />
          <InputField
            type="text"
            placeholder="Ba-5-pa"
            name="car_number"
            id="name"
            handleChange={handleChange}
            title="Car Number"
            customStyle={{ width: '40%', gap: '5px' }}
            error={errors.car_number}
          />
          <InputField
            type="text"
            placeholder="cost"
            name="cost"
            id="fname"
            handleChange={handleChange}
            title="Cost"
            customStyle={{ width: '40%', gap: '5px' }}
            error={errors.cost}
          />
          <InputField
            type="text"
            placeholder="5"
            name="discount"
            id="name"
            handleChange={handleChange}
            title="Discount"
            customStyle={{ width: '40%', gap: '5px' }}
            error={errors.discount}
          />
        </div>
        <div className="flex flex-col gap-2  ">
          <p className="font-semibold">Included for Free</p>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Collision damage waiver'}
              onChange={(e) =>
                setFreeIncludes((prev) => [...prev, e.target.value])
              }
            />
            Collision damage waiver
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Theft protection'}
              onChange={(e) =>
                setFreeIncludes((prev) => [...prev, e.target.value])
              }
            />
            Theft protection
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Third party protection'}
              onChange={(e) =>
                setFreeIncludes((prev) => [...prev, e.target.value])
              }
            />
            Third party protection
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Cancellation'}
              onChange={(e) =>
                setFreeIncludes((prev) => [...prev, e.target.value])
              }
            />
            Cancellation
          </div>
          <p className="mt-5 font-semibold">Plus Your Hire Includes</p>

          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Unlimited Mileage'}
              onChange={(e) =>
                setHireIncludes((prev) => [...prev, e.target.value])
              }
            />
            Unlimited Mileage
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Airport Surcharges'}
              onChange={(e) =>
                setHireIncludes((prev) => [...prev, e.target.value])
              }
            />
            Airport Surcharges
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="option1"
              value={'Break Down Assistance'}
              onChange={(e) =>
                setHireIncludes((prev) => [...prev, e.target.value])
              }
            />
            Break Down Assistance
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
            onClick={handleSubmit}
            className="w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg"
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
        <div className="mt-8 flex flex-wrap justify-between gap-2">
          {cars &&
            cars.length > 0 &&
            cars.map((item) => (
              <>
                <div className="mt-5 flex w-full flex-wrap rounded-md bg-[#F5F5F5] lg:w-2/3">
                  <div className="border-box w-full rounded-md bg-black sm:w-52">
                    <Link to={`/cardescription/${item.car_id}`}>
                      <img
                        src={`${baseUrl}/image/car/${item.car_images[0]}`}
                        alt="List1"
                        className="h-full w-full rounded-md object-none"
                      />
                    </Link>
                  </div>
                  <div className="w-full px-6 py-3 text-justify sm:w-4/6">
                    <div className="w-full text-justify sm:w-5/6">
                      <h1 className="font-semibold">{item.car_type}</h1>
                      <p className="my-3">
                        {item.door_number} Doors | {item.name}
                      </p>
                      <div className="flex w-full flex-wrap justify-between gap-3 sm:w-8/12">
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-solid fa-user m-auto"></i>
                          <p className="mx-2">{item.seatnumber}</p>
                        </div>
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-solid fa-bag-shopping m-auto"></i>
                          <p className="mx-2">{item.trunk_space}</p>
                        </div>
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-regular fa-snowflake m-auto"></i>
                          <p className="mx-2">AC</p>
                        </div>
                      </div>
                      <div className="my-2 flex">
                        <h2 className="mx-3 font-semibold">Rs {item.cost}</h2>
                        <p>a day</p>
                      </div>
                    </div>
                    <div className="flex w-full flex-wrap justify-between gap-3">
                      {item.free_includes.map((item) => (
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-solid fa-bed m-auto"></i>
                          <p className="m-auto mx-2">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex h-fit flex-wrap gap-3">
                  <button
                    className="h-fit w-24 rounded-md bg-[#e3e9e9c6] py-2 text-center text-black drop-shadow-lg"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ))}
        </div>

        <div className="w-12/12 grid place-items-center">
          <i className="fa-duotone fa-angles-down w-fit cursor-pointer py-5"></i>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
