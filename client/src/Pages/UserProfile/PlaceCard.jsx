import React from 'react';
import { FaCross, FaMinus, FaMinusCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { NoTextLogo } from '../../assets/img';
import { doPut } from '../../Services/Axios';
import { useProfileConsumer } from '../../Services/useProfile';

const PlaceCard = () => {
  const { user, setRefresh } = useProfileConsumer();
  const handleCancelBook = async (type, id, boid) => {
    try {
      if (type === 'car') {
        await doPut('/car/cancelrent', {
          car_id: id,
          booking_id: boid,
        });
        toast.success('Car booking cancelled successfully');
      } else {
        await doPut('/hotel/cancelbooking', {
          room_id: id,
          booking_id: boid,
        });
        toast.success('Hotel booking cancelled successfully');
      }
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error('Cancellation error');
    }
  };
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  return (
    <>
      {/* <div className="m-auto max-w-4xl sm:w-4/12 md:w-6/12 lg:w-8/12">
        <div className="my-5 w-full rounded-lg bg-[#F5F5F5] pt-3 pb-5 sm:mx-5">
          <div className="relative m-auto my-4 flex flex-wrap justify-center px-5 sm:justify-start">
            <i className="fa-solid fa-ellipsis-vertical absolute right-3 cursor-pointer"></i>
            <img
              src={NoTextLogo}
              alt="profile img"
              className="mx-3 h-14 w-14 rounded-full bg-black"
            />
            <div className="flex-col">
              <div className="flex-col">
                <h1 className="text-lg font-bold tracking-widest">
                  Ajju Maharjan
                </h1>
                <p className="text-sm font-light">Feb 10 at 5:00 PM</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <img
              src="https://i.pinimg.com/564x/e8/48/c3/e848c38e79c86b8decb30aea10057c0a.jpg"
              alt="visited place picture"
              className="h-96 w-full object-cover"
            />
          </div>
          <p className="my-3 mx-5 text-justify">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
        <div className="my-5 w-full rounded-lg bg-[#F5F5F5] pt-3 pb-5 sm:mx-5">
          <div className="relative my-4 flex px-5">
            <i className="fa-solid fa-ellipsis-vertical absolute right-3 cursor-pointer"></i>
            <img
              src={NoTextLogo}
              alt="profile img"
              className="mx-3 h-14 w-14 rounded-full bg-black"
            />
            <div className="flex-col">
              <div className="flex-col">
                <h1 className="text-lg font-bold tracking-widest">
                  Ajju Maharjan
                </h1>
                <a href="" className="text-sm font-light">
                  Feb 10 at 5:00 PM
                </a>
              </div>
            </div>
          </div>
          <div className="w-full">
            <img
              src="https://i.pinimg.com/564x/e8/48/c3/e848c38e79c86b8decb30aea10057c0a.jpg"
              alt="visited place picture"
              className="h-96 w-full object-cover"
            />
          </div>
          <p className="my-3 mx-5 text-justify">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
      </div> */}
      <div className="m-auto max-w-4xl sm:w-4/12 md:w-6/12 lg:w-8/12">
        <div className="text-xl py-4">Booking:</div>
        <div className="">
          <div className="flex flex-col gap-4">
            {user &&
              user.carBooking.length > 0 &&
              user.carBooking.map((item) => (
                <div className="w-max h-32 border border-primary flex flex-col justify-center items-start px-4 py-2 bg-blue-200 rounded-sm text-primary cursor relative">
                  <div className="absolute top-[-.75rem] right-[-.75rem] text-red-500">
                    <FaMinusCircle
                      onClick={() =>
                        handleCancelBook('car', item.car_id, item.booking_id)
                      }
                      className="cursor-pointer"
                    />
                  </div>
                  <div>Car Booking</div>
                  <div>Booking id: {item.booking_id}</div>
                  <div>
                    Booked Days:{' '}
                    {item.days.map((el) => (
                      <span className="px-4">{el}</span>
                    ))}
                  </div>
                  <div>Price: {item.cost}</div>
                </div>
              ))}
            {user &&
              user.hotelBooking.length > 0 &&
              user.hotelBooking.map((item) => (
                <div className="w-max h-32 border border-primary flex flex-col justify-center items-start px-4 py-2 bg-red-200 rounded-sm text-primary cursor relative">
                  <div className="absolute top-[-.75rem] right-[-.75rem] text-red-500">
                    <FaMinusCircle
                      onClick={() =>
                        handleCancelBook('hotel', item.room_id, item.booking_id)
                      }
                      className="cursor-pointer"
                    />
                  </div>
                  <div>Hotel Booking</div>
                  <div>Booking id: {item.booking_id}</div>
                  <div>
                    Booked Days:{' '}
                    {item.days.map((el) => (
                      <span className="px-4">{el}</span>
                    ))}
                  </div>
                  <div>Price: {item.cost}</div>
                </div>
              ))}

            {user &&
              user.carBooking.length === 0 &&
              user.hotelBooking.length === 0 && (
                <div className="w-full h-32 border border-primary flex justify-center items-center bg-blue-200 rounded-sm">
                  NO Booking available
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceCard;
