import { ReactNode } from "react";

interface SectionCardFooterProps {
  children: ReactNode;
}

export const SectionCardFooter = ({ children }: SectionCardFooterProps) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
