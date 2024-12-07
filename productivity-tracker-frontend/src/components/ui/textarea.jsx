// components/ui/textarea.jsx
import React from 'react';

export const Textarea = ({ value, onChange, placeholder, className = '', ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded focus:ring focus:ring-blue-200 ${className}`}
      {...props}
    ></textarea>
  );
};
