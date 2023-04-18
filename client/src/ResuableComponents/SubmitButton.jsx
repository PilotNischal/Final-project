import React from 'react';

const SubmitButton = (props) => {
  return (
    <button type="submit" className={props.className}>
      {props.text}
    </button>
  );
};

export default SubmitButton;
