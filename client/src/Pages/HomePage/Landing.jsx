import Chat from '../../components/ChatBox/Chat';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { doGet } from '../../Services/Axios';
import Banner from './Banner';
import Footer from './Footer';
import Offer from './Offer';
import Suggested from './Suggested';
import TopPage from './TopPage';
import Trending from './Trending';

const Landing = () => {
  const [show, setshow] = useState(false);

  const handleClose = () => setshow(false);

  return (
    <>
      <TopPage />
      <div className="px-3 sm:px-14 md:px-20">
        <Banner />
        <Trending />
        <Offer />
      </div>
      <Suggested />
      <Footer />
      <div className="fixed bottom-5 left-5 z-50">
        <Chat onClose={handleClose} visible={show} />
        <i
          className="fa-solid fa-comment cursor-pointer text-3xl text-primary sm:text-4xl md:text-6xl"
          onClick={() => setshow((prev) => !prev)}
        ></i>
      </div>
    </>
  );
};

export default Landing;
