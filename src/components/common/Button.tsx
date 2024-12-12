import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  icon: Icon,
  children,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md";
  const variantStyles = {
    primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {children}
    </button>
  );
}