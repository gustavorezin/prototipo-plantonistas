import { InputHTMLAttributes } from "react";
import { InputMask } from "@react-input/mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  label?: string;
  id: string;
  mask?: string;
  replacement?: Record<string, RegExp>;
}

export const Input = ({
  isError = false,
  label,
  id,
  mask,
  replacement,
  ...props
}: InputProps) => {
  const inputClasses = `px-4 py-3 w-full border-2 ${
    isError ? "border-red-500" : "border-primary"
  } rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-secondary`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {mask ? (
        <InputMask
          id={id}
          className={inputClasses}
          mask={mask}
          replacement={replacement}
          {...props}
        />
      ) : (
        <input id={id} className={inputClasses} {...props} />
      )}
    </div>
  );
};
