import React, { useState } from 'react';

const SearchBar = ({ setFilterTerm, state }) => {
  const [filterTerm, setTerm] = useState('');
  const handleChange = (e) => {
    setTerm(e.target.value);
  };
  const handleSubmit = () => {
    setFilterTerm(filterTerm);
  };

  return (
    <>
      <div className="absolute my-36 mx-5 flex w-10/12 items-center rounded-xl sm:my-28 sm:w-7/12 md:mx-14 lg:mx-20">
        <input
          type="search"
          name="search"
          id="search"
          className="w-full rounded border-none  bg-[#F5F5F5] px-3 py-2 text-xl text-opacity-[50%] outline-none"
          placeholder="Pokhara"
          onChange={(e) => handleChange(e)}
          defaultValue={state ?? ''}
        />
        <button
          className="w-44 rounded-md bg-primary py-2 text-xl text-white"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
