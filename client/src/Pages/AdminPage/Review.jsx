import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'react-toastify';
import { Me } from '../../assets/img';
import { doGet, doPut } from '../../Services/Axios';
import { useCurrentTypeConsumer } from '../../Services/useType';
import SwitchHC from '../Header/SwitchHC';

const Review = () => {
  const [type, setType] = useCurrentTypeConsumer();
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [ApprovedReviews, setApprovedReviews] = useState([]);
  const [deletedReviews, seDeleteReviews] = useState([]);
  const [hoteReviews, sethoteReviews] = useState([]);
  const [carReviews, setCarReviews] = useState([]);
  const props = useOutletContext();

  // useEffect(() => {
  //   axios.get('/api/reviews').then((respose) => {
  //     setApprovedReviews(respose.data);
  //   });
  // }, []);

  const handleHotelApprove = (review) => {
    try {
      doPut(`/review/approvehotelreview/${review.review_id}`).then(
        (response) => {
          setRefresh((prev) => !prev);
        }
      );
    } catch (error) {
      toast.error('Approval error');
    }
  };
  const handleCarApprove = (review) => {
    doPut(`/review/approvecarreview/${review.review_id}`).then((response) => {
      setRefresh((prev) => !prev);
    });
  };
  const handleHotelDelete = (review) => {
    doPut(`/review/disapprovehotelreview/${review.review_id}`).then(() => {
      setRefresh((prev) => !prev);
    });
  };
  const handleCarDelete = (review) => {
    doPut(`/review/disapprovecarreview/${review.review_id}`).then(() => {
      setRefresh((prev) => !prev);
    });
  };
  const fetchHotelReviews = async () => {
    try {
      const resp = await doGet('/review/readallhotelpendingreviews');
      if (typeof resp.data === 'string') {
        return sethoteReviews([]);
      } else {
        return sethoteReviews(resp.data);
      }
    } catch (error) {}
  };
  const fetchCarReviews = async () => {
    try {
      const resp = await doGet('/review/readallcarpendingreviews');
      if (typeof resp.data === 'string') {
        return setCarReviews([]);
      } else {
        return setCarReviews(resp.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchHotelReviews();
    fetchCarReviews();
  }, [type, refresh]);
  console.log(hoteReviews, carReviews);
  return type === 'hotel' ? (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        <SwitchHC ins="hotel" />
      </div>
      {hoteReviews.map((review) => (
        <div className="container m-auto mt-28 px-8">
          <h1 className="my-5 text-3xl font-semibold">Reviews</h1>
          <div className="mb-10 flex flex-wrap gap-3">
            <div className="flex border-b border-b-neutral-900 lg:border-r lg:border-b-0 lg:border-r-neutral-900">
              <img
                src={Me}
                alt="Profile pic"
                className="top-12 right-40 h-16 w-16 rounded-full bg-black "
              />
              <div className="ml-5 w-[10rem]">
                <h1 className="font-semibold">{review.name}</h1>
                <p className="text-xs">{review.location}</p>
                <p className="text-xs">{review.email}</p>
                {Array.from(Array(review.rating)).map((_, index) => (
                  <i key={index} className=" fa-solid fa-star text-primary"></i>
                ))}
              </div>
            </div>
            <div className="w-12/12 mx-5 flex justify-between gap-3 sm:w-11/12 md:w-11/12 lg:w-8/12">
              <p className="text-justify">{review.message}</p>
              <div className="remark flex gap-3">
                <i
                  className="fa-solid fa-check h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"
                  onClick={() => handleHotelApprove(review)}
                ></i>
                <i
                  className="fa-solid fa-xmark h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"
                  onClick={() => handleHotelDelete(review)}
                ></i>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="w-12/12 grid place-items-center">
        From Hotel
        <i className="fa-duotone fa-angles-down w-fit cursor-pointer py-5"></i>
      </div>
    </>
  ) : (
    <>
      <>
        <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
          <SwitchHC ins="car" />
        </div>
        {carReviews.map((review) => (
          <div className="container m-auto mt-28 px-8">
            <h1 className="my-5 text-3xl font-semibold">Reviews</h1>
            <div className="mb-10 flex flex-wrap gap-3">
              <div className="flex border-b border-b-neutral-900 lg:border-r lg:border-b-0 lg:border-r-neutral-900">
                <img
                  src={Me}
                  alt="Profile pic"
                  className="top-12 right-40 h-16 w-16 rounded-full bg-black "
                />
                <div className="ml-5 w-[10rem]">
                  <h1 className="font-semibold">{review.name}</h1>
                  <p className="text-xs">{review.location}</p>
                  <p className="text-xs">{review.email}</p>
                  {Array.from(Array(review.rating)).map((_, index) => (
                    <i
                      key={index}
                      className=" fa-solid fa-star text-primary"
                    ></i>
                  ))}
                </div>
              </div>
              <div className="w-12/12 mx-5 flex justify-between gap-3 sm:w-11/12 md:w-11/12 lg:w-8/12">
                <p className="text-justify">{review.message}</p>
                <div className="remark flex gap-3">
                  <i
                    className="fa-solid fa-check h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"
                    onClick={() => handleCarApprove(review)}
                  ></i>
                  <i
                    className="fa-solid fa-xmark h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"
                    onClick={() => handleCarDelete(review)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-12/12 grid place-items-center">
          From Car
          <i className="fa-duotone fa-angles-down w-fit cursor-pointer py-5"></i>
        </div>
      </>
    </>
  );
};

export default Review;
