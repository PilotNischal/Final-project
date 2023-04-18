import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Cover, Logo, NoTextLogo } from '../../assets/img';
import { baseUrl, doGet, doPost } from '../../Services/Axios';
import {
  getUserEmailFromLocalStorage,
  getUserFromLocalStorage,
} from '../../Services/Helpers';
import UserProfile, { useProfileConsumer } from '../../Services/useProfile';
import NavBar from '../Header/NavBar';
import Footer from '../HomePage/Footer';
import TopPages from '../HotelList/TopPage';
import IntroCard from './IntroCard';

const Profile = () => {
  const { user, setRefresh } = useProfileConsumer();
  // const [user, setUser] = useState();
  // const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       console.log('====================================');
  //       ('Please Enter here');
  //       console.log('====================================');
  //       const userres = await doGet(`/user`);
  //       setUser(userres.data);
  //     } catch (error) {}
  //   };
  //   fetchUser();
  // }, [refresh]);
  const handleProfileSubmit = async (e) => {
    try {
      console.log('====================================');
      console.log('why ??');
      console.log('====================================');
      const form = new FormData();
      form.append('profileImage', e.target.files[0]);
      form.append('username', user.username);
      const profile = await doPost('/user/profile', form);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error('Profile Change error');
    }
  };
  const handleSubmitImage = async (e) => {
    try {
      const form = new FormData();
      form.append('bioImage', e.target.files[0]);
      form.append('username', user.username);
      const profile = await doPost('/user/bio', form);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error('Profile Change error');
    }
  };
  console.log('====================================');
  console.log(user && user.bioImage);
  console.log('====================================');
  return (
    <>
      <NavBar />
      <div className="profile z-20 my-10 mt-60 grid h-[8rem] w-full place-items-center rounded-xl sm:mt-32 sm:h-[15rem] md:mt-20 md:h-[22rem] lg:h-[28rem]">
        <div className="coverImage absolute -z-10 h-[60vh] w-full">
          <img
            src={
              user && !!user.bioImage
                ? `${baseUrl}/image/user/${user.bioImage}`
                : 'https://i.pinimg.com/236x/a6/b4/11/a6b411674a6d6f8b6814e24e0d812364.jpg'
            }
            alt="Cover"
            className="h-full w-full object-cover"
          />
        </div>
        <label
          htmlFor="input-file"
          className="m-auto flex h-10 w-32 cursor-pointer items-center justify-center bg-white bg-opacity-60 text-black hover:bg-white"
        >
          <input
            type={'file'}
            className="text-lg hidden"
            id="input-file"
            onChange={handleSubmitImage}
          ></input>
          <div htmlFor="input-file">Edit Image</div>
        </label>
      </div>
      <div className="m-auto mx-5 my-5 mt-[-1rem] rounded-lg bg-[#F5F5F5] px-1 pt-10 sm:mt-[-5rem] md:mx-20 md:mt-[-7rem] md:px-5 lg:mt-[-9rem]">
        <div className="relative flex flex-wrap justify-center sm:justify-start ">
          <i className="fa-solid fa-ellipsis-vertical absolute right-3 cursor-pointer"></i>
          <label htmlFor="profileImage">
            <img
              src={
                user && user.profile
                  ? `${baseUrl}/image/user/${user.profile}`
                  : NoTextLogo
              }
              alt="profile img"
              className="mx-10 h-24 w-24 rounded-full bg-black"
            />
          </label>
          <input
            type={'file'}
            className="hidden"
            id="profileImage"
            onChange={handleProfileSubmit}
          ></input>
          <div className="flex-col">
            <div className="flex-col">
              <h1 className="text-lg font-bold tracking-widest">
                {getUserFromLocalStorage()}
              </h1>
              <a
                href={`mailto:${getUserEmailFromLocalStorage()}`}
                className="text-sm font-light"
              >
                {getUserEmailFromLocalStorage()}
              </a>
            </div>
            <div className="my-5 flex-col">
              <h1 className="text-lg font-semibold">Photo Upload</h1>
              <p>2</p>
            </div>
          </div>
        </div>
      </div>

      <IntroCard user={user && user} setRefresh={setRefresh} />
      <Footer user={user && user} />
    </>
  );
};

export default Profile;
