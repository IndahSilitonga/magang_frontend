import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "primary" | "warning" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          // Variant styles
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
          variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
          variant === "warning" && "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400",
          variant === "success" && "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
          variant === "outline" && "border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 focus:ring-gray-300",
          variant === "ghost" && "hover:bg-gray-100 text-gray-700",
          // Size styles
          size === "sm" && "px-3 py-1 text-sm",
          size === "md" && "px-4 py-2 text-base",
          size === "lg" && "px-5 py-3 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
