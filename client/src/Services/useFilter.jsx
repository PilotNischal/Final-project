import React, { createContext, useContext, useState } from 'react';
const CurrentUserContext = createContext(null);

const FilterProvider = ({ children }) => {
  const [range, setRange] = useState({
    min: 0,
    max: 10000,
  });
  const [star, setStar] = useState(0);
  const [features, setFeatures] = useState([]);
  return (
    <CurrentUserContext.Provider
      value={{
        range,
        setRange,
        star,
        setStar,
        features,
        setFeatures,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useFilterConsumer = () => useContext(CurrentUserContext);
export default FilterProvider;
