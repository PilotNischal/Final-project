import React, { useState } from 'react';
import Chat from './Chat';
import { iconMSG } from '../assets/img';
function MSGBox() {
  const [show, setshow] = useState(false);

  const handleClose = () => {
    console.log('====================================');
    console.log();
    console.log('====================================');
    setshow((prev) => !prev);
  };

  return (
    <div>
      <div>
        <Chat onClose={handleClose} visible={show} />
        <img
          src={iconMSG}
          alt="message box"
          onClick={() => {
            console.log('====================================');
            console.log();
            console.log('====================================');
            setshow(true);
          }}
          className="fixed"
        />
      </div>
    </div>
  );
}
export default MSGBox;
