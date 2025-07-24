import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  className?: string;
}

export const Button = ({ title, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`w-full px-6 py-3 rounded-2xl bg-primary text-white font-medium text-lg shadow-md transition-all hover:bg-secondary hover:shadow-lg cursor-pointer ${className}`}
      {...props}
    >
      {title ?? props.children}
    </button>
  );
};
