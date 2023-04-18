import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import '../../App.css';
import { Me, ring, Room1, Room2, Room3, Room4 } from '../../assets/img';
import getStripe from '../../getStripe';
import { baseUrl, doGet, doPost } from '../../Services/Axios';
import Button from '../../UI/Button/Button';
import NavBar from '../Header/NavBar';
import Footer from '../HomePage/Footer';
import moment from 'moment';
import { toast } from 'react-toastify';
import KhaltiCheckout from 'khalti-checkout-web';
import InputField from '../../ResuableComponents/InputField';
import { useForm } from '../../Services/useForm';
import { getUserIdFromLocalStorage } from '../../Services/Helpers';
let stripePromise = loadStripe(
  'pk_test_51MA1w7G9ZwN3X5brmLc5kTaWz4mOXtxnMCF7Upjr5pu8EbsF6W35HXWOrB0B4bBNUNGmllIftuiNWZVyGk4MrgYy00CReN2tEX'
);
const HotelDes = () => {
  const { id } = useParams();
  const [show, setShow] = useState(true);

  let config = {
    // replace this key with yours
    'publicKey': 'test_public_key_029e4c05f8644a7792370a2a519febfc',
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

  const [room, setRoom] = useState();
  const [cost, setCost] = useState(0);
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(
    moment().add(1, 'days').format('YYYY-MM-DD')
  );

  const onRoomChangeHandler = (event) => {
    setRoom(event.target.value.split(',')[0]);
    setCost(+event.target.value.split(',')[1]);
  };
  const [hotel, setHotel] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getHotel = async () => {
      const response = await doGet(`/hotel/read/${id}`);
      setHotel(response.data);
    };
    getHotel();
  }, [id, refresh]);

  const option = {
    // passing the client secret obtained from the server
    clientSecret:
      'sk_test_51MA1w7G9ZwN3X5brgRNkQLV1F6sgvTMVrpoMYUvElldIGToP1115fat1mITTFqIn2PMc3LK3V3Z9D4vvwBICokM000S3vgT2YU',
  };
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

  const handleBook = async () => {
    try {
      if (!room) return toast.error('please select room');
      setShow((prev) => !prev);
      await checkout.show({ amount: cost * 100 }).then(async () => {
        const response = await doPost('/room/bookroom', {
          room_id: room,
          bookedDays: enumerateDaysBetweenDates(startDate, endDate),
        });
        toast.success('Room Booked Sucessfully');
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

  const { handleChange, states } = useForm({
    message: '',
    rating: 0,
  });
  const handleRate = async () => {
    try {
      const response = await doPost('/hotel/givereview', {
        username: getUserIdFromLocalStorage(),
        message: states.message,
        rating: +states.rating,
        hotel_id: id,
      });
      toast.success('Hotel rating successful');
    } catch (error) {
      toast.error('Hotel rating error');
    }
  };
  console.log(
    hotel &&
      hotel.review.filter(
        (item) => item.reviewer_id === getUserIdFromLocalStorage()
      )
  );
  console.log('====================================');
  console.log(hotel && hotel.review, getUserIdFromLocalStorage());
  console.log('====================================');

  return (
    hotel &&
    show && (
      <>
        <NavBar />
        <div className="mt-28 bg-light-gray">
          <div className="container m-auto py-5">
            <div className="m-auto flex flex-wrap gap-3">
              <div className="m-auto grid place-content-between gap-3">
                <div className="image1 w-[15rem] sm:h-[13rem] sm:w-[20rem]">
                  <img
                    src={Room2}
                    alt="Room-1"
                    className="oject-cover h-full w-full"
                  />
                </div>
                <div className="image2 w-[15rem] sm:h-[13rem] sm:w-[20rem]">
                  <img
                    src={`${baseUrl}/image/hotel/${hotel.hotelImages[0]}`}
                    alt="Room-2"
                    className="oject-cover h-full w-full"
                  />
                </div>
              </div>
              <div className="image3 order-[-1] m-auto h-[15rem] md:h-[25rem] md:w-[33rem] lg:order-[0]">
                <img
                  src={`${baseUrl}/image/hotel/${hotel.hotelImages[0]}`}
                  alt="Room-3"
                  className="oject-cover order_separation h-full w-full"
                />
              </div>
              <div className="image4 m-auto h-[20rem] w-[15rem] sm:h-[27rem] sm:w-[20rem]">
                <img
                  src={Room3}
                  alt="Room-4"
                  className="oject-cover h-full w-full"
                />
              </div>
            </div>

            <div className="mt-8 px-2">
              <div>
                <span className="mr-3 text-2xl font-semibold">
                  {hotel.name}
                </span>
                {Array.from(Array(5)).map((el, index) => (
                  <i
                    className={` fa-star   ${
                      index < hotel.averageRating
                        ? 'fa-solid text-primary '
                        : 'fa-regular text-black'
                    }`}
                  ></i>
                ))}
              </div>
              <div className="my-2 flex gap-2">
                <i className="  fa-solid fa-location-dot"></i>
                <span className="text-sm">{hotel.location}</span>
              </div>
              <div className="my-2 flex gap-2">
                <i className=" fa-solid fa-message-pen"></i>
                <span className="text-sm">{hotel.review.length} review</span>
              </div>
              <div className="my-2 flex gap-5">
                {hotel &&
                  hotel.hotel_features.map((item) => (
                    <div className="flex items-center gap-2 rounded-md bg-white px-2 py-1">
                      <i className=" fa-regular fa-water"></i>
                      <span className="mr-8 text-sm">{item}</span>
                    </div>
                  ))}
                <div className="flex items-center gap-2 rounded-md bg-white px-2 py-1">
                  <i className=" fa-regular fa-bed-pulse"></i>
                  <span className="text-sm">Free Cancelation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Elements stripe={stripePromise} options={option}>
          <PaymentElement />
          <Button text={'Submit'} />
        </Elements> */}
        <div className="container m-auto py-5">
          <div className="my-5 grid place-content-end">
            <button
              className="rounded-md bg-primary py-2 px-14 text-white "
              onClick={() => handleBook()}
            >
              Book Now
            </button>
          </div>
          <div className="">
            <div className="flex flex-wrap justify-around gap-10 bg-light-gray py-5">
              <div className="flex-col gap-3">
                <p className="text-lg font-semibold">Check in</p>
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
                <p className="text-lg font-semibold "> Check out</p>
                <input
                  type="date"
                  name="check"
                  id="check "
                  className="w-44 rounded border-l-8 border-l-red-600 p-3"
                  value={endDate}
                  onChange={handleEndDate}
                />
              </div>

              <div className="w-cotent top-14 right-[20rem] flex-col items-center justify-evenly rounded-xl bg-[#F5F5F5]">
                <p className="text-lg font-semibold"> Rooms </p>
                <select
                  className="w-44 rounded border bg-white p-3 outline-none"
                  onChange={(e) => onRoomChangeHandler(e)}
                  value={room + ',' + cost}
                >
                  <option value={undefined}>Select</option>
                  {hotel.room
                    .filter((item) => {
                      return (
                        item.bookedDays.filter((item) => {
                          return moment(item).isBetween(
                            moment(startDate),
                            moment(endDate),
                            undefined,
                            '[]'
                          );
                        }).length === 0
                      );
                    })
                    .map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item.room_id + ',' + item.cost}
                        >
                          Hotel no. {item.room_number}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="">
              <h1 className="my-2 mt-5 text-2xl font-semibold ">
                Properties amenities
              </h1>
              <div className="flex flex-wrap justify-around gap-10 bg-light-gray py-5">
                <ul>
                  {hotel.hotel_features.map((item) => (
                    <li className="flex">
                      <img src={ring} alt="free things" className="h-4 px-4" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="">
                  {hotel.hotel_features.map((item) => (
                    <li className="flex">
                      <img src={ring} alt="free things" className="h-4 px-4" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul>
                  {hotel.hotel_features.map((item) => (
                    <li className="flex">
                      <img src={ring} alt="free things" className="h-4 px-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {hotel.review_permission && (
              <div className="">
                <h1 className="py-5 pt-10 text-2xl font-semibold">Reviews</h1>

                {hotel.review_permission !== 'false' ? (
                  <div className="flex gap-2 ">
                    {hotel.review.filter(
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
                    {hotel.review.length > 0 &&
                      hotel.review.map((item) => (
                        <div className="mb-10 flex flex-wrap gap-3 ">
                          <div className="flex border-b border-b-neutral-900 md:border-r md:border-b-0 md:border-r-neutral-900">
                            <img
                              src={Me}
                              alt="Profile pic"
                              className="top-12 right-40 h-16 w-16 rounded-full bg-black "
                            />
                            <div className="ml-5 min-w-[10rem] pr-4">
                              <h1 className="font-semibold">
                                {item.user.firstname}
                                {item.user.lastname}
                              </h1>

                              <p className="text-xs">{item.user.email}</p>
                              {Array.from(Array(5)).map((el, index) => (
                                <i
                                  className={` fa-star   ${
                                    index < item.rating
                                      ? 'fa-solid text-primary '
                                      : 'fa-regular text-black'
                                  }`}
                                ></i>
                              ))}
                            </div>
                          </div>
                          <p className="mx-5 w-7/12 text-justify">
                            {item.message}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div>Review is disabled</div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    )
  );
};
export default HotelDes;
