import React, { useEffect, useMemo, useState } from 'react';
import { Me, profile } from '../../assets/img';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doPost } from '../../Services/Axios';
import { getUserEmailFromLocalStorage } from '../../Services/Helpers';

function Chat({ visible, onClose }) {
  const handleClose = () => {
    onClose();
  };
  const [message, setMessages] = useState([]);
  const [searchText, setSearchText] = useState([]);

  function mySubmitFunction(e) {
    e.preventDefault();
  }
  const messages = useMemo(
    () => [
      {
        questions: 'Can I book a room at one of your hotel branches?',
        answers:
          'Yes, you can book a room at any of our hotel branches directly from our website',
      },
      {
        questions: 'Can I book a car rental from your website?',
        answers:
          'Yes, you can easily book a car rental from our website. Simply navigate to the "Car Rentals" section and select the dates and location you need the car for.',
      },
      {
        questions: 'Are Cost Listed on the website?',
        answers: 'Yes, the cost is listed in website itself',
      },
      {
        questions: 'Can i check in and check ou at any time at any time?',
        answers: 'Yes , You can check out and check in at any time',
      },
    ],
    []
  );
  useEffect(() => {
    setMessages(messages);
  }, [messages]);

  const handleSubmit = async () => {
    try {
      if (searchText === '') return toast.error('Message cannot be empty');
      const response = await doPost('/user/mail', {
        title: 'Message from chat',
        message: searchText,
        email: getUserEmailFromLocalStorage(),
      });
      setMessages((prev) => [
        ...prev,
        {
          questions: searchText,
          answers: 'Please contact represntative for further questions',
        },
      ]);
      setSearchText('');
      return toast.success('Message Sent to admin');
    } catch (error) {
      toast.error('Message Sent error');
    }
  };

  return (
    <>
      {visible && (
        <div className="grid h-full w-full bg-[#f5f5f5] bg-opacity-25">
          <div className="w-[15rem] rounded-md  border bg-[#f5f5f5] py-8 pt-5 backdrop-blur-sm sm:w-[22rem] md:w-[25rem]">
            <div
              className="h-[20rem] justify-center overflow-auto text-center font-normal"
              id="message"
            >
              <h1 className="text-2xl font-semibold">How can i help you?</h1>
              <span>Ask any type of question ?</span>
              {message !== '' &&
                message.map((item) => (
                  <>
                    <div className="mt-5 flex items-end justify-end">
                      <p className="rounded border bg-light-gray p-2">
                        {item.questions ?? ''}
                      </p>
                      <img
                        src={Me}
                        alt="userProfile"
                        className="m-2 h-10 w-10 rounded-full"
                      />
                    </div>

                    <div className="item-center m-2 flex justify-start px-3">
                      <img
                        src={profile}
                        alt="userProfile"
                        className=" h-10 w-10 rounded-full"
                      />
                      <p className="m-2 rounded border bg-light-gray p-2 text-center">
                        {item.answers ?? ''}
                      </p>
                    </div>
                  </>
                ))}
            </div>
            <div className="relative">
              <form action="" onSubmit={mySubmitFunction}>
                <input
                  type="text"
                  className="placeholder-light mt-5 ml-5 block w-11/12 rounded-md border border-gray-300  bg-light-gray py-2 pl-5 pr-4 leading-5 focus:border-blue-300 focus:bg-white focus:placeholder-gray-400 focus:shadow focus:outline-none sm:text-sm sm:leading-5"
                  placeholder="Ask anything"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="absolute inset-y-0 right-5 flex w-min items-center">
                  <FaPaperPlane
                    className="float-right cursor-pointer text-gray-400"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
