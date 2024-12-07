// components/ui/input.jsx
import React from 'react';

export const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded focus:ring focus:ring-blue-200 ${className}`}
      {...props}
    />
  );
};
