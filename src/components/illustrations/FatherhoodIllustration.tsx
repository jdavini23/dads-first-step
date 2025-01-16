import React from 'react';

export const FatherhoodIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 400" 
      width="500" 
      height="400"
      {...props}
    >
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.1 }}/>
          <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0.1 }}/>
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg-gradient)"/>
      
      {/* Dad figure */}
      <g transform="translate(100, 100) scale(0.8)">
        <path 
          d="M150,200 
             Q200,250 250,200 
             C300,150 350,200 400,250" 
          fill="none" 
          stroke="#0369a1" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        
        {/* Body */}
        <circle cx="250" cy="150" r="100" fill="#0ea5e9" fillOpacity="0.2"/>
        
        {/* Head */}
        <circle cx="250" cy="50" r="50" fill="#0284c7" fillOpacity="0.4"/>
      </g>
      
      {/* Baby figure */}
      <g transform="translate(250, 150) scale(0.6)">
        <path 
          d="M100,200 
             Q150,250 200,200 
             C250,150 300,200 350,250" 
          fill="none" 
          stroke="#15803d" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        
        {/* Body */}
        <circle cx="200" cy="150" r="80" fill="#22c55e" fillOpacity="0.2"/>
        
        {/* Head */}
        <circle cx="200" cy="50" r="40" fill="#16a34a" fillOpacity="0.4"/>
      </g>
      
      {/* Connecting line */}
      <path 
        d="M250,250 Q300,200 350,250" 
        fill="none" 
        stroke="#0c4a6e" 
        strokeWidth="4" 
        strokeDasharray="10,5"
      />
    </svg>
  );
};
