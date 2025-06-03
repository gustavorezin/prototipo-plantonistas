import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  label?: string;
  id: string;
}

export const Input = ({ isError = false, label, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-4 py-3 w-full border-2 ${
          isError ? "border-red-500" : "border-primary"
        } rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-secondary`}
        {...props}
      />
    </div>
  );
};
