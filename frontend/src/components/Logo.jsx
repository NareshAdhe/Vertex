import React from 'react';

export const Logo = ({ className = "", size = 36 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="logo_grad_v" x1="12" y1="6" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="logo_grad_d" x1="12" y1="3" x2="12" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path d="M2 6L12 23L22 6H17L12 16L7 6H2Z" fill="url(#logo_grad_v)" />
      <path d="M12 3L15 8L12 13L9 8L12 3Z" fill="url(#logo_grad_d)" />
    </svg>
  );
};
