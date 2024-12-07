// components/ui/card.jsx
import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`shadow-md rounded border bg-white p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 border-b pb-2 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>{children}</div>
  );
};
