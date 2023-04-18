import moment from 'moment';
import React, { useState } from 'react';
import PlaceCard from './PlaceCard';

const IntroCard = ({ user }) => {
  const [display, setDisplay] = useState(false);
  const onClickHandler = () => {
    setDisplay((prev) => !prev);
  };

  return (
    <>
      {display === true && (
        <div className="fixed top-0 z-50 grid h-full w-full place-items-center bg-black bg-opacity-75">
          <div className="grid w-[25rem] gap-3 rounded-md bg-white p-5 px-10">
            <div className="flex items-center relative">
              <span
                className="cursor-pointer bg-transparent absolute -right-8"
                onClick={onClickHandler}
              >
                &#x274C;
              </span>
            </div>
            <h1 className="text-center text-3xl">Post Photo</h1>
            <div className="grid place-items-center gap-3 rounded-lg bg-[#F5F5F5] p-10">
              <button className="rounded-md bg-primary py-4 px-14 text-white">
                Upload Photo
              </button>
              <p className="text-lg">Drag and drop the file</p>
            </div>
            <p className="text-lg">Add a description</p>
            <textarea
              placeholder="Write something about this photo"
              className="h-20 w-full resize-none rounded-lg bg-[#f5f5f5] p-3 outline-none"
            ></textarea>
            <button className="m-auto w-fit rounded-md bg-primary py-2 px-14 text-white">
              Post
            </button>
          </div>
        </div>
      )}

      <div className="mx-2 flex flex-wrap sm:mx-20 lg:justify-center">
        <div className="mx-auto flex-col">
          <div className="h-content my-5 w-max rounded-lg bg-[#F5F5F5] p-3">
            <h1 className="mb-4 text-xl font-semibold">Intro</h1>
            <div className="my-1 flex">
              <i className="fa-solid fa-location-dot"></i>
              <p className="mx-5">Kathmandu, Nepal</p>
            </div>
            <div className="my-1 flex">
              <i className="fa-solid fa-calendar-days"></i>
              <p className="mx-5">
                Joined in {user && moment(user.createdAt).format('YYYY-MM-DD')}
              </p>
            </div>
            <div className="my-1 flex">
              <i className="fa-solid fa-sharp fa-globe"></i>
              <p className="mx-5">{user && user.email}</p>
            </div>
            <div className="my-1 flex">
              <p className="font-semibold">BIO</p>
              <p className="mx-5">{(user && user.bio) ?? 'BIO incoming'}</p>
            </div>
          </div>
          {/* <div className="h-content my-5 w-72 rounded-lg bg-[#F5F5F5] p-3">
            <h1 className="mb-4 text-xl font-semibold">Share Your Advice</h1>

            <div className="my-1 flex cursor-pointer items-center">
              <i className="fa-light fa-camera"></i>
              <p className="mx-5" onClick={onClickHandler}>
                Post Photo
              </p>
            </div>
            <div className="flex items-center">
              <i className="fa-regular fa-pen-to-square"></i>
              <p className="mx-5">Write Review</p>
            </div>
          </div> */}
        </div>
        {<PlaceCard user={user} />}
      </div>
    </>
  );
};

export default IntroCard;
