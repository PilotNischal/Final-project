import { useEffect } from 'react';
import React, { useState } from 'react';
import { doGet } from '../../Services/Axios';
import { Me, profile, profile1, ring } from '../../assets/img';

const Body = () => {
  const [value, setValue] = useState('1 Room');
  const options = ['1 Room', '2 Room', '3 Room'];
  const onOptionChangeHandler = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const getAllHotels = async () => {
      try {
        const resp = await doGet('/hotel/all');
      } catch (error) {}
    };
    getAllHotels();
  }, []);
  return (
    <>
      <div className="px-24">
        <div className=" relative pt-10">
          <button className="py-2 w-48 rounded-md  bg-green-900 text-white ">
            Book Now
          </button>
        </div>
        <div className=" pt-10">
          <div className="flex justify-around border bg-light-gray h-32 pt-7">
            <div className="">
              <span className="text-lg font-semibold">Check in </span>
              <br />
              <input
                type="date"
                name=""
                id=""
                className=" border-l-green-400 border-l-8 p-3 rounded"
              />
            </div>
            <div className="pl-32">
              <span className="text-lg font-semibold "> Check out</span> <br />
              <input
                type="date"
                name="check"
                id="check "
                className="border-l-red-600 border-l-8 p-3 rounded"
              />
            </div>

            <div className="ml-32 w-52 px-1 py-1 bg-[#F5F5F5] top-14 right-[20rem] rounded-xl text-black">
              <span className="text-lg font-semibold ">Available Room </span>

              <select
                onChange={onOptionChangeHandler}
                className="outline-none bg-transparent  border w-40 p-3  rounded"
              >
                <option className="bg-black ">{value}</option>
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className=" h-full">
            <h1 className="py-10 font-semibold text-2xl ">
              Properties amenities
            </h1>
            <div className=" flex px-24 border bg-light-gray h-40 pt-5 justify-center-around ">
              <ul>
                <li className="flex ">
                  <img src={ring} alt="free things" className="h-4  px-4" />{' '}
                  Free wifi
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Pool
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Bar
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Kids Stay free
                </li>
              </ul>
              <ul className="ml-64">
                <li className="flex">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Free wifi
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Pool
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Bar
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Kids Stay free
                </li>
              </ul>
              <ul className="ml-64">
                <li className="flex">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Free wifi
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Pool
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Bar
                </li>
                <li className="flex pt-2">
                  <img src={ring} alt="free things" className="h-4  px-4" />
                  Kids Stay free
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <h1 className="py-10 font-semibold text-2xl">Reviews</h1>

            <div className="flex ">
              <img
                src={Me}
                alt="Profile pic"
                className="top-12 right-40 bg-black rounded-full h-16 w-16 "
              />
              <div className="ml-5 ">
                <h1 className="font-semibold">Shibaa Adhikari</h1>
                <p className="text-xs"> kathmandu, Boudha</p>
                <p className="text-xs">shibaa@gmail.com</p>
                <i class=" fa-solid fa-star text-primary"></i>
                <i class="fa-solid fa-star text-primary"></i>
                <i class="fa-solid fa-star text-primary"></i>
                <i class="fa-solid fa-star text-primary"></i>
              </div>
              <div className=" relative border border-r-neutral-900 h-46 w-0 ml-5"></div>
              <div className=" w-[1000px] ml-5">
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus a quae blanditiis, aut eos enim placeat optio
                  quibusdam quod unde consequuntur, quia nobis non labore fugit
                  nisi, sunt minima cumque. Atque dolorem incidunt accusantium
                  praesentium quibusdam facilis facere quo culpa. Dolorum,
                  nostrum dolorem. Dignissimos voluptate optio eligendi
                  consectetur itaque, debitis nam molestiae quidem aspernatur!
                  Deserunt labore reiciendis facere molestiae ad ducimus ipsum
                  earum adipisci provident non necessitatibus delectus possimus
                  rem voluptate aperiam vero sequi ratione, pariatur temporibus.
                  Assumenda nisi quo placeat nam reiciendis error numquam
                  possimus accusamus, iure nihil eos quibusdam culpa esse id
                  animi libero, maxime harum commodi ab.
                </p>
              </div>
            </div>
            <div className="flex py-10">
              <img
                src={Me}
                alt="Profile pic"
                className="top-12 right-40 bg-black rounded-full h-16 w-16 "
              />
              <div className="ml-5 ">
                <h1 className="font-semibold">KP Oli</h1>
                <p className="text-xs"> kathmandu, Baluwatar</p>
                <p className="text-xs">kpbaa@gmail.com</p>
                <i class=" fa-solid fa-star text-primary"></i>
                <i class="fa-solid fa-star text-primary"></i>
                <i class="fa-solid fa-star text-primary"></i>
                <i class="fa-solid fa-star text-primary"></i>
              </div>
              <div className=" relative border border-r-neutral-900 h-46 w-0 ml-5"></div>
              <div className="relative w-[1000px] ml-5">
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus a quae blanditiis, aut eos enim placeat optio
                  quibusdam quod unde consequuntur, quia nobis non labore fugit
                  nisi, sunt minima cumque. Atque dolorem incidunt accusantium
                  praesentium quibusdam facilis facere quo culpa. Dolorum,
                  nostrum dolorem. Dignissimos voluptate optio eligendi
                  consectetur itaque, debitis nam molestiae quidem aspernatur!
                  Deserunt labore reiciendis facere molestiae ad ducimus ipsum
                  earum adipisci provident non necessitatibus delectus possimus
                  rem voluptate aperiam vero sequi ratione, pariatur temporibus.
                  Assumenda nisi quo placeat nam reiciendis error numquam
                  possimus accusamus, iure nihil eos quibusdam culpa esse id
                  animi libero, maxime harum commodi ab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Body;
