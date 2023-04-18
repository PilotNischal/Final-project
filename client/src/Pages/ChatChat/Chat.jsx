import React, { useState } from 'react';
import { Me, profile, send } from '../assets/img';
import { FaPaperPlane } from 'react-icons/fa';
import { doPost } from '../../Services/Axios';
import { toast } from 'react-toastify';
function Chat({ visible, onClose }) {
  const handleClose = () => {
    onClose();
  };
  const [searchText, setSearchText] = useState('');

  if (!visible) return null;
  const handleSubmit = async () => {
    try {
      if (searchText === '') return toast.error('Message cannot be empty');
      const response = await doPost('/user/mail', {
        title: 'Message from chat',
        message: searchText,
        email: 'sagar.khadka2001@gmail.com',
      });

      toast.success('Message Sent to admin');
    } catch (error) {
      toast.error('Message Sent error');
    }
  };
  return (
    <div
      onClick={handleClose}
      className=" border w-1/3 rounded-md pt-5 py-8 bg-oppacity-30 backdrop-blur-sm"
    >
      <div className=" text-center justify-center ">
        <h1 className="text-2xl font-semibold ">How can i help you?</h1>
        <span>Ask any type of question ?</span>
        <div className="flex  items-center justify-end mt-5">
          <p className="border rounded bg-light-gray p-2">
            Hello , i want you to develop app for me.
          </p>
          <img
            src={Me}
            alt="userProfile"
            className=" rounded-full h-10 w-10 m-2
                    "
          />
        </div>
        <div className="flex justify-start item-end m-2 px-3">
          <img
            src={profile}
            alt="userProfile"
            className=" rounded-full h-10 w-10 
                    "
          />
          <p className="text-center border rounded bg-light-gray p-2 m-2">
            Hello , we have received your message m, we will contact you soon.
            Thank you.
          </p>
        </div>
        <div className="flex justify-end m-2 items-center">
          <p className="border rounded bg-light-gray p-2">
            Hello , i want you to develop app for me.
          </p>
          <img
            src={Me}
            alt="userProfile"
            className=" rounded-full h-10 w-10 m-2
                    "
          />
        </div>
        <div className="flex justify-start items-center px-3 m-2">
          <img
            src={profile}
            alt="userProfile"
            className=" rounded-full h-10 w-10 
                    "
          />
          <p className="border rounded bg-light-gray p-2 m-2">
            Hello , we have received your message m,
          </p>
        </div>
        <dic className="relative">
          <input
            type="text"
            className="mt-5 border border-gray-300 rounded-md py-2 pl-5 pr-4 block  leading-5 bg-light-gray placeholder-light focus:outline-none w-full focus:bg-white focus:placeholder-gray-400 focus:border-blue-300 focus:shadow sm:text-sm sm:leading-5 w-11/12 ml-5"
            placeholder="Ask anything "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-44 ">
            <FaPaperPlane className="text-gray-400" onClick={handleSubmit} />
          </div>
          <div></div>
        </dic>
      </div>
    </div>
  );
}

export default Chat;
