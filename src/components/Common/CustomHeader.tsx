import { ReactNode } from "react";

interface CustomHeaderProps {
  children: ReactNode;
}

const CustomHeader = ({ children }: CustomHeaderProps) => (
  <div className="flex items-center justify-between">
    <h5 className="text-xl font-bold">{children}</h5>
  </div>
);

export default CustomHeader;
