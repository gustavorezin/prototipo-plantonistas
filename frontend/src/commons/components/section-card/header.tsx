import { ReactNode } from "react";

interface SectionCardHeaderProps {
  children: ReactNode;
}

export const SectionCardHeader = ({ children }: SectionCardHeaderProps) => {
  return (
    <h1 className="text-center text-lg font-bold text-primary">{children}</h1>
  );
};
