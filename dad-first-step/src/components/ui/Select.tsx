import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <select 
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
