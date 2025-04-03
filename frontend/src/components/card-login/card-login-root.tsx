import { ReactNode } from "react";

interface CardLoginRootProps {
  children: ReactNode;
}

export const CardLoginRoot = ({ children }: CardLoginRootProps) => {
  return (
    <div className="w-full max-w-md shadow-lg rounded-2xl bg-white p-6">
      {children}
    </div>
  );
};
