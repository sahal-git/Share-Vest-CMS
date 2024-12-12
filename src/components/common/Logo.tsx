import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

export function Logo({ size = 'md', variant = 'full' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-5',
    md: 'h-7',
    lg: 'h-10'
  };

  const textClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="ShareVest Logo" 
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
      {variant === 'full' && (
        <div className={`ml-3 font-bold leading-none ${textClasses[size]}`}>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
            Share
          </span>
          <span className="text-gray-900 tracking-tight">
            Vest
          </span>
        </div>
      )}
    </div>
  );
}
