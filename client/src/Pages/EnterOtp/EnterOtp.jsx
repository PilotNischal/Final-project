import React, { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Navbar from '../../components/navbar/navbar';
import { doPost } from '../../Services/Axios';
import {
  getForgotEmailFromLocalstorage,
  getUnverifiedEmailFromLocalstorage,
} from '../../Services/Helpers';
import Button from '../../UI/Button/Button';

const Otp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [otp0ref, setotpOref] = useState('');
  const [otp1ref, setotp1ref] = useState('');
  const [otp2ref, setotp2ref] = useState('');
  const [otp3ref, setotp3ref] = useState('');
  const [otp4ref, setotp4ref] = useState('');

  const otps = `${otp0ref}${otp1ref}${otp2ref}${otp3ref}${otp4ref}`;
  const [error, setError] = useState(false);
  const handleSubmitOtp = async () => {
    try {
      if (
        otp0ref === '' ||
        otp1ref === '' ||
        otp2ref === '' ||
        otp3ref === '' ||
        otp4ref === '' ||
        typeof parseInt(otp0ref) !== 'number' ||
        typeof parseInt(otp1ref) !== 'number' ||
        typeof parseInt(otp2ref) !== 'number' ||
        typeof parseInt(otp3ref) !== 'number' ||
        typeof parseInt(otp4ref) !== 'number'
      ) {
        setError(true);
      } else {
        if (state === 'fp') {
          await doPost('/user/verifyfpotp', {
            email: getForgotEmailFromLocalstorage(),
            otp: +otps,
          });
          navigate('/reset', {
            state: 'user',
          });
        } else {
          const res = await doPost('/user/verifyotp', {
            email: getUnverifiedEmailFromLocalstorage(),
            otp: +otps,
          });
          if (res.data === 'Otp is not correct') {
            return setError(true);
          }
          toast.success('Your account has been verified successfully');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'string'
      ) {
        setError(true);
      }
    }
  };

  const handleChangeOtp = (e, a) => {
    const prevSibling = e.target.previousElementSibling;
    const nextElementSibling = e.target.nextElementSibling;

    if (e.keyCode == 37) {
      prevSibling && prevSibling.focus();
    } else if (e.keyCode == 39) {
      nextElementSibling && nextElementSibling.focus();
    } else if (e.keyCode == 8) {
      if (e.target.value === '') {
        prevSibling && prevSibling.focus();
      }
    } else {
      if (+a === 0) {
        setotpOref(e.target.value);
      }
      if (+a === 1) {
        setotp1ref(e.target.value);
      }
      if (+a === 2) {
        setotp2ref(e.target.value);
      }
      if (+a === 3) {
        setotp3ref(e.target.value);
      }
      if (+a === 4) {
        setotp4ref(e.target.value);
      }
      nextElementSibling && nextElementSibling.focus();
    }
  };
  const handleResend = async () => {
    try {
      if (state === 'fp') {
        const res = await doPost('user/resendotp', {
          email: getForgotEmailFromLocalstorage(),
          otp: +otps,
        });
        if (res.data === 'Otp is not correct') {
          return setError(true);
        }
        toast.success('Otp has been sent sucessfully !!!');
      } else {
        const res = await doPost('user/resendotp', {
          email: getUnverifiedEmailFromLocalstorage(),
          otp: +otps,
        });
        if (res.data === 'Otp is not correct') {
          return setError(true);
        }
        toast.success('Otp has been sent sucessfully !!!');
      }
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="px-2 text-center text-xl font-semibold tracking-widest text-gray-900 sm:text-2xl md:text-3xl">
              Enter the 5 digit code sent to
            </div>
            <div className="font-light tracking-wider text-black opacity-70">
              {state && state.fp && state.fp === 'fp'
                ? getForgotEmailFromLocalstorage()
                : getUnverifiedEmailFromLocalstorage()}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col  gap-2 text-sm font-light tracking-wider">
              <div className="flex  gap-4">
                <input
                  className={
                    error
                      ? 'flex h-12 w-12 items-center justify-center rounded border border-red-500 border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14  sm:w-14 md:h-16  md:w-16'
                      : 'flex h-12 w-12 items-center justify-center rounded border border-primary border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14 sm:w-14 md:h-16 md:w-16 '
                  }
                  id="mobile"
                  name={`otp0`}
                  type="text"
                  max="9"
                  maxLength={1}
                  onKeyUp={(e) => handleChangeOtp(e, 0)}
                />
                <input
                  className={
                    error
                      ? 'flex h-12 w-12 items-center justify-center rounded border border-red-500 border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14  sm:w-14 md:h-16  md:w-16'
                      : 'flex h-12 w-12 items-center justify-center rounded border border-primary border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14 sm:w-14 md:h-16 md:w-16 '
                  }
                  id="mobile"
                  name={`otp${1}`}
                  type="text"
                  maxLength={1}
                  // disabled={otp0ref == ""}
                  onKeyUp={(e) => handleChangeOtp(e, 1)}
                />
                <input
                  className={
                    error
                      ? 'flex h-12 w-12 items-center justify-center rounded border border-red-500 border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14  sm:w-14 md:h-16  md:w-16'
                      : 'flex h-12 w-12 items-center justify-center rounded border border-primary border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14 sm:w-14 md:h-16 md:w-16 '
                  }
                  id="mobile"
                  name={`otp2`}
                  type="text"
                  maxLength={1}
                  // disabled={otp1ref == ""}
                  onKeyUp={(e) => handleChangeOtp(e, 2)}
                />
                <input
                  className={
                    error
                      ? 'flex h-12 w-12 items-center justify-center rounded border border-red-500 border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14  sm:w-14 md:h-16  md:w-16'
                      : 'flex h-12 w-12 items-center justify-center rounded border border-primary border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14 sm:w-14 md:h-16 md:w-16 '
                  }
                  id="mobile"
                  name={`otp3`}
                  type="text"
                  maxLength={1}
                  // disabled={otp2ref === ""}
                  onKeyUp={(e) => handleChangeOtp(e, 3)}
                />
                <input
                  className={
                    error
                      ? 'flex h-12 w-12 items-center justify-center rounded border border-red-500 border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14  sm:w-14 md:h-16  md:w-16'
                      : 'flex h-12 w-12 items-center justify-center rounded border border-primary border-opacity-75 bg-light-gray  text-center text-3xl font-medium caret-primary outline-none sm:h-14 sm:w-14 md:h-16 md:w-16 '
                  }
                  id="mobile"
                  name={`otp4`}
                  type="text"
                  maxLength={1}
                  // disabled={otp2ref === ""}
                  onKeyUp={(e) => handleChangeOtp(e, 4)}
                />
              </div>
              {error && (
                <div className="text-red-700">Invalid/Incorrect OTP</div>
              )}
            </div>
            <Button onClick={handleSubmitOtp} text={'Continue'} />
          </div>
        </div>
        <div className="font-light tracking-wider">
          <span>Didn't get a code ?</span>

          <span className="cursor-pointer text-primary" onClick={handleResend}>
            {' '}
            Resend code
          </span>
        </div>
      </div>
    </>
  );
};

export default Otp;
