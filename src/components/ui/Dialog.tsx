import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  className = '' 
}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
      <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={onClose}
      />
      <div className="relative z-50 bg-white p-6 rounded-lg shadow-xl">
        {children}
      </div>
    </div>
  );
};
