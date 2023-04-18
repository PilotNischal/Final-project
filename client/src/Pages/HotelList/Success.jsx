import React from "react";
import NavBar from "../Header/NavBar";

const Success = () => {
  return (
    <>
      <NavBar />
      <div className="container m-auto mt-20 grid place-items-center">
        <i className="fa-sharp fa-solid fa-circle-check my-10 text-[15rem] text-[#00D32E]"></i>
        <h1 className="text-center text-xl font-semibold">
          Payment Successful
        </h1>
        <p className="text-center">
          Congrats your payment have been Successful
        </p>
      </div>
    </>
  );
};

export default Success;
