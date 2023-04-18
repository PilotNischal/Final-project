import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router';
import { Link } from 'react-router-dom';
import { img1, Logo } from '../../assets/img';
import { baseUrl, doGet } from '../../Services/Axios';
import { useFilterConsumer } from '../../Services/useFilter';
import SearchFor from './SearchFor';

const Hotel = () => {
  const data = useOutletContext();
  const filter = useFilterConsumer();

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  // const numbers = [
  //   'Pokhreli Home',
  //   'Gauthali Home',
  //   'Restaurant',
  //   'Sagar Restaurant and lodge',
  //   'Ajju Restro and Karkhana',
  // ];
  const [suggested, setSuggested] = useState([]);
  const handleGetOfferHotels = async () => {
    try {
      const response = await doGet('/hotel/all');

      setSuggested(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleGetOfferHotels();
  }, []);
  useEffect(() => {
    const fetchHotels = async () => {
      const response = await doGet('/hotel/all');
      console.log(response.data);
      if (!data.filterTerm && !data.state) {
        setFilteredHotels(response.data);
      } else if (!data.filterTerm) {
        setFilteredHotels(
          response.data.filter(
            (item) =>
              item.location.toLowerCase().includes(data.state.toLowerCase()) ||
              item.name.toLowerCase().includes(data.state.toLowerCase()) ||
              item.description.toLowerCase().includes(data.state.toLowerCase())
          )
        );
      } else {
        setFilteredHotels(
          response.data.filter(
            (item) =>
              item.location
                .toLowerCase()
                .includes(data.filterTerm.toLowerCase()) ||
              item.name.toLowerCase().includes(data.filterTerm.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(data.filterTerm.toLowerCase())
          )
        );
      }
    };
    fetchHotels();
    console.log(!data.filterTerm && !data.state);
  }, [data.state, data.filterTerm]);

  // useEffect(() => {
  //   setFilteredHotels((prev) =>
  //     prev.filter(
  //       (item) =>
  //         item.averageCost >= filter.range.min &&
  //         item.averageCost <= filter.range.max &&
  //         item.averageRating >= filter.star &&
  //         item.hotel_features.filter((element) =>
  //           filter.features.includes(element)
  //         ).length === filter.features.length
  //     )
  //   );
  // }, [
  //   filter.range.min,
  //   filter.range.max,
  //   hotels,
  //   filter.star,
  //   filter.features,
  // ]);

  return (
    <>
      <p className="mx-5 mt-3 md:mx-14 lg:mx-20">
        Search Result "{data.state ?? data.filterTerm}"
      </p>
      {filteredHotels.map((option, index) => {
        return (
          <div className="my-2 mx-5 md:mx-14 lg:mx-20">
            <div>
              <Link to={`/hoteldescription/${option.hotel_id}`}>
                <div className="mt-5 flex w-full flex-wrap rounded-md bg-[#F5F5F5] lg:w-2/3">
                  <div className="border-box w-full min-w-[12rem] rounded-md sm:w-[18vw]">
                    <img
                      src={`${baseUrl}/image/hotel/${option.hotelImages[0]}`}
                      alt="List1"
                      className="h-full w-full rounded-md object-none"
                    />
                  </div>
                  <div className="w-full px-6 py-3 text-justify sm:w-3/6">
                    <h1 className="font-semibold">{option.name}</h1>
                    <p className="">{option.description}</p>
                    <p className="mt-3 font-medium">
                      {option.totalReviews} reviews
                    </p>

                    <div className="my-2">
                      {Array.from(Array(5)).map((el, index) => (
                        <i
                          className={` fa-star   ${
                            index < option.averageRating
                              ? 'fa-solid text-primary '
                              : 'fa-regular text-black'
                          }`}
                        ></i>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-between gap-3">
                      {option.hotel_features.map((item) => (
                        <div className="flex rounded-lg bg-white px-2 py-1">
                          <i className="fa-regular fa-water m-auto"></i>
                          <p className="mx-2">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
      <p className="mx-5 mt-3 md:mx-14 lg:mx-20">Suggested "Hotel"</p>
      {suggested.map((item) => (
        <div className="my-2 mx-5 md:mx-14 lg:mx-20">
          <div>
            <Link to={`/hoteldescription/${item.hotel_id}`}>
              <div className="mt-5 flex w-full flex-wrap rounded-md bg-[#F5F5F5] lg:w-2/3">
                <div className="border-box w-full rounded-md sm:w-[18vw]">
                  <img
                    src={Logo}
                    alt="List1"
                    className="h-full w-full rounded-md object-none"
                  />
                </div>
                <div className="w-full px-6 py-3 text-justify sm:w-3/6">
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="">{item.desription}</p>
                  <p className="mt-3 font-medium">
                    {item.totalReviews} reviews
                  </p>

                  <div className="my-2">
                    {Array.from(Array(5)).map((el, index) => (
                      <i
                        className={` fa-star   ${
                          index < item.averageRating
                            ? 'fa-solid text-primary '
                            : 'fa-regular text-black'
                        }`}
                      ></i>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-between gap-3">
                    {item.hotel_features.map((item) => (
                      <div className="flex rounded-lg bg-white px-2 py-1">
                        <i className="fa-regular fa-water m-auto"></i>
                        <p className="mx-2">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
export default Hotel;
