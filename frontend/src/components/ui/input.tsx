import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export const Input = ({ isError = false, ...props }: InputProps) => {
  return (
    <input
      className={`px-4 py-3 w-full border-2 ${
        isError ? "border-red-500" : "border-primary"
      } rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-secondary`}
      {...props}
    />
  );
};
