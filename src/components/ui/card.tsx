import * as React from "react";
import { cn } from "@/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className = "", children, ...props }: CardProps) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = ({ className = "", children, ...props }: CardHeaderProps) => {
  return (
    <div className={`px-4 py-2 font-semibold text-gray-800 border-b ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({ className = "", children, ...props }: CardContentProps) => {
  return (
    <div className={`px-4 py-3 ${className}`} {...props}>
      {children}
    </div>
  );
};