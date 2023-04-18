import React from "react";
import { Link } from "react-router-dom";
import { Car4, Payment1, Payment2, Payment3 } from "../../assets/img";
import NavBar from "../Header/NavBar";

const CarBook = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="container m-auto mt-20 w-96 py-10">
          <div className="image">
            <img src={Car4} alt="" />
            <h1 className="text-center text-2xl font-semibold">Toyota Yaris</h1>
          </div>
          <form action="">
            <div className="my-5 grid gap-1">
              <label htmlFor="name" className="text-lg font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full rounded-md border p-2 text-xl font-light outline-none"
                placeholder="Full Name"
              />
              <small className="text-xs">
                The name should match the driver's license and the credit card
                used when you pick up the car.
              </small>
            </div>
            <div className="my-5 grid gap-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full rounded-md border p-2 text-xl font-light outline-none"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="my-5 grid gap-1">
              <label htmlFor="city" className="text-lg font-semibold">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="w-full rounded-md border p-2 text-xl font-light outline-none"
                placeholder="Kathmandu"
              />
            </div>
            <div className="my-5 grid gap-1">
              <label htmlFor="address" className="text-lg font-semibold">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="w-full rounded-md border p-2 text-xl font-light outline-none"
                placeholder="Chabahil"
              />
            </div>
            <div className="grid gap-3">
              <h1 className="text-center text-lg font-semibold">Payment</h1>
              <div className="flex justify-around">
                <img src={Payment1} alt="" className="w-20 object-cover" />
                <img src={Payment2} alt="" className="w-20 object-cover" />
                <img src={Payment3} alt="" className="w-20 object-cover" />
              </div>
            </div>
            <Link to="/success">
              <button className="my-5 w-full rounded-md bg-primary py-2 px-14 text-white ">
                Confirm
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default CarBook;
