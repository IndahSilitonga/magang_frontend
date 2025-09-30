import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "warning" | "success" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-100",
      warning: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 focus:ring-offset-amber-100",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-100",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-100",
      outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 focus:ring-gray-300 focus:ring-offset-gray-100",
      ghost: "bg-gray-400 text-white hover:bg-gray-500 focus:ring-gray-200 focus:ring-offset-white",
    };
    
    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";