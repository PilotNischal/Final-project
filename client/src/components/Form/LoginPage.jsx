import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doPost } from '../../Services/Axios';
import {
  setAccessTokenFromLocalStorage,
  setAdminAccessTokenFromLocalStorage,
  setAdminUsernameToLocalStorage,
  setUnverifiedEmailToLocalStorage,
  setUserDetailsToLocalStorage,
  setUserEmailToLocalStorage,
  setUsernameToLocalStorage,
} from '../../Services/Helpers';
import { useForm } from '../../Services/useForm';
import Navbar from '../navbar/navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [verified, setVerified] = useState();

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const initialState = {
    email: '',
    password: '',
  };
  const { handleChange, errors, states, validate } = useForm(initialState);
  const handleChangeOption = (data) => {
    if (data === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (validate()) {
        if (isAdmin) {
          const resp = await doPost('admin/login', states);
          setAdminUsernameToLocalStorage(resp.data.firstName);
          setUserEmailToLocalStorage(resp.data.email);
          setAdminAccessTokenFromLocalStorage(resp.data.accessToken);
          navigate('/admin');
        } else {
          const resp = await doPost('user/login', states);
          setUsernameToLocalStorage(resp.data.firstName);
          setUserEmailToLocalStorage(resp.data.email);
          setAccessTokenFromLocalStorage(resp.data.access);
          navigate('/');
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'string'
      ) {
        if (error.response.data === 'Password Incorrect') {
          setError((prev) => ({
            ...prev,
            password: error.response.data,
            email: '',
          }));
        } else if (error.response.data === 'Account not verified') {
          setError((prev) => ({
            ...prev,
            email: error.response.data,
            password: '',
          }));
          setVerified('try');
          setUnverifiedEmailToLocalStorage(states.email);
        } else {
          setError((prev) => ({
            ...prev,
            email: error.response.data,
            password: '',
          }));
        }
      } else if (
        error.response &&
        error.response.data &&
        error.response.data &&
        typeof error.response.data.response === 'string'
      ) {
        setError((prev) => ({
          ...prev,
          email: error.response.data.response,
          password: '',
        }));
      }
    }
  };

  return (
    <>
      {/* <FormHeader /> */}
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="4xl:max-w-4xls flex max-w-[90%] flex-col items-center justify-center sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
          <div className="m-auto flex-row justify-center">
            <h1 className="text-center text-[40px]">Welcome</h1>
            <p className="text-center">sign in to your account</p>
          </div>
          <div className="w-full p-[2rem]">
            <div className="flex justify-between">
              <div
                className=" flex cursor-pointer justify-evenly border-[1px] border-transparent  py-1 hover:border-r-[1px] hover:border-b-[1px] hover:border-b-black hover:border-r-black"
                onClick={() => handleChangeOption('user')}
              >
                <input
                  type="radio"
                  name="switch"
                  id=""
                  value="USER"
                  checked={!isAdmin}
                  className="accent-green-700"
                />
                <p className="ml-2 font-bold">USER</p>
              </div>
              <div
                className=" flex cursor-pointer justify-evenly border-[1px] border-transparent  py-1 hover:border-r-[1px] hover:border-b-[1px] hover:border-b-black hover:border-r-black"
                onClick={() => handleChangeOption('admin')}
              >
                <input
                  type="radio"
                  name="switch"
                  id=""
                  value="ADMIN"
                  checked={isAdmin}
                  className="accent-green-700"
                />
                <p className="ml-2 font-bold">ADMIN</p>
              </div>
            </div>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
              method="POST"
            >
              <div className="my-3 flex-row">
                <label htmlFor="email font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border-2 py-2 px-5"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                />
                <span className="text-red-700">
                  {errors.email || error.email}
                </span>
              </div>
              <div className="my-3 flex-row">
                <label htmlFor="password font-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full border-2 py-2 px-5"
                  placeholder="********"
                  onChange={handleChange}
                />
                <span className="text-red-700">
                  {errors.password || error.password}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <Link to="/sendmail">
                  <p className="cursor-pointer hover:underline">
                    Forgot Password ??
                  </p>
                </Link>
              </div>
              <button
                onClick={handleSubmit}
                className="my-2 w-full rounded-md bg-[#1D7874] py-2 text-white drop-shadow-lg"
              >
                Login
              </button>
              <div className="my-3 flex justify-start">
                <p>
                  Don't have an account ?
                  <Link
                    to="/register"
                    className="cursor-pointer pl-4 font-semibold text-[#1D7874] hover:underline"
                  >
                    Sign Up
                  </Link>
                  {verified === 'try' && (
                    <Link
                      to="/otp"
                      className="cursor-pointer pl-4 font-semibold text-[#1D7874] hover:underline"
                    >
                      Verify
                    </Link>
                  )}
                </p>
              </div>
            </form>
            {/* 2ee8b29407ca0849a43eea964c807b20b59e263c */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
