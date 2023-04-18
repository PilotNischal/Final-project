import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../../components/navbar/navbar';
import { doPost } from '../../Services/Axios';
import { getForgotEmailFromLocalstorage } from '../../Services/Helpers';
import { useForm } from '../../Services/useForm';
import Button from '../../UI/Button/Button';

const ResetPassword = () => {
  const { state } = useLocation();
  const { errors, states, handleChange, validate } = useForm({
    newPassword: '',
    confirmPassword: '',
  });
  const handleSubmit = async () => {
    try {
      if (validate()) {
        await doPost('/user/resetpassword', {
          email: getForgotEmailFromLocalstorage(),
          newPassword: states.newPassword,
          confirmPassword: states.confirmPassword,
        });
        window.location.href = '/login';
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (state !== 'user') {
      window.location.href = '/login';
    }
  }, [state]);
  return (
    <>
      <Navbar />
      <div className="flex  items-center justify-center ">
        <div className="flex w-max flex-col items-center gap-12">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-semibold tracking-widest text-gray-900">
                Reset Your Password
              </div>
              <div className="text-center font-light tracking-wider text-black opacity-70">
                Enter Your New Password
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col  gap-1">
                <label
                  className="font-font-medium text-sm tracking-wide "
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  className="rounded border border-primary bg-light-gray py-2 px-2 opacity-60 outline-none"
                  placeholder="New Password"
                  type={'password'}
                  name="newPassword"
                  onChange={handleChange}
                />
                <div className="text-sm text-red-500">{errors.newPassword}</div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="font-mediumt text-sm tracking-wide "
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  className="rounded border border-primary bg-light-gray py-2 px-2 opacity-60 outline-none"
                  placeholder="Confirm Password"
                  type={'password'}
                  onChange={handleChange}
                  name="confirmPassword"
                />
                <div className="text-sm text-red-500">
                  {errors.confirmPassword}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button text={'Reset Password'} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
