import React from 'react';

const InputField = ({
  id,
  type,
  name,
  required,
  handleChange,
  title,
  placeholder,
  customStyle,
  error,
}) => {
  return (
    <div className="flex flex-col" style={customStyle}>
      <label
        htmlFor={id}
        className="font-font-medium text-xs tracking-wide md:text-sm 2xl:pb-2 2xl:text-base"
      >
        {title}
      </label>
      <input
        type={type}
        // value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        className={`rounded border bg-light-gray py-2 px-2 text-sm outline-none xl:text-base 2xl:py-3  ${
          error ? 'border-red-600' : 'border-primary'
        }`}
        id={id}
        required={required}
      />
      <span className="text-xs text-red-600 md:text-sm 2xl:text-base">
        {error}
      </span>
    </div>
  );
};

export default InputField;
