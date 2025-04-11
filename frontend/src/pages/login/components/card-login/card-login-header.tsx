import { ReactNode } from "react";

interface CardLoginHeaderProps {
  children: ReactNode;
}

export const CardLoginHeader = ({ children }: CardLoginHeaderProps) => {
  return (
    <h2 className="text-center text-2xl font-bold text-primary">{children}</h2>
  );
};
