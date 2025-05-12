import { ReactNode } from "react";

interface SectionCardContentProps {
  children: ReactNode;
}

export const SectionCardContent = ({ children }: SectionCardContentProps) => {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
      {children}
    </div>
  );
};
