import React from 'react';
import { useOutletContext } from 'react-router';
import { Me } from '../../../assets/img';
import SwitchHC from '../../Header/SwitchHC';

const Review = () => {
  const props = useOutletContext();

  return (
    <>
      <div className="w-cotent absolute top-14 right-[4rem] flex cursor-pointer items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 sm:right-[22rem] md:right-[25rem]">
        <SwitchHC ins="car" />
      </div>
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
              <h1 className="font-semibold">Shibaa Adhikari</h1>
              <p className="text-xs"> kathmandu, Boudha</p>
              <p className="text-xs">shibaa@gmail.com</p>
              <i className=" fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
            </div>
          </div>
          <div className="w-12/12 mx-5 flex justify-between gap-3 sm:w-11/12 md:w-11/12 lg:w-8/12">
            <p className="text-justify">From Car</p>
            <div className="remark flex gap-3">
              <i className="fa-solid fa-check h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"></i>
              <i className="fa-solid fa-xmark h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"></i>
            </div>
          </div>
        </div>
        <div className="mb-10 flex flex-wrap gap-3">
          <div className="flex border-b border-b-neutral-900 lg:border-r lg:border-b-0 lg:border-r-neutral-900">
            <img
              src={Me}
              alt="Profile pic"
              className="top-12 right-40 h-16 w-16 rounded-full bg-black "
            />
            <div className="ml-5 w-[10rem]">
              <h1 className="font-semibold">Shibaa Adhikari</h1>
              <p className="text-xs"> kathmandu, Boudha</p>
              <p className="text-xs">shibaa@gmail.com</p>
              <i className=" fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
            </div>
          </div>
          <div className="w-12/12 mx-5 flex justify-between gap-3 sm:w-11/12 md:w-11/12 lg:w-8/12">
            <p className="text-justify">L</p>
            <div className="remark flex gap-3">
              <i className="fa-solid fa-check h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"></i>
              <i className="fa-solid fa-xmark h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"></i>
            </div>
          </div>
        </div>
        <div className="mb-10 flex flex-wrap gap-3">
          <div className="flex border-b border-b-neutral-900 lg:border-r lg:border-b-0 lg:border-r-neutral-900">
            <img
              src={Me}
              alt="Profile pic"
              className="top-12 right-40 h-16 w-16 rounded-full bg-black "
            />
            <div className="ml-5 w-[10rem]">
              <h1 className="font-semibold">Shibaa Adhikari</h1>
              <p className="text-xs"> kathmandu, Boudha</p>
              <p className="text-xs">shibaa@gmail.com</p>
              <i className=" fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
              <i className="fa-solid fa-star text-primary"></i>
            </div>
          </div>
          <div className="w-12/12 mx-5 flex justify-between gap-3 sm:w-11/12 md:w-11/12 lg:w-8/12">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Fugit itaque
              nulla ipsum quidem et totam explicabo magni, blanditiis maiores
              ab. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem a suscipit iure culpa quia voluptate voluptatum sit
              accusantium impedit est? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis omnis iure tenetur fugit,
              voluptates nesciunt? Tempora aspernatur, quas perferendis modi
              nihil dignissimos doloremque pariatur culpa eius laudantium!
              Suscipit illo error tempora commodi soluta, est atque ad
              laboriosam ab laudantium molestiae?
            </p>
            <div className="remark flex gap-3">
              <i className="fa-solid fa-check h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"></i>
              <i className="fa-solid fa-xmark h-fit cursor-pointer rounded-md bg-[#F5F5F5] px-4 py-2 text-lg hover:bg-slate-200"></i>
            </div>
          </div>
        </div>
        <div className="w-12/12 grid place-items-center">
          <i className="fa-duotone fa-angles-down w-fit cursor-pointer py-5"></i>
        </div>
      </div>
    </>
  );
};

export default Review;
