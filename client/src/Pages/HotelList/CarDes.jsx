import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../App.css';
import { Me, ring, Car1, Car2, Car3, Car4 } from '../../assets/img';
import { baseUrl, doGet, doPost } from '../../Services/Axios';
import NavBar from '../Header/NavBar';
import Footer from '../HomePage/Footer';
import KhaltiCheckout from 'khalti-checkout-web';
import { getUserIdFromLocalStorage } from '../../Services/Helpers';
import InputField from '../../ResuableComponents/InputField';
import Button from '../../UI/Button/Button';
import { useForm } from '../../Services/useForm';

const CarDes = () => {
  const { id } = useParams();
  const [show, setShow] = useState(true);

  let config = {
    // replace this key with yours
    'publicKey': 'test_public_key_dc74e0fd57cb46cd93832aee0a390234',
    'productIdentity': `${id}`,
    'productName': 'Car',
    'productUrl': `http://localhost:3000/cardescription/${id}`,
    'eventHandler': {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        setShow(true);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
        setShow(true);
      },
      onClose() {
        console.log('widget is closing');
        setShow(true);
      },
    },
    'paymentPreference': [
      'KHALTI',
      'EBANKING',
      'MOBILE_BANKING',
      'CONNECT_IPS',
      'SCT',
    ],
  };

  let checkout = new KhaltiCheckout(config);
  var enumerateDaysBetweenDates = function (startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while (currDate <= lastDate) {
      dates.push(currDate.clone().format('YYYY-MM-DD'));
      currDate = currDate.add(1, 'days');
    }

    return dates;
  };
  const [car, setCar] = useState();
  const [value, setValue] = useState('1 Car');

  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(
    moment().add(1, 'days').format('YYYY-MM-DD')
  );
  const [refresh, setRefresh] = useState(false);
  const handleStartDate = (e) => {
    if (moment(e.target.valueAsDate) <= new moment()) {
      setStartDate(moment().add(1, 'days').format('YYYY-MM-DD'));
      return toast.error('Booking date must be later than today');
    }
    if (moment(e.target.valueAsDate) > moment(endDate)) {
      setStartDate(endDate);
      return toast.error('Start Date must not be higher than end date ');
    }

    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    if (moment(e.target.valueAsDate) <= new moment()) {
      setEndDate(moment().add(1, 'days').format('YYYY-MM-DD'));
      return toast.error('Booking date must be later than today');
    }
    if (moment(e.target.valueAsDate) < moment(endDate)) {
      setEndDate(setStartDate);
      return toast.error('End Date must be higher than start date ');
    }
    if (
      moment
        .duration(moment(e.target.valueAsDate).diff(new moment()))
        .asMonths() >= 1
    ) {
      setEndDate(moment().add(1, 'days').format('YYYY-MM-DD'));
      return toast.error('Booking date must not  be more than 1 month');
    }
    setEndDate(e.target.value);
  };
  const handleKhaltiPayment = async () => {};
  const handleBook = async (car) => {
    try {
      setShow((prev) => !prev);
      await checkout.show({ amount: car.cost * 100 }).then(async () => {
        if (!car) return toast.error('please select car');

        const response = await doPost('/car/rentcar', {
          car_id: car.car_id,
          bookedDays: enumerateDaysBetweenDates(startDate, endDate),
        });

        toast.success('car Booked Sucessfully');
        setRefresh((prev) => !prev);
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'string'
      ) {
        toast.error(error.response.data);
      }
    }
  };
  useEffect(() => {
    const getHotel = async () => {
      const response = await doGet(`/car/readcar/${id}`);
      setCar(response.data);
    };
    getHotel();
  }, [id, refresh]);
  const { handleChange, errors, states, validate } = useForm({});
  const handleRate = async () => {
    try {
      if (validate()) {
        const response = await doPost('/car/givereview', {
          username: getUserIdFromLocalStorage(),
          message: states.message,
          rating: +states.rating,
          car_id: id,
        });
        toast.success('Car rating successful');
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        typeof error.response.data === 'string'
      ) {
        if (error.response.data === 'Already Reviewed by this user') {
          return toast.error('Already pending review');
        }
        return toast.error(error.response.data);
      }
      toast.error('Error rating unsuccessful');
    }
  };
  return (
    car &&
    show && (
      <>
        <NavBar />
        <div className="mt-28 bg-light-gray">
          <div className="container m-auto py-5">
            <div className="m-auto flex flex-wrap justify-between gap-3 px-2">
              <div className="m-auto grid place-content-between gap-3">
                <div className="image1 w-[15rem] bg-red-500 sm:h-[13rem] sm:w-[20rem]">
                  <img
                    src={
                      car.car_images && car.car_images[0]
                        ? `${baseUrl}/image/car/${car.car_images[0]}`
                        : Car1
                    }
                    alt="Car-1"
                    className="oject-cover h-full w-full"
                  />
                </div>
                <div className="image2 w-[15rem] bg-red-400 sm:h-[13rem] sm:w-[20rem]">
                  <img
                    src={
                      car.car_images && car.car_images[1]
                        ? `${baseUrl}/image/car/${car.car_images[1]}`
                        : Car1
                    }
                    alt="Car-2"
                    className="oject-cover h-full w-full"
                  />
                </div>
              </div>
              <div className="image3 order-[-1] m-auto h-[15rem] bg-red-300 md:h-[25rem] md:w-[33rem] lg:order-[0]">
                <img
                  src={
                    car.car_images && car.car_images[2]
                      ? `${baseUrl}/image/car/${car.car_images[2]}`
                      : Car2
                  }
                  alt="Car-3"
                  className="oject-cover order_separation h-full w-full"
                />
              </div>
              <div className="image4 m-auto h-[20rem] w-[15rem] bg-red-200 sm:h-[27rem] sm:w-[20rem]">
                <img
                  src={
                    car.car_images && car.car_images[3]
                      ? `${baseUrl}/image/car/${car.car_images[3]}`
                      : Car3
                  }
                  alt="Car-4"
                  className="oject-cover h-full w-full"
                />
              </div>
            </div>

            <div className="mt-8 px-2">
              <div>
                <span className="mr-3 text-2xl font-semibold">
                  Toyota Yaris
                </span>
                {Array.from(Array(5)).map((el, index) => (
                  <i
                    className={` fa-star   ${
                      index < car.averageRating
                        ? 'fa-solid text-primary '
                        : 'fa-regular text-black'
                    }`}
                  ></i>
                ))}
              </div>
              <div className="my-2 flex gap-2">
                <i className="  fa-solid fa-location-dot"></i>
                <span className="text-sm">Pokhara, Chapagau</span>
              </div>
              <div className="my-2 flex gap-2">
                <i className=" fa-solid fa-message-pen"></i>
                <span className="text-sm">{car.review.length} review</span>
              </div>
              <div className="my-2 flex gap-5">
                <div className="flex items-center gap-2 rounded-md bg-white px-2 py-1">
                  <i className="fa-regular fa-snowflake"></i>
                  <span className="mr-8 text-sm">ac</span>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-white px-2 py-1">
                  <i className="fa-solid fa-car"></i>
                  <span className="text-sm">Free Cancelation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container m-auto py-5">
          <div className="my-5 grid place-content-end">
            <div className="flex items-center gap-10">
              <h1 className="text-2xl font-semibold">Rs {car.cost}</h1>
              {car.bookedDays.filter((item) => {
                return moment(item).isBetween(
                  moment(startDate),
                  moment(endDate),
                  undefined,
                  '[]'
                );
              }).length === 0 ? (
                <div
                  className="rounded-md bg-primary py-2 px-14 text-white cursor-pointer"
                  onClick={() => handleBook(car)}
                >
                  Book Now
                </div>
              ) : (
                <div className="rounded-md bg-primary py-2 px-14 text-white ">
                  Booked
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div className="flex flex-wrap justify-around gap-10 bg-light-gray py-5">
              <div className="flex-col gap-3">
                <p className="text-lg font-semibold">Ride in</p>
                <input
                  type="date"
                  name=""
                  id=""
                  className="w-44 rounded border-l-8 border-l-green-400 p-3"
                  value={startDate}
                  onChange={handleStartDate}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold ">Ride out</p>
                <input
                  type="date"
                  name=""
                  id=" "
                  className="w-44 rounded border-l-8 border-l-red-600 p-3"
                  value={endDate}
                  onChange={handleEndDate}
                />
              </div>

              {/* <div className="w-cotent top-14 right-[20rem] flex-col items-center justify-evenly rounded-xl bg-[#F5F5F5]">
                <p className="text-lg font-semibold">Need</p>
                <select
                  onChange={onOptionChangeHandler}
                  className="w-44 rounded border bg-white p-3 outline-none"
                >
                  <option className="">{value}</option>
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div> */}
            </div>
          </div>
          <div>
            <div className="">
              <h1 className="my-3 mt-7 text-2xl font-semibold ">
                Included For Free
              </h1>
              <div className="flex flex-wrap justify-start gap-10 bg-light-gray py-5">
                <ul>
                  {car.free_includes.map((item) =>
                    item.split(',').map((el) => (
                      <li className="flex">
                        <img
                          src={ring}
                          alt="free things"
                          className="h-4 px-4"
                        />
                        {el}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div className="">
              <h1 className="my-3 mt-7 text-2xl font-semibold ">
                Plus Your Hire Includes
              </h1>
              <div className="flex flex-wrap justify-start gap-10 bg-light-gray py-5">
                <ul className="">
                  {car.hire_includes.map((item) =>
                    item.split(',').map((el) => (
                      <li className="flex">
                        <img
                          src={ring}
                          alt="free things"
                          className="h-4 px-4"
                        />
                        {el}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div className="">
              <h1 className="py-5 pt-10 text-2xl font-semibold ">Reviews</h1>
              {car.review_permission !== 'false' ? (
                <div className="flex gap-2">
                  <div className="">
                    {car.review.filter(
                      (item) => item.reviewer_id === getUserIdFromLocalStorage()
                    ).length < 1 && (
                      <div className="">
                        <InputField
                          name={'message'}
                          handleChange={handleChange}
                          title="Message"
                        />
                        <InputField
                          name={'rating'}
                          handleChange={handleChange}
                          customStyle={{ width: '3rem' }}
                          title={'rating'}
                        />
                        <Button onClick={handleRate} text="Rate" />
                      </div>
                    )}
                  </div>
                  {car.review.length > 0 &&
                    car.review.map((item) => (
                      <div className="mb-10 flex flex-wrap gap-3 ">
                        <div className="flex border-b border-b-neutral-900 md:border-r md:border-b-0 md:border-r-neutral-900">
                          <img
                            src={Me}
                            alt="Profile pic"
                            className="top-12 right-40 h-16 w-16 rounded-full bg-black "
                          />
                          <div className="ml-5 w-[10rem]">
                            <h1 className="font-semibold">
                              {item.user &&
                                item.user.firstName &&
                                item.user.firstName}
                              {item.user &&
                                item.user.lastName &&
                                item.user.lastName}
                            </h1>
                            <p className="text-xs">
                              {item.user && item.user.email && item.user.email}
                            </p>
                            {Array.from(Array(5)).map((el, index) => (
                              <i
                                className={` fa-star   ${
                                  index < item.rating
                                    ? 'fa-solid text-primary'
                                    : 'fa-regular text-black'
                                }`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <p className="mx-5 w-7/12 text-justify">
                          {item.message && item.message}
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <div>Review is disabled</div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default CarDes;
