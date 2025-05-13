import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: () => void;
}

export const Button = ({ title, onClick, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full px-6 py-3 rounded-2xl bg-primary text-white font-medium text-lg shadow-md transition-all hover:bg-secondary hover:shadow-lg cursor-pointer"
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  );
};
