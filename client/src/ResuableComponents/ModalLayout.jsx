import React from 'react';

const ModalLayout = ({ title, onClose, children }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <div
      className="fixed z-50 grid h-screen w-screen place-items-center bg-black"
      onClick={(e) => handleClick(e)}
    >
      <div className="modal fixed z-50 bg-white p-4">

        <div className="flex cursor-pointer justify-between gap-8">
          <div className="modal-title--main">{title}</div>
          <div className="modal-title--cross">
            <i
              className="modal-title--cross__icon fa-light fa-xmark"
              onClick={(e) => handleClick(e)}
            />
          </div>
        </div>
      {children}
      </div>
    </div>
  );
};

export default ModalLayout;
