import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NoTextLogo } from '../../assets/img';
import Navbar from '../../components/navbar/navbar';
import InputField from '../../ResuableComponents/InputField';
import { doPost } from '../../Services/Axios';
import { setForgotEmailToLocalStorage } from '../../Services/Helpers';
import { useForm } from '../../Services/useForm';
import Button from '../../UI/Button/Button';

const SendMail = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const initialState = {
    email: '',
  };
  const { errors, states, validate, handleChange } = useForm(initialState);
  const handleSubmit = async () => {
    try {
      if (validate()) {
        const resp = await doPost('user/forgotpassword', {
          email: states.email,
        });
        if (resp.data === 'Account not verified') {
          return setError(resp.data);
        }
        setForgotEmailToLocalStorage(states.email);
        navigate('/otp', {
          state: 'fp',
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'string'
      ) {
        setError(error.response.data);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center p-6  ">
        <div className="flex flex-col items-center justify-start gap-2">
          <div className="flex  flex-col items-center gap-12 text-center">
            <div className=" text-xl font-semibold tracking-normal text-gray-900 sm:text-2xl sm:tracking-wide md:text-4xl md:tracking-widest">
              We'll send a code to your email
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 pr-8  ">
            <div className="w-32">
              <img src={NoTextLogo} alt="Logo" />
            </div>
          </div>
          <InputField
            name={'email'}
            handleChange={handleChange}
            title="Email"
            required={true}
            placeholder="Please Enter Email"
          />
          {(errors.email !== '' || error) && (
            <div className="mt-[-.2rem] text-sm text-red-600">
              {errors.email || error}
            </div>
          )}
          <div className="w-1/2">
            <Button text={'Continue'} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMail;
