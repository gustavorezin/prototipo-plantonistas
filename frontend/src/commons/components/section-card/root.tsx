import { ReactNode } from "react";

interface SectionCardRootProps {
  children: ReactNode;
  className?: string;
}

export const SectionCardRoot = ({
  children,
  className = "",
}: SectionCardRootProps) => {
  return (
    <div
      className={`flex flex-col h-full bg-white shadow-2xl/30 shadow-primary rounded-2xl p-4 ${className}`}
    >
      {children}
    </div>
  );
};
