import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCurrentTypeConsumer } from '../../Services/useType';
import Admin from '../AdminPage/Admin';

const SwitchHC = ({ ins }) => {
  const [type, setType] = useCurrentTypeConsumer();
  const navigate = useNavigate();
  const switchs = ['car', 'hotel'];
  const [value, setValue] = useState(ins);
  const onOptionChangeHandler = (event) => {
    // navigate(`/admin/${event.target.value}review`);
    setType(event.target.value);
  };
  // useEffect(() => {
  //
  // }, [value]);
  console.log('====================================');
  console.log(type);
  console.log('====================================');
  return (
    <>
      <select
        onChange={onOptionChangeHandler}
        className="w-full cursor-pointer border-none bg-transparent outline-none"
      >
        {switchs.map((switc, index) => {
          return (
            <option key={index} value={switc}>
              {switc}
            </option>
          );
        })}
        <Admin value={value} />
      </select>
    </>
  );
};

export default SwitchHC;
